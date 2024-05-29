<script lang="ts">
    import { onMount,onDestroy } from 'svelte';
    import QrScanner from 'qr-scanner';
    import { goto } from '$app/navigation';
    import {saveStudentByUrl,getStudents,saveStudentAssitanceByControlNumber,saveStudent} from '../../../../../API/students.svelte';
    import { getCareers } from '../../../../../API/careers.svelte';
	import toast, { Toaster } from 'svelte-french-toast';
    import Loading from '$lib/components/shared/loading.svelte';
    import { showLoading,hideLoading } from '$lib/stores/loading';
    export let data;

    let qrScanner:any;
    let videoElem:any;
    let debounceTimeout:any;
     /**
	 * @type {string | Element }
	 */
    let modalRegisterStudent:any;
    let firstName = '';
    let middleName = '';
    let lastName = '';
    let maternalName = '';
    let controlNumber = '';
    let searchStudentControlNumber = '';
    let careersData:any[] = [];
    let email = '';
    let career = '';
    let tmpStudents:any[] = [];
    let studentsData:any[] = [];
    onMount(async () => {
        removeBackgroundBug();
        loadStudentsData();
        loadCareersData();
        qrScanner = new QrScanner(
            videoElem,
            result => showQrResult(result),
            { 
                
            },
        );
        qrScanner.start();
    });

    onDestroy(() => {
        if(qrScanner){
            qrScanner.stop();
        }
    }); 

    async function loadStudentsData(){
        const response = await getStudents();
        if(response.ok){
            const responseData = await response.json();
            console.log(responseData)
            studentsData = responseData;
        }
    }

    async function loadCareersData(){
        const response = await getCareers();
        if(response.ok){
            const responseData = await response.json();
            careersData = responseData;
        }
    }

    async function generalModalSaveStudent(){
        if(searchStudentControlNumber){
            await saveStudentAssistanceByControlNumber();
        }else{
            await saveStudentData();
        }
        
    }

    async function saveStudentAssistanceByControlNumber(){
        showLoading();
        if(searchStudentControlNumber){
            
            const response = await saveStudentAssitanceByControlNumber(searchStudentControlNumber, data.id);
            if(response.status === 201){
                toast.success('Estudiante registrado correctamente');
                let data = await response.json();
                tmpStudents = [...tmpStudents, data];
                hideRegisterStudentModal();
            }else{
                toast.error('Error al registrar estudiante');
            }
            
        }else{
            toast.error('Ingrese un numero de control');
        }
        hideLoading();
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
            if(response.status === 201){
                toast.success('Estudiante registrado correctamente');
                let data = await response.json();
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

    function resetForm(){
        firstName = '';
        middleName = '';
        lastName = '';
        controlNumber = '';
        email = '';
        career = '';
    }

    async function showQrResult(result:any) {
        showLoading();
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        debounceTimeout = setTimeout(async () => {
            try {
                const response = await saveStudentByUrl(result.data, data.id);
                if (response.status === 200) {
                    toast.success('Estudiante registrado correctamente');
                    let data = await response.json();
                    
                    tmpStudents = [...tmpStudents, data];
                    console.log(data)
                } else {
                    toast.error('Error al registrar estudiante');
                }
            } catch (error) {
                toast.error('Error al registrar estudiante');
            }
            hideLoading();
        }, 400);
       
    }

    function removeBackgroundBug(){
        const div = document.querySelector('.modal-backdrop');
        if(div){
            div.remove();
        }
    }

    function goBack(){
        goto('/app/events');
    }

    async function showRegisterStudentModal() {
        const bootstrap = await import('bootstrap');
        // @ts-ignore
        const CreateEvents =  bootstrap.Modal.getOrCreateInstance(modalRegisterStudent);
        CreateEvents.show();
    }
    async function hideRegisterStudentModal() {
        const bootstrap = await import('bootstrap');
        // @ts-ignore
        const CreateEvents =  bootstrap.Modal.getOrCreateInstance(modalRegisterStudent);
        CreateEvents.hide();
    }
</script>
<div class="page-header pt-3">
    <h2>Registo de asistencias</h2>
</div> 
<p class="lead">Registre las asistencias de los participantes</p>
<hr>
<div class="row">
    <div class="col-12 col-md-8">
        <div class="bg-white rounded-lg shadow-lg p-4 d-flex flex-column align-items-center">
            <div class="video-container rounded-lg d-flex justify-content-center">
                <!-- svelte-ignore a11y-media-has-caption -->
                <video bind:this={videoElem} class="w-75"></video>
            </div>
            <p class="mt-2 text-secondary">
                Escanee el código QR del participante para registrar su asistencia
            </p>
        </div>
    </div>
    <div class="col-12 col-md-4 p-4 bg-white flex-column-scroll">
        <div class="flex-grow-1 ">
            <h2 class="text-lg font-weight-s-emibold mb-4">Historial de asistencias</h2>
            <div class="d-grid gap-4 overflow-auto">
                {#each tmpStudents as student}
                
                    <div class="bg-light rounded-lg p-2  d-flex justify-content-center align-items-center">
                        <!-- svelte-ignore a11y-img-redundant-alt -->
                        {#if student.image}
                            <img src={student.image} alt="Foto de perfil" class="rounded-circle" width="50" height="50">
                        {:else}
                            <div class="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center" style="width: 50px; height: 50px;">
                                <i class="bi bi-person"></i>
                            </div>
                        {/if}
                        
                        <p class="font-weight-medium mx-2">{student.first_name} {student.middle_name} {student.last_name}</p>
                        <p class="text-muted small">{student.career}</p>
                        
                    </div>
                    
               
                {/each}
               
            </div>
        </div>
        <div class="mt-4 d-flex justify-content-between" >
            <button class="btn btn-outline-secondary" on:click={goBack}>Volver</button>
            
            <button class="btn btn-primary" on:click={showRegisterStudentModal}>Registro manual</button>
        </div>
    </div>
</div>


<div class="modal fade" id="createEvent" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" bind:this={modalRegisterStudent}>
    <div class="modal-dialog modal-dialog-centered " role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Registrar estudiante</h5>
          
        </div>
        
        <form>
            <div class="modal-body">
                <div class="mb-3">
                    <label for="email" class="form-label">Buscar estudiante</label>
                    <input type="text" class="form-control" list="students" name="student" id="student" bind:value={searchStudentControlNumber}>
                </div>
                <hr>
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
                <button type="submit" class="btn btn-success" on:click={generalModalSaveStudent}>Guardar</button>
            </div>
        </form>
      </div>
    </div>
</div>

<datalist id="students">
    {#each studentsData as student}
        <option value={student.controlNumber}></option>
    {/each}
</datalist>
  <Loading/>
  <Toaster/>