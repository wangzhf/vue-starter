<template>
    <div id="app">
        <img src="./assets/logo.png" alt="">
        <h2>Vue Starter</h2>
        <div>
            <button v-on:click="welcome">Start</button>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        welcome () {
            alert('welcome');
        }
    }
}
</script>

<style scoped >
#app {
    text-align: center;
}
</style>

