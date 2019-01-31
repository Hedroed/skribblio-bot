<template>

    <Selector v-if="state == 0" @submit="choosePlayer"/>
    <Main :player="player" v-else @reset="reset" :username="player.username" :skin="player.skin"/>

</template>

<script>
import Selector from './components/Selector.vue'
import Main from './components/Main.vue'

export default {
    name: 'App',
    data(){
        return {
            state: 0,
            player: undefined
        }
    },
    methods: {
        choosePlayer(p) {
            this.state = 1
            this.player = p
        },
        reset() {
            this.state = 0
            this.player = undefined
        }
    },
    components: {
        Main,
        Selector
    }
}

</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat');

* {
    box-sizing: border-box;
}

html, body{
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
}

body{
    background-color: #4b4b4b;
    font-family: 'Montserrat', sans-serif;
    color: #fff;
}

h1{
    margin: 30px 0;
    text-align: center;
}

.container{
    display: flex;
    height: 100%;
    width: 100%;
}

</style>
