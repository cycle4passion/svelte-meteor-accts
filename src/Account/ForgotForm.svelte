<script>
  import { user } from "./userStore.js";
  export let showAlways;
  export let showInitially = false;
  if (showInitially) $user.selection = "forgot";
</script>

{#if showAlways || ($user && !$user.statusLogin && $user.selection === 'forgot')}
  <slot />
{/if}
