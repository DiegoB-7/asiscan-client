<script lang="ts">
  import { browser } from "$app/environment";
  import { onMount } from "svelte";
  import "bootstrap/dist/css/bootstrap.css";
  import "bootstrap-icons/font/bootstrap-icons.css";


  import { default_values_to_db_function } from '../utils/default_values_to_db.svelte';


  onMount(async () => {

    await default_values_to_db_function();

    if (!browser) return;

    // this is enough for most components
    await import("bootstrap");
    await import("../main.scss");

    // some components require a bootstrap instance, to fulfil their job. In that case, use this:
    // const bootstrap = await import("bootstrap");
    // sample usage:
    // const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
  });
  </script>

  <svelte:head>
    <title>Asiscan</title>
  </svelte:head>
  <slot></slot>
