<script setup>
defineProps(["full-width", "to"]);
</script>

<template>
    <a :href="to ? to : ''"
        ><button :class="{ 'full-width': ['full-width'] }"><slot /></button
    ></a>
</template>

<style lang="scss" scoped>
button {
    cursor: pointer;
    background-color: $primary;
    color: white;
    border: none;
    border-radius: 14px;
    padding: 8px 18px 8px 18px;
    font-size: 16px;
}
.full-width {
    width: 100%;
}
</style>
