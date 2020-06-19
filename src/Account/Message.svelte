<script>
  import { user } from "./userStore.js";
</script>

{#if $user.message}{$user.message}{/if}
