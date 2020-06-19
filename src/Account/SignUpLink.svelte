<script>
  import { user } from "./userStore.js";
  export let hideIfShowing;
</script>

{#if (!(hideIfShowing && $user.selection === 'signup') || hideIfShowing === undefined) && !$user.statusLogin && $user.selection !== ''}
  <slot />
{/if}
