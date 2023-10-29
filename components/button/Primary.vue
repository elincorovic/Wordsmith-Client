<script setup>
defineProps(['fullWidth'])
</script>

<template>
    <button :class="{ 'full-width': fullWidth }"><slot /></button>
</template>

<style lang="scss" scoped>
button {
    cursor: pointer;
    background-color: $primary;
    border: 2px solid $primary;
    color: white;
    border-radius: 14px;
    padding: 8px 18px 8px 18px;
    font-size: 16px;
}
.full-width {
    width: 100%;
}
</style>
