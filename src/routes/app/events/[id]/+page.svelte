<script lang="ts">
    import { onMount } from 'svelte';
    import { getEventData,getEventExcel } from '../../../../API/events.svelte';
    import Loading from '$lib/components/shared/loading.svelte';
    import Eventsdetailtable from '$lib/components/app/events/eventsdetailtable.svelte';
    import {showLoading,hideLoading} from '$lib/stores/loading';
    export let data;

    let event:any = {};
    let assistances: never[] = [];
    onMount(async () => {
        loadEventData();
        removeBackgroundBug();
    });

    async function loadEventData(){
        showLoading();
        const response = await getEventData(Number(data.id));
        if(response.ok){
            const responseData = await response.json();
            
            event = responseData.event;
            assistances = responseData.students_assist;
            console.log(assistances)
            hideLoading();
        }
    }

    function removeBackgroundBug(){
        const div = document.querySelector('.modal-backdrop');
        if(div){
            div.remove();
        }
    }

    async function handlegenerateExcel(event:any){
        const response = await getEventExcel(data.id,event.detail.quantity);
        if(response.ok){
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'reporte.xlsx';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        }
    }
</script>

<div class="page-header pt-3">
    <h2>{event.name}</h2>
</div>
<p class="lead">Creado por: <strong>{event.user}</strong></p>
<p class="lead">Fecha de creación: <strong>{event.createdAt}</strong></p>
<hr>
<div class="row">
    <div class="col-md-12">
        <Eventsdetailtable data={assistances} on:generateExcel={handlegenerateExcel} on:loadData={loadEventData}/>
    </div>
</div>

<Loading/>