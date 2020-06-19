<script>
  import { user } from "./userStore.js";
  export let hideIfShowing;
</script>

{#if (!(hideIfShowing && $user.selection === 'forgot') || hideIfShowing === undefined) && $user && !$user.statusLogin && $user.selection !== ''}
  <slot />
{/if}
