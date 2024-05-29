<script lang="ts">
    import { DataHandler, Datatable, Th, ThFilter } from '@vincjo/datatables'
    import { onMount,afterUpdate } from 'svelte';
    import toast, { Toaster } from 'svelte-french-toast';
    import { getEvents,deleteEvent,editEvent,getEvent } from '../../../../API/events.svelte';
    import autoAnimate from "@formkit/auto-animate"
    import { goto } from '$app/navigation';
    export let events: any[]  = [];
    let modalDeleteEvent:any;
    let modalEditEvent:any;
    let name:string = '';
    let handler = new DataHandler(events,{rowsPerPage: 5});
    let rows = handler.getRows();
    let selected = handler.getSelected();
    let isAllSelected = handler.isAllSelected();
   
    afterUpdate(()=>{
        handler.setRows(events);
        rows = handler.getRows();
    })
   
    function goToEventDetail(){
        let eventID = getEventIDOrAlert();
        if(eventID){
            goto(`/app/events/${eventID}`);
        }
    }

    function goToRegisterAssistances(){
        let eventID = getEventIDOrAlert();
        if(eventID){
            goto(`/app/events/assistances/${eventID}`);
        }
    }

    function resetSelected(){
        selected.set([]);
    }

    function getEventIDOrAlert(){
        let eventsIDList:number[] = [];
        selected.subscribe(value => {
            eventsIDList =  value;
        });
        
        if(eventsIDList.length == 1){
            return eventsIDList[0];
        }
        else if(eventsIDList.length == 0){
            toast.error('Seleccione un evento');
        }
        else {
            toast.error('Seleccione un solo evento');
        }
    }

    async function loadEvents(){
        const response = await getEvents();
        if(response.ok){
            events = await response.json();
            handler.setRows(events);
        }
    }

    async function getEventData(){
        let eventID = getEventIDOrAlert();
        if(eventID){
            const response = await getEvent(eventID);
            if(response.ok){
                const event = await response.json();
                console.log(event)
                name = event.event;
            }
        }
    }
    async function deleteTableEvent(){
        let eventID = getEventIDOrAlert();
        if(eventID){
            const response = await deleteEvent(eventID);
            if(response.ok){
                
                toast.success('Evento eliminado');
                hideDeleteEventModal();
                resetSelected();
                loadEvents();
            }else{
                toast.error('Error al eliminar evento');
            }
        }
    }

    async function showDeleteEventModal(){
        let eventID = getEventIDOrAlert();
        if(eventID){
            const bootstrap = await import('bootstrap');
            // @ts-ignore
            const DeleteEvent =  bootstrap.Modal.getOrCreateInstance(modalDeleteEvent);
            DeleteEvent.show();
        }
    }
    
    async function hideDeleteEventModal(){
        const bootstrap = await import('bootstrap');
        // @ts-ignore
        const DeleteEvent =  bootstrap.Modal.getOrCreateInstance(modalDeleteEvent);
        DeleteEvent.hide();
    }

    async function showEditEventModal(){
        let eventID = getEventIDOrAlert();
        if(eventID){
            getEventData();
            const bootstrap = await import('bootstrap');
            // @ts-ignore
            const EditEvent =  bootstrap.Modal.getOrCreateInstance(modalEditEvent);
            EditEvent.show();
        }
    }

    async function hideEditEventModal(){
        const bootstrap = await import('bootstrap');
        // @ts-ignore
        const EditEvent =  bootstrap.Modal.getOrCreateInstance(modalEditEvent);
        EditEvent.hide();
    }

    async function editTableEvent(){
        let eventID = getEventIDOrAlert();
        if(eventID){
            const response = await editEvent(eventID,name);
            if(response.ok){
                toast.success('Evento editado');
                hideEditEventModal();
                resetSelected();
                loadEvents();
            }else{
                toast.error('Error al editar evento');
            }
        }
    }
</script>
<div class="page-header pt-3">
    <h5 class="text-right">Acciones</h5>
    <div class="d-flex flex-row-reverse ">
        <button class="btn btn-primary btn-sm mx-1" on:click={showEditEventModal}>Editar evento</button>
        <button class="btn btn-primary btn-sm mx-1" on:click={goToRegisterAssistances}>Registrar asistencias</button>
        <button class="btn btn-danger btn-sm mx-1" on:click={showDeleteEventModal}>Eliminar evento</button>
        <button class="btn btn-primary btn-sm mx-1" on:click={goToEventDetail}>Ver evento</button>
    </div>

</div>
<Datatable {handler}>
    <table>
        <thead>
            <tr>
                <th class="selection">
                    
                </th>
                <Th {handler} orderBy="name">Nombre del evento</Th>
                <Th {handler} orderBy="user">Nombre del organizador</Th>
                <Th {handler} orderBy="createdAt">Fecha de creación</Th>
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
                    <td>{row.user}</td>
                    <td>{row.createdAt}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</Datatable>

<div class="modal fade" tabindex="-1" id="deleteEventModal" bind:this={modalDeleteEvent}>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Eliminar evento</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body
            ">
                <p>¿Estas seguro de eliminar el evento?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-danger"  on:click={deleteTableEvent}>Eliminar</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="createEvent" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" bind:this={modalEditEvent}>
    <div class="modal-dialog  " role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Editar evento</h5>
          
        </div>
        <form>
            <div class="modal-body">
                    <div class="mb-3">
                        <label for="email" class="form-label">Nombre del evento</label>
                        <input type="text" class="form-control" id="name" aria-describedby="emailHelp" bind:value={name}>
                    </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal" on:click={hideEditEventModal}>Cerrar</button>
                <button type="submit" class="btn btn-success" on:click={editTableEvent}>Guardar</button>
            </div>
        </form>
      </div>
    </div>
</div>
<Toaster />

<style>
    thead {
        background: #fff;
    }
    thead th.selection {
        width: 48px;
        padding-left: 8px;
        border-bottom: 1px solid #e0e0e0;
    }
    tbody td {
        border: 1px solid #f5f5f5;
        padding: 4px 20px;
    }
    tbody tr {
        transition: all, 0.2s;
    }
    tbody tr:hover {
        background: #f5f5f5;
    }
    tbody tr.active {
        background: var(--primary-lighten-1);
    }
    tbody tr.active:hover {
        background: var(--primary-lighten-2);
    }
    td :global(b) {
        font-weight: normal;
        color: #bdbdbd;
        font-family: JetBrains;
        font-size: 11px;
    }
    td.selection {
        padding-left: 24px;
    }
</style>