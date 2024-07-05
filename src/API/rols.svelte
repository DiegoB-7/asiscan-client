<script context="module" lang="ts">
    import {environment} from '$lib/environment'

    export async function getRols() {
        const response = await fetch(`${environment.API_URL}/rols`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    }

    //create rol
    export async function createRol(data: any) {
        const response = await fetch(`${environment.API_URL}/rols/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response;
    }

    //is rol table empty?
    export async function isRolEmpty() {
        const response = await fetch(`${environment.API_URL}/rols/is_empty`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.json();
    }

</script>