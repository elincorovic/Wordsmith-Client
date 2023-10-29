<script setup>
defineProps(['fullWidth'])
</script>

<template>
    <button :class="{ 'full-width': fullWidth }"><slot /></button>
</template>

<style lang="scss" scoped>
button {
    cursor: pointer;
    color: $primary;
    border: 2px solid $primary;
    border-radius: 14px;
    padding: 8px 18px 8px 18px;
    font-size: 16px;
    background: none;
}
.full-width {
    width: 100%;
}
</style>
