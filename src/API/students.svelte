<script context="module" lang="ts">
    import {environment} from '$lib/environment'
    import { getToken } from '$lib/modules/token';

    export async function getStudents() {
        const token = getToken();
        const response = await fetch(`${environment.API_URL}/students`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        return response;
    }

    export async function saveStudentByUrl(URL:string, event_id:string) {
        const token = getToken();

        const response = await fetch(`${environment.API_URL}/students/save_assistance/${event_id}?url=${URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        return response;
    }
    
    export async function getStudent(id:number) {
        const token = getToken();
        const response = await fetch(`${environment.API_URL}/students/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        return response;
    }

    export async function saveStudent(student:any) {
        const token = getToken();

        const response = await fetch(`${environment.API_URL}/students/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(student)
        });

        return response;
    }

    export async function deleteStudent(id:number) {
        const token = getToken();

        const response = await fetch(`${environment.API_URL}/students/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        return response;
    }

    export async function updateStudent(id:number,student:any) {
        const token = getToken();

        const response = await fetch(`${environment.API_URL}/students/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(student)
        });

        return response;
    }
    export async function saveStudentAssitanceByControlNumber(controlNumber:string, event_id:string) {
        const token = getToken();

        const response = await fetch(`${environment.API_URL}/students/save_assistance?control_number=${controlNumber}&eventID=${event_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        return response;
    }
</script>