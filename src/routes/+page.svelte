<script>
    import { onMount } from "svelte";
    import {getProfileData} from '../API/user.svelte';
    import { setUserName } from "../lib/stores/user";
    import { getToken } from "$lib/modules/token";
    import { goto } from "$app/navigation";



    onMount(async () => {


        if(getToken()){
            goto('/app/home');
        }else{
            goto('/auth/signIn');
        }

    });






</script>