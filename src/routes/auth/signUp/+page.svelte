<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { getCareers } from '../../../API/careers.svelte';
  import { signUp } from '../../../API/auth.svelte';
  import toast, { Toaster } from 'svelte-french-toast';
  let careersList:any[] = [];

  let data = {
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    career: '',
    password: '',
    careerID:0
  }
  onMount(async () => {
    const response = await getCareers();
      console.log(response);
    if(response.ok){
      careersList = await response.json();
    }

  });

  async function signUpUser(){
    const response = await signUp(data.email, data.password, data.firstName, data.middleName, data.lastName, data.careerID);
    if(response.ok){
      toast.success('Usuario creado exitosamente');
      goto('/auth/signIn');
    }else{
      console.log('Error al crear usuario');
    }
  }
</script>

<style>
  label{
    font-size: 0.8rem;
  }
</style>

<form class="px-3">

    <div class="row mb-3 flex justify-items-center align-items-center align-items-middle">
      <div class="">
        <label for="first-name" class="form-label text-muted">Nombre</label>
        <input type="text" class="form-control" id="first-name" placeholder="John" required bind:value={data.firstName}>
      </div>
      <div class="">
        <label for="middle-name" class="form-label text-muted">Apellido Paterno</label>
        <input type="text" class="form-control" id="middle-name" placeholder="Doe" required bind:value={data.middleName}>
      </div>
      <div class="">
        <label for="last-name" class="form-label text-muted">Apellido Materno</label>
        <input type="text" class="form-control" id="last-name" placeholder="Doe" required bind:value={data.lastName}>
      </div>
    </div>

      <div class="col">
        <label for="email" class="form-label text-muted">Correo electronico</label>
        <input type="email" class="form-control" id="email" placeholder="m@example.com" required bind:value={data.email}>
      </div>
      <div class="col">
        <label for="career" class="form-label text-muted">Carrera</label>
        <select class="form-select" id="career" required bind:value={data.careerID}>
          <option value="">Selecciona una carrera</option>
          {#each careersList as career}
            <option value={career.id}>{career.name}</option>
          {/each}
          </select>
      </div>


    <div class="mb-3">
      <label for="password" class="form-label text-muted">Contraseña</label>
      <input type="password" class="form-control" id="password" required bind:value={data.password}>
    </div>
    <button type="submit" class="btn btn-primary w-100" on:click={signUpUser}>Crear Cuenta</button>
</form>

<Toaster/>