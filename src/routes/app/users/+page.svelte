<script lang="ts">
    import UsersTable from '../../../lib/components/app/users/userstable.svelte';
    
    import {getUsers} from '../../../API/user.svelte';
    let modalManageUsers:any;
    let usersData:any[] = [];

    async function showManageUserModal() {
        await loadUsers();
        const bootstrap = await import('bootstrap');
        // @ts-ignore
        const ManageUsers =  bootstrap.Modal.getOrCreateInstance(modalManageUsers);
        ManageUsers.show();
    }

    async function hideManageUserModal() {
        const bootstrap = await import('bootstrap');
        // @ts-ignore
        const ManageUsers =  bootstrap.Modal.getOrCreateInstance(modalManageUsers);
        ManageUsers.hide();
    }

    async function loadUsers(){
        let response = await getUsers();
        let data = await response.json();
        usersData = data;
    }
</script>

<div class="page-header pt-3">
    <h2>Usuarios</h2>
</div>
<p class="lead">Modulo para la gestión de usuarios</p>
<hr>
<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Administrar usuarios</h3>
            </div>
            <div class="card-body">
                <p>
                    En esta sección podras gestionar los estudiantes de la plataforma
                </p>
                <button class="btn btn-primary" data-toggle="modal" data-target="#manageEvent" on:click={showManageUserModal}>Administrar usuarios</button>
            </div>
        </div>
    </div>
    
</div>

<!-- Modal -->
<div class="modal fade" id="createEvent" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" bind:this={modalManageUsers}>
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Administrar usuarios</h5>
          
        </div>
        <div class="modal-body">
            <UsersTable data={usersData} />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" on:click={hideManageUserModal}>Cerrar</button>
          
        </div>
      </div>
    </div>
</div>

