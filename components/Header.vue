<script></script>

<template>
    <div id="container">
        <header>
            <div id="logo-container">
                <img src="~/assets/logo.png" id="burger-icon" />
            </div>
            <div id="burger-icon-container">
                <img src="~/assets/icons/menu-burger.png" id="burger-icon" />
            </div>
        </header>

        <div id="overlay">
            <a class="overlay-link">Home</a>
            <a class="overlay-link">Books</a>
            <a class="overlay-link">About Us</a>
        </div>
    </div>
</template>

<style lang="scss" scoped>
header {
    height: 8vh;
    background-color: $accent;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 15px;
    padding-right: 15px;
}

h1 {
    margin: 0;
    color: white;
}

#overlay {
    height: 92vh;
    position: absolute;
    background-color: $accent;
    padding-left: 15px;
    padding-right: 15px;
    color: white;
    width: 100vw;
}

#logo-container {
    width: 200px;
}

#logo {
    width: 100%;
}

#burger-icon-container {
    width: 33px;
}

#burger-icon {
    width: 100%;
}
</style>
