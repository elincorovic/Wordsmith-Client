<template>
    <Header></Header>
    <div id="wrapper">
        <slot />
    </div>
    <Footer></Footer>
</template>

<style scoped lang="scss">
#wrapper {
    margin: 20px 15px 40px 15px;
}
</style>
