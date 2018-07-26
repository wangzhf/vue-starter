<template>
    <div id="app">
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

<style>
#app {
    text-align: center;
}
</style>

