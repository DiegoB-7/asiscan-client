<script lang="ts">
    import toast, { Toaster } from 'svelte-french-toast';
    import { onMount } from 'svelte';
    import {saveStudent,getStudents} from '../../../API/students.svelte';
    import Students from '../../../lib/components/app/students/studentstable.svelte';
    import {getCareers} from '../../../API/careers.svelte';
    let manageStudentsModal:any;
    let createStudentModal:any;
    let firstName = '';
    let middleName = '';
    let lastName = '';

    let controlNumber = '';

    let careersData:any[] = [];
    let email = '';
    let career = '';
    let studentsData:any[] = [];

    onMount(async () => {


        loadCareersData();
    });

    async function showManageStudentsModal() {
        loadStudentsData();
        const bootstrap = await import('bootstrap');
        // @ts-ignore
        const ManageUsers =  bootstrap.Modal.getOrCreateInstance(manageStudentsModal);
        ManageUsers.show();
    }

    async function hideManageUserModal() {
        const bootstrap = await import('bootstrap');
        // @ts-ignore
        const ManageUsers =  bootstrap.Modal.getOrCreateInstance(manageStudentsModal);
        ManageUsers.hide();
    }

    async function showRegisterStudentModal() {
        const bootstrap = await import('bootstrap');
        // @ts-ignore
        const ManageUsers =  bootstrap.Modal.getOrCreateInstance(createStudentModal);
        ManageUsers.show();
    }

    async function hideRegisterStudentModal() {
        const bootstrap = await import('bootstrap');
        // @ts-ignore
        const ManageUsers =  bootstrap.Modal.getOrCreateInstance(createStudentModal);
        ManageUsers.hide();
    }

    async function loadStudentsData(){
        let response = await getStudents();
        if(response.ok){
            let data = await response.json();

            studentsData = data;
        }
    }

    async function loadCareersData(){
        let response = await getCareers();
        if(response.ok){
            let data = await response.json();
            careersData = data;
        }
    }

    function resetForm(){
        firstName = '';
        middleName = '';
        lastName = '';
        controlNumber = '';
        email = '';
        career = '';
    }

    async function saveStudentData(){
        if(firstName && middleName && lastName && controlNumber && email && career){

            if(email.indexOf('@') === -1 || email.indexOf('.') === -1){
                toast.error('Ingrese un correo valido');
                return;
            }
            const response = await saveStudent({
                firstName: firstName,
                middleName: middleName,
                lastName: lastName,
                controlNumber: controlNumber,
                email ,
                careerID:career
            });
            alert(response.status)
            if(response.ok){
                toast.success('Estudiante registrado correctamente');

                loadStudentsData();

                hideRegisterStudentModal();
                resetForm();
            }else{
                toast.error('Error al registrar estudiante');
            }

        }else{
            toast.error('Llene todos los campos');
        }
    }
</script>

<div class="page-header pt-3">
    <h2>Estudiantes</h2>
</div>
<p class="lead">Modulo para la gestión de estudiantes</p>
<hr>
<div class="row">
    <div class="col-md-6">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Administrar estudiantes</h3>
            </div>
            <div class="card-body">
                <p>En esta sección podras gestionar los estudiantes de la plataforma</p>
                <button class="btn btn-primary" data-toggle="modal" data-target="#manageEvent" on:click={showManageStudentsModal}>Administrar estudiantes</button>
            </div>
        </div>
    </div>
    <div class="col-md-6">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Registrar estudiantes</h3>
            </div>
            <div class="card-body">
                <p>
                    En esta sección podras registrar estudiantes en los eventos de la plataforma
                </p>
                <button class="btn btn-primary" data-toggle="modal" data-target="#createEvent" on:click={showRegisterStudentModal} >
                    Registrar estudiantes
                </button>
            </div>
        </div>
    </div>
</div>

<Toaster/>
<!-- Modal -->
<div class="modal fade" id="createEvent" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" bind:this={manageStudentsModal}>
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Administrar estudiantes</h5>

        </div>
        <div class="modal-body">
            <Students data={studentsData}/>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" on:click={hideManageUserModal}>Cerrar</button>

        </div>
      </div>
    </div>
</div>

<!-- Modal -->
<div class="modal fade" id="createEvent" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" bind:this={createStudentModal}>
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Administrar estudiantes</h5>

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
                            {#each careersData as career}
                                <option value={career.id}>{career.name}</option>
                            {/each}
                        </select>
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal" on:click={hideRegisterStudentModal}>Cerrar</button>
                <button type="submit" class="btn btn-success" on:click={saveStudentData}>Guardar</button>
            </div>
        </form>
      </div>
    </div>
</div>
