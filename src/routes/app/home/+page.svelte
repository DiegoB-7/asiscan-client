<!--styled buttons to other pages-->
<script>
  import Icon from '@iconify/svelte';
</script>

<div class="page-header pt-3">
  <h2>Inicio</h2>
</div>
<p class="lead">Módulos del sistema</p>
<hr>

<div class="w-100 d-flex flex-column gap-3">

  <a href="/app/events" class="w-25 btn btn-primary px-4 d-flex gap-4">
    <div class="  d-flex justify-content-center align-items-center">
      <Icon icon="mdi:calendar"  width="32" height="32" />
    </div>
    <div  class="w-75 text-start flex-column">
      <div class="fs-4">
        Eventos
      </div>
      <p class="lead fs-6">Crear, editar y ver eventos de asistencia</p>
    </div>

  </a>

  <a href="/app/users" class="w-25 btn btn-primary px-4 d-flex gap-4">
    <div class="  d-flex justify-content-center align-items-center">
      <Icon icon="mdi:users" width="32" height="32" />
    </div>
    <div  class="w-75 text-start flex-column">
      <div class="fs-4">
        Usuarios
      </div>
      <p class="lead fs-6">Crear, editar y ver usuarios del sistema</p>
    </div>

  </a>

  <a href="/app/students" class="w-25 btn btn-primary px-4 d-flex gap-4">
    <div class="  d-flex justify-content-center align-items-center">
      <Icon icon="ph:student" width="32" height="32" />
    </div>
    <div  class="w-75 text-start flex-column">
      <div class="fs-4">
        Estudiantes
      </div>
      <p class="lead fs-6">Crear, editar y ver estudiantes</p>
    </div>

  </a>



</div>
