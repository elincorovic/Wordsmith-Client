<script setup>
definePageMeta({
    layout: 'plain',
})
</script>

<template>
    <div>
        <a href="/" id="home-link">Home</a>
        <div id="logo">Logo</div>
        <h1>Become a Member!</h1>
        <p id="head-text">
            Join Wordsmith and embark on a journey of free literary exploration
            today!
        </p>
        <form @submit.prevent="onsubmit">
            <div id="input-wrapper">
                <input
                    class="input-text"
                    type="text"
                    name="username"
                    placeholder="username"
                />
                <input
                    class="input-text"
                    type="email"
                    name="email"
                    placeholder="email"
                />
                <input
                    class="input-text"
                    type="password"
                    name="password"
                    placeholder="password"
                />
            </div>

            <ButtonPrimary :full-width="true">Sign Up</ButtonPrimary>

            <p id="login-link">
                Don't have an account yet?
                <a href="/login" class="link">Log In</a> now!
            </p>
        </form>
    </div>
</template>

<style scoped lang="scss">
p {
    text-align: center;
}

h1 {
    text-align: center;
    margin: 0;
    margin-top: 30px;
}

#home-link {
    display: block;
    padding-top: 15px;
    text-decoration: none;
    color: rgb(116, 116, 116);
}

#logo {
    margin-top: 50px;
    background-color: $primary;
    color: white;
    padding: 10px;
    text-align: center;
}

#remember {
    margin: 0;
    margin-right: 5px;
}

#remember-wrapper {
    display: flex;
    align-items: center;
}

#inline-wrapper {
    font-size: 14px;
    margin-top: 25px;
    margin-bottom: 25px;
    display: flex;
    justify-content: space-between;
}

#login-link {
    font-size: 14px;
    margin-top: 30px;
}

#button {
    margin-top: 100px;
}

#head-text {
    font-size: 14px;
    margin-top: 30px;
    margin-bottom: 30px;
}

#input-wrapper {
    margin-bottom: 30px;
}
</style>
