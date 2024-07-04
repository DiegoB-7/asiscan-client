<script lang="ts">
    import { DataHandler, Datatable, Th, ThFilter } from '@vincjo/datatables';
    import autoAnimate from "@formkit/auto-animate"
    import toast, { Toaster } from 'svelte-french-toast';
    import {deleteStudent,getStudents,getStudent,updateStudent} from '../../../../API/students.svelte';
    import {getCareers} from '../../../../API/careers.svelte';
	import { onMount,afterUpdate } from 'svelte';

    export let data: any[]  = [];
    let firstName = '';
    let middleName = '';
    let lastName = '';
    let controlNumber = '';
    let email = '';
    let career = '';
    let handler = new DataHandler(data,{rowsPerPage: 5});
    let rows = handler.getRows();
    let selected = handler.getSelected();
    let isAllSelected = handler.isAllSelected();
    let modalDeleteStudent:any;
    let modalEditStudent:any;
    let careersList:any[] = [];

    onMount(async () => {
        loadCareersData();
    });

    afterUpdate(()=>{
        handler.setRows(data);
        rows = handler.getRows();
    });

    async function loadStudentsData(){
        let response = await getStudents();
        if(response.ok){

            data = await response.json();
            console.log(data)
        }
    }

    async function showDeleteUserModal(){
        let studentID = getStudentIDOrAlert();
        if(studentID){
            const bootstrap = await import('bootstrap');
            // @ts-ignore
            const modal =  bootstrap.Modal.getOrCreateInstance(modalDeleteStudent);
            modal.show();
        }
    }

    function resetSelected(){
        selected.set([]);
    }
    function getStudentIDOrAlert(){
        let eventsIDList:number[] = [];
        selected.subscribe(value => {
            eventsIDList =  value;
        });

        if(eventsIDList.length == 1){
            return eventsIDList[0];
        }
        else if(eventsIDList.length == 0){
            toast.error('Seleccione un estudiante');
        }
        else {
            toast.error('Seleccione un solo estudiante');
        }
    }

    async function hideDeleteUserModal(){
        const bootstrap = await import('bootstrap');
        // @ts-ignore
        const modal =  bootstrap.Modal.getOrCreateInstance(modalDeleteStudent);
        modal.hide();
    }

    async function showEditStudentModal(){
        let studentID = getStudentIDOrAlert();
        if(studentID){
            await loadStudentData();
            const bootstrap = await import('bootstrap');
            // @ts-ignore
            const modal =  bootstrap.Modal.getOrCreateInstance(modalEditStudent);
            modal.show();
        }
    }

    async function loadCareersData(){
        let response = await getCareers();
        if(response.ok){
            let data = await response.json();
            careersList = data;
        }
    }

    async function deleteUserData(){
        let studentID = getStudentIDOrAlert();
        if(studentID){
            let response = await deleteStudent(studentID);
            if(response.ok){
                toast.success('Usuario eliminado');
                await loadStudentsData();
                hideDeleteUserModal();
                resetSelected();
            }
            else{
                toast.error('Error al eliminar el usuario');
            }
        }
    }

    async function hideEditStudentModal(){
        const bootstrap = await import('bootstrap');
        // @ts-ignore
        const modal =  bootstrap.Modal.getOrCreateInstance(modalEditStudent);
        modal.hide();
    }

    async function updateStudentData(){
        let studentID = getStudentIDOrAlert();
        if(studentID){
            let student = {
                firstName: firstName,
                middleName: middleName,
                lastName: lastName,
                controlNumber: controlNumber,
                email: email,
                careerID: career
            }

            let response = await updateStudent(studentID,student);

            if(response.ok){
                toast.success('Usuario actualizado');
                await loadStudentsData();
                hideEditStudentModal();
                resetSelected();
            }
            else{
                toast.error('Error al actualizar el usuario');
            }
        }
    }

    async function loadStudentData(){
        let studentID = getStudentIDOrAlert();
        if(studentID){
            let response = await getStudent(studentID);
            if(response.ok){
                let data = await response.json();
                firstName = data.firstName;
                middleName = data.middleName;
                lastName = data.lastName;
                controlNumber = data.controlNumber;
                email = data.email;
                career = data.career;
            }
        }
    }
</script>

<div class="page-header pt-3">
    <h5 class="text-right">Acciones</h5>
    <div class="d-flex flex-row-reverse ">
        <button class="btn btn-primary btn-sm mx-1" on:click={showEditStudentModal}>Modificar estudiante</button>
        <button class="btn btn-danger btn-sm mx-1" on:click={showDeleteUserModal} >Eliminar estudiante</button>
    </div>
</div>
<Datatable {handler}>
    <table>
        <thead>
            <tr>
                <th class="selection">

                </th>
                <Th {handler} orderBy="name">Nombre</Th>
                <Th {handler} orderBy="career">Carrera</Th>
                <Th {handler} orderBy="controlNumber">No. control</Th>
                <Th {handler} orderBy="email">Correo</Th>

            </tr>

        </thead>
        <tbody use:autoAnimate>
            {#each $rows as row}
                <tr>
                    <td class="selection">
                        <input
                            type="checkbox"
                            on:click={() => handler.select(row.ID)}
                            checked={$selected.includes(row.ID)}
                        />
                    </td>
                    <td class="w-100 p-2">{row.name}</td>
                    <td class="w-100 p-2">{row.career}</td>
                    <td class="p-2">{row.controlNumber}</td>
                    <td class="p-2">{row.email}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</Datatable>

<Toaster />

<div class="modal fade" tabindex="-1" id="deleteEventModal" bind:this={modalDeleteStudent}>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Eliminar usuario</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body
            ">
                <p>¿Estas seguro de eliminar el usuario?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" on:click={hideDeleteUserModal}>Cancelar</button>
                <button type="button" class="btn btn-danger"  on:click={deleteUserData}>Eliminar</button>
            </div>
        </div>
    </div>
</div>


<div class="modal fade" bind:this={modalEditStudent} tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Modificar usuario</h5>
            </div>
            <form>
                <div class="modal-body">

                    <div class="row">
                        <div class="col-md-4 mb-3">
                            <label for="first-name" class="form-label">Nombre</label>
                            <input type="text" class="form-control" id="first-name" bind:value={firstName}>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label for="last-name" class="form-label">Apellido paterno</label>
                            <input type="text" class="form-control" id="last-name" bind:value={middleName}>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label for="maternal-name" class="form-label">Apellido materno</label>
                            <input type="text" class="form-control" id="maternal-name" bind:value={lastName}>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="control-number" class="form-label">Numero de control</label>
                            <input type="text" class="form-control" id="control-number" bind:value={controlNumber}>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="email" class="form-label">Correo electronico</label>
                            <input type="email" class="form-control" id="email" bind:value={email}>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 mb-3">
                            <label for="career" class="form-label">Carrera</label>
                            <select class="form-select" id="career" bind:value={career}>
                                <option value="">Seleccione una carrera</option>
                                {#each careersList as career}
                                    <option value={career.id}>{career.name}</option>
                                {/each}
                            </select>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal" on:click={hideEditStudentModal}>Cerrar</button>
                    <button type="submit" class="btn btn-success" on:click={updateStudentData}>Guardar</button>
                </div>
            </form>

        </div>
    </div>
</div>
