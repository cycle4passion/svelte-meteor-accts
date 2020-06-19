<script>
  import { user } from "./userStore.js";
</script>

{#if $user && $user.statusLogin}
  <slot />
{/if}
