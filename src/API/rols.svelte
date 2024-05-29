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

</script>