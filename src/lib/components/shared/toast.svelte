<!-- Notification.svelte -->
<script lang="ts">
  import { notifications } from '../../stores/toast';
  import type { Notification } from '../../stores/toast';

  let notificationList: Notification[] = [];

  // Suscríbete al store de notificaciones
  notifications.subscribe((value: Notification[] | unknown) => {
    notificationList = value as Notification[];
  });
</script>

<style>
  /* Agrega aquí tus estilos para las notificaciones */
  .notification {
    padding: 1em;
    margin-bottom: 1em;
    border-radius: 5px;
    color: white;
    font-weight: bold;
  }
  .default { background: gray; }
  .danger { background: red; }
  .warning { background: orange; }
  .info { background: blue; }
  .success { background: green; }
</style>

{#each notificationList as notification (notification.id)}
  <div class="notification fixed-top z-3 {notification.type}">
    {notification.message}
  </div>
{/each}