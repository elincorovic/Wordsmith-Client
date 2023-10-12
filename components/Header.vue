<script setup lang="ts">
const overlayClicked = useState("overlayClicked", () => false);
</script>

<template>
    <div id="container">
        <header>
            <div id="logo-container">
                <img src="~/assets/logo.png" id="burger-icon" />
            </div>
            <div
                v-if="!overlayClicked"
                id="burger-icon-container"
                @click="overlayClicked = true"
            >
                <img src="~/assets/icons/menu-burger.png" id="burger-icon" />
            </div>
            <div
                v-if="overlayClicked"
                id="close-icon-container"
                @click="overlayClicked = false"
            >
                <img src="~/assets/icons/menu-close.png" id="close-icon" />
            </div>
        </header>

        <div v-if="overlayClicked" id="overlay">
            <ul id="overlay-link-list">
                <li class="overlay-link-container">
                    <a class="overlay-link" href="/">Home</a>
                </li>
                <li class="overlay-link-container">
                    <a class="overlay-link" href="/browse">Books</a>
                </li>
                <li class="overlay-link-container">
                    <a class="overlay-link" href="/about">About Us</a>
                </li>
                <li class="overlay-link-container">
                    <a href="/login"
                        ><ButtonPrimary full-width="true"
                            >LogIn</ButtonPrimary
                        ></a
                    >
                </li>
            </ul>
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

#container {
    position: relative;
    z-index: 2;
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

#close-icon-container {
    width: 33px;
}

#close-icon {
    width: 100%;
}

#overlay {
    height: 92vh;
    position: absolute;
    background-color: $accent;
    padding-left: 15px;
    padding-right: 15px;
    color: white;
    width: 100%;
    box-sizing: border-box;
}

#overlay-link-list {
    list-style-type: none;
    padding-left: 0;
    padding-top: 20px;
}

.overlay-link {
    color: white;
    font-size: x-large;
    text-decoration: none;
}

.overlay-link-container {
    padding-bottom: 20px;
}
</style>
