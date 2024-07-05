<script context="module" lang="ts">
    import {environment} from '$lib/environment'

    export async function getCareers() {
        const response = await fetch(`${environment.API_URL}/careers`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    }

    //create a career
    export async function createCareer(data: any) {
        const response = await fetch(`${environment.API_URL}/careers/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response;
    }

    //is career empty?
    export async function isCareerEmpty() {
        const response = await fetch(`${environment.API_URL}/careers/is_empty`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.json();
    }

</script>