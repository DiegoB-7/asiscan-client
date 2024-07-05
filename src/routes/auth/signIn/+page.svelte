<script>
  import { signIn } from '../../../API/auth.svelte';
  import { getProfileData } from '../../../API/user.svelte';
  import { goto } from '$app/navigation';
	import Loading from '../../../lib/components/shared/loading.svelte';
  import toast, { Toaster } from 'svelte-french-toast';
  import { showLoading,hideLoading } from '../../../lib/stores/loading';
  import { showSuccessToast } from '../../../lib/stores/toast';
  import {setToken} from '../../../lib/modules/token';
  let email = '';
  let password = '';
 
  async function signInUser(){
    
    showLoading();
    const response = await signIn(email, password);

    if(response.ok){
      const bodyData = await response.json();
      setToken(bodyData.access_token);
      hideLoading();
      goto('/app/home');
    }else{
     hideLoading();
     toast.error('Credenciales incorrectas');
    }
  }

</script>
  <form class="px-5">
    <div class="mb-3">
      <label for="email" class="form-label">Correo Electronico</label>
      <input type="email" class="form-control" id="email" aria-describedby="emailHelp" bind:value={email}>
     
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">Contraseña</label>
      <input type="password" class="form-control" id="password" bind:value={password}>
    </div>
    <button type="submit" class="btn btn-primary" on:click={signInUser}>Iniciar sesión</button>
  </form>

<Loading />
<Toaster />