<script context="module" lang="ts">
    import { getToken } from '$lib/modules/token';
    import {environment} from '$lib/environment'

    export async function createEvent(name:string) {
        const token = getToken();

        const response = await fetch(`${environment.API_URL}/events/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({name})
        });
        return response;
    }

    export async function getEvents(){
        const token = getToken();
       
        const response = await fetch(`${environment.API_URL}/events`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        return response;
    }

    export async function deleteEvent(id:number){
        const response = await fetch(`${environment.API_URL}/events/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response;
    }

    export async function editEvent(id:number,name:string){
        const response = await fetch(`${environment.API_URL}/events/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name})
        });

        return response;
    }

    export async function getEvent(id:number){
        const response = await fetch(`${environment.API_URL}/events/detail/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response;
    }

    export async function getEventData(id:number){
        const response = await fetch(`${environment.API_URL}/events/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response;
    }

    export async function deleteAssist(id:number){
        const response = await fetch(`${environment.API_URL}/events/assist/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response;
    }

    export async function getAssistData(id:number){
        const response = await fetch(`${environment.API_URL}/events/assist/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response;
    }
    
    export async function updateAssist(id:number,quantity:number){
        const response = await fetch(`${environment.API_URL}/events/assist/${id}/${quantity}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            
        });

        return response;
    }
    export async function getEventExcel(id:string,quantity:number){
        const response = await fetch(`${environment.API_URL}/events/download_report/${id}/${quantity}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response;
    }
</script>