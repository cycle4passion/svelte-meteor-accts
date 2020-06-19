<script>
  import { user } from "./userStore.js";
  export let hideIfShowing;
</script>

{#if (!(hideIfShowing && $user.selection === 'login') || hideIfShowing === undefined) && $user && !$user.statusLogin}
  <slot />
{/if}
