<script>
    import Sidebar from "../../lib/components/app/general/sidebar.svelte";
	  import Navbar from "../../lib/components/app/general/navbar.svelte";
    import toast, { Toaster } from 'svelte-french-toast';


    toast.success('Bienvenido!')

</script>

<Toaster />

<Navbar/>

<div class="container-fluid">

  <div class="row flex-nowrap">
      <div class="col-auto px-0">
        <Sidebar />
      </div>
      <main class="  col ps-md-2" style="margin-top: 90px;">
        <slot></slot>

      </main>
  </div>
</div>
