<script>
    import { user } from "../../../../lib/stores/user";
    import { removeToken } from "$lib/modules/token";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { getProfileData } from "../../../../API/user.svelte";
    import { setUserName } from "../../../../lib/stores/user";
    import { getToken } from "$lib/modules/token";

    onMount(async () => {

        if (getToken()) {
            const response = await getProfileData();
            if(response.ok){
                const data = await response.json();
                if(data.rol !== "Administrador"){
                    removeUsersPageButton();
                }
                setUserName(`${data.firstName} ${data.middleName} ${data.lastName}`);
            }
            goto('/app/home');
        }
        else{
            goto('/auth/signIn');
        }
    });

    function removeUsersPageButton(){
        const usersPageButton = document.getElementById('usersPageButton');
        if(usersPageButton){
            usersPageButton.remove();
        }
    }
    function logout() {
        removeToken();
        user.set('');
        goto('/auth/signIn');
    }
</script>

<style>
    .hover-gray{
        &:hover{
            background-color: #e3e3e3;
        }
    }

</style>

<div id="sidebar" class="collapse collapse-horizontal show border-end">
  <div id="sidebar-nav" class="list-group border-0 rounded-0 text-sm-start min-vh-100 " style="padding-top: 79px;">


      <a href="/app/home" class="hover-gray list-group-item border-end-0 d-inline-block text-truncate" data-bs-parent="#sidebar"><i class="bi bi-house"></i> <span>Inicio</span> </a>
      <a href="/app/events" class="hover-gray list-group-item border-end-0 d-inline-block text-truncate" data-bs-parent="#sidebar"><i class="bi bi-list-stars"></i> <span>Eventos</span></a>
      <a href="/app/users" class="hover-gray list-group-item border-end-0 d-inline-block text-truncate" id="usersPageButton" data-bs-parent="#sidebar"><i class="bi bi-people"></i> <span>Usuarios</span></a>
      <a href="/app/students" class="hover-gray list-group-item border-end-0 d-inline-block text-truncate" id="usersPageButton" data-bs-parent="#sidebar"><i class="bi bi-people"></i> <span>Estudiantes</span></a>

      <div class="dropdown hover-gray p-1">
        <a href="#" class="d-flex align-items-center text-black text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
            <span class="list-group-item border-end-0 d-inline-block text-truncate border-0">{$user}</span>
        </a>
        <ul class="dropdown-menu  dropdown-menu-dark text-small shadow">
            <!-- svelte-ignore a11y-invalid-attribute -->
            <li>
                <div class="px-2 fs-6 text-white-50 w-100 d-flex justify-items-center align-items-center mx-50">
                <div>
                    Opciones
                </div>
                </div>
                <hr class="dropdown-divider">
            </li>
            <li><button class="dropdown-item p-2" on:click={logout}><i class="bi bi-box-arrow-left px-2"></i>Cerrar sesión</button></li>
        </ul>
    </div>
    </div>

</div>
