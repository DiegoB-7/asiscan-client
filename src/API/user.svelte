<script context="module" lang="ts">
    import { getToken } from '$lib/modules/token';
    import {environment} from '$lib/environment'



    export async function getProfileData(){
        const token = getToken();

        const response = await fetch(`${environment.API_URL}/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        return response;
    }

    export async function getUsers(){
        const token = getToken();

        const response = await fetch(`${environment.API_URL}/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        return response;
    }

    export async function getUser(id:number){
        const token = getToken();

        const response = await fetch(`${environment.API_URL}/users/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        return response;
    }

    export async function deleteUser(id:number){
        const token = getToken();

        const response = await fetch(`${environment.API_URL}/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        return response;
    }

    export async function updateUser(id:number,user:any){
        const token = getToken();

        const response = await fetch(`${environment.API_URL}/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(user)
        });

        return response;
    }

    //is user table empty?
    export async function isUserEmpty(){

        const response = await fetch(`${environment.API_URL}/users/is_empty`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response.json();
    }

</script>