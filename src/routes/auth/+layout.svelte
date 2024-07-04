<script lang="ts">
import { browser } from "$app/environment";
import { onMount } from "svelte";
import Navbar from "$lib/components/auth/navbar.svelte";
import "bootstrap/dist/css/bootstrap.css";

onMount(async () => {
  if (!browser) return;

  // this is enough for most components
  await import("bootstrap");

  // some components require a bootstrap instance, to fulfil their job. In that case, use this:
  // const bootstrap = await import("bootstrap");
  // sample usage:
  // const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
});</script>

<body>
    <Navbar />
  <main class="container">
    <slot></slot>
  </main>
</body>