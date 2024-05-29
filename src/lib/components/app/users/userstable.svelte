<script lang="ts">
    import { onMount,afterUpdate } from 'svelte';
    import { getUsers,deleteUser,updateUser,getUser } from "../../../../API/user.svelte";
    import { getCareers } from '../../../../API/careers.svelte';
    import {getRols} from '../../../../API/rols.svelte';
    import { DataHandler, Datatable, Th, ThFilter } from '@vincjo/datatables'
    import toast, { Toaster } from 'svelte-french-toast';
    import autoAnimate from "@formkit/auto-animate"
    
    export let data: any[]  = [];
    let modalDeleteUser:any;
    let user:any = {};
    let modalEditUser:any;
    let handler = new DataHandler(data,{rowsPerPage: 5});
    let rows = handler.getRows();
    let selected = handler.getSelected();
    let isAllSelected = handler.isAllSelected();
    let careersList:any[] = [];
    let rolsList:any[] = [];

    onMount(async () => {
        loadUsers();
        loadCareers();
        loadRols();
    });
    
    afterUpdate(()=>{
        handler.setRows(data);
        rows = handler.getRows();
    })

    function getUserIDOrAlert(){
        let eventsIDList:number[] = [];
        selected.subscribe(value => {
            eventsIDList =  value;
        });
        
        if(eventsIDList.length == 1){
            return eventsIDList[0];
        }
        else if(eventsIDList.length == 0){
            toast.error('Seleccione un usuario');
        }
        else {
            toast.error('Seleccione un solo usuario');
        }
    }

    async function loadRols(){
        const response = await getRols();
        if(response.ok){
            
            rolsList = await response.json();
            console.log(rolsList)
        }
    }
    async function loadUsers(){
        const response = await getUsers();
        if(response.ok){
            data = await response.json();
            handler.setRows(data);
        }
    }

    async function loadCareers(){
        const response = await getCareers();
        if(response.ok){
            careersList = await response.json();
        }
    }

    async function showEditUserModal(){
        let userID = getUserIDOrAlert();
        if(userID){
            loadUserData();
            const bootstrap = await import('bootstrap');
            // @ts-ignore
            const DeleteEvent =  bootstrap.Modal.getOrCreateInstance(modalEditUser);
            DeleteEvent.show();
        }
    }

    async function hideEditUserModal(){
        const bootstrap = await import('bootstrap');
        // @ts-ignore
        const DeleteEvent =  bootstrap.Modal.getOrCreateInstance(modalEditUser);
        DeleteEvent.hide();
    }

    async function showDeleteUserModal(){
        let userID = getUserIDOrAlert();
        if(userID){
            const bootstrap = await import('bootstrap');
            // @ts-ignore
            const DeleteEvent =  bootstrap.Modal.getOrCreateInstance(modalDeleteUser);
            DeleteEvent.show();
        }
    }

    async function hideDeleteUserModal(){
        const bootstrap = await import('bootstrap');
        // @ts-ignore
        const DeleteEvent =  bootstrap.Modal.getOrCreateInstance(modalDeleteUser);
        DeleteEvent.hide();
    }

    async function loadUserData(){
        let userID = getUserIDOrAlert();
        if(userID){
            const response = await getUser(userID);
            if(response.ok){
                user = await response.json();
                console.log(user)
            }else{
                toast.error('Error al obtener usuario');
            }
        }
    }   

    function resetSelected(){
        selected.set([]);
    }

    async function deleteUserData(){
        let userID = getUserIDOrAlert();
        if(userID){
            const response = await deleteUser(userID);
            if(response.ok){
                toast.success('Usuario eliminado');
                hideDeleteUserModal();
                resetSelected();
                loadUsers();
            }else{
                toast.error('Error al eliminar usuario');
            }
        }
    }

    async function updateUserData(){
        let userID = getUserIDOrAlert();
        if(userID){
            const response = await updateUser(userID,user);
            if(response.ok){
                toast.success('Usuario actualizado');
                hideEditUserModal();
                resetSelected();
                loadUsers();
            }else{
                toast.error('Error al actualizar usuario');
            }
        }
    }


</script>

<div class="page-header pt-3">
    <h5 class="text-right">Acciones</h5>
    <div class="d-flex flex-row-reverse ">
        <button class="btn btn-primary btn-sm mx-1" on:click={showEditUserModal}>Modificar usuario</button>
        <button class="btn btn-danger btn-sm mx-1" on:click={showDeleteUserModal} >Eliminar usuario</button>
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
                <Th {handler} orderBy="rol">Rol</Th>
                <Th {handler} orderBy="email">Correo</Th>
                <Th {handler} orderBy="createdAt">Fecha de registro</Th>
                
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
                    <td>{row.name}</td>
                    <td>{row.career}</td>
                    <td>{row.rol}</td>
                    <td>{row.email}</td>
                    <td>{row.createdAt}</td>

                </tr>
            {/each}
        </tbody>
    </table>
</Datatable>

<Toaster />

<div class="modal fade" tabindex="-1" id="deleteEventModal" bind:this={modalDeleteUser}>
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

<div class="modal fade" bind:this={modalEditUser} tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Modificar usuario</h5>
            </div>
            <form>
                <div class="modal-body">
                    <div class="row mb-3">
                        <div class="col">
                          <label for="first-name" class="form-label text-muted">Nombre</label>
                          <input type="text" class="form-control" id="first-name" placeholder="John"  bind:value={user.firstName}>
                        </div>
                        <div class="col">
                          <label for="middle-name" class="form-label text-muted">Apellido Paterno</label>
                          <input type="text" class="form-control" id="middle-name" placeholder="Doe"  bind:value={user.middleName}>
                        </div>
                      </div>
                      <div class="mb-3">
                        <label for="last-name" class="form-label text-muted">Apellido Materno</label>
                        <input type="text" class="form-control" id="last-name" placeholder="Doe"  bind:value={user.lastName}>
                      </div>
                      <div class="mb-3">
                        <label for="email" class="form-label text-muted">Correo electronico</label>
                        <input type="email" class="form-control" id="email" placeholder="m@example.com"  bind:value={user.email}>
                      </div>
                      <div class="row mb-3">
                        <div class="col">
                            <label for="career" class="form-label text-muted">Carrera</label>
                            <select class="form-select" id="career"  bind:value={user.careerID}>
                                <option value="">Selecciona una carrera</option>
                                {#each careersList as career}
                                    <option value={career.id}>{career.name}</option>
                                {/each}
                          </select>
                        </div>
                        <div class="col">
                            <label for="career" class="form-label text-muted">Rol</label>
                            <select class="form-select" id="rol"  bind:value={user.rolID}>
                                {#each rolsList as rol}
                                    <option value={rol.id}>{rol.name}</option>
                                {/each}
                          </select>
                        </div>
                        
                      </div>
                      <div class="mb-3">
                        <label for="password" class="form-label text-muted">Contraseña</label>
                        <input type="password" class="form-control" id="password"  bind:value={user.password}>
                      </div>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal" on:click={hideEditUserModal}>Cerrar</button>
                <button type="submit" class="btn btn-success" on:click={updateUserData}>Guardar</button>
                </div>
            </form>
        </div>
    </div>
</div>

