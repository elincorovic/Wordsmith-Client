<script setup>
definePageMeta({
    layout: "plain",
});
</script>

<template>
    <div>
        <a href="/" id="home-link">Home</a>
        <div id="logo">Logo</div>
        <h1>Welcome Back!</h1>
        <p id="head-text">
            Enter your credentials to access your account and continue your
            journey with us
        </p>
        <form @submit.prevent="onsubmit">
            <input
                class="input-text"
                type="text"
                name="username"
                placeholder="username"
            />
            <input
                class="input-text"
                type="password"
                name="password"
                placeholder="password"
            />
            <div id="inline-wrapper">
                <div id="remember-wrapper">
                    <input type="checkbox" name="remember" id="remember" />
                    <label>Remember Me</label>
                </div>
                <a href="#" class="link">Forgot Password?</a>
            </div>

            <ButtonPrimary :full-width="true">Log In</ButtonPrimary>

            <p id="signup-link">
                Don't have an account yet?
                <a href="/signup" class="link">Sign Up</a> now!
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

#signup-link {
    font-size: 14px;
    margin-top: 30px;
}

#head-text {
    font-size: 14px;
    margin-top: 30px;
    margin-bottom: 30px;
}
</style>
