<script>
  import { user } from "./userStore.js";
</script>

{#if $user.error}{$user.error}{/if}
