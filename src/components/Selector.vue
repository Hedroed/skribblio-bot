<template>
    <section class="container">
        <div class="selector">
            <span>Avatar:</span>
            <div class="skin">
                <div class="left">
                    <canvas ref="canvas" width="150" height="150"></canvas>
                </div>
                <div class="right">
                    <form @change="updateIcon" class="picker">
                        <input type="number" v-model="a">
                        <input type="number" v-model="b">
                        <input type="number" v-model="c">
                        <button @click.prevent="randomIcon">Random</button>
                    </form>
                </div>
            </div>
            <form class="name" @submit.prevent="submit">
                <label for="username">Username: </label>
                <input id="username" type="text" v-model="username" placeholder="patrick" required>
                <label for="lobby">Lobby (optional): </label>
                <input id="lobby" type="text" v-model="lobby" placeholder="---">
                <input type="submit" value="Go" invalid>
            </form>
        </div>
    </section>
</template>

<script>
import {makeCanvas} from '../icons'

export default {
    name: 'Selector',
    data() {
        const skin = JSON.parse(localStorage.getItem("skin")) || [0,0,0]

        return {
            username: localStorage.getItem("name") || '',
            lobby: '',
            a: skin[0],
            b: skin[1],
            c: skin[2],
            drawing: undefined
        }
    },
    methods: {
        submit() {
            localStorage.setItem("name", this.username)
            localStorage.setItem("skin", JSON.stringify([this.a, this.b, this.c]))

            this.$emit('submit', {
                username: this.username,
                skin: [this.a, this.b, this.c],
                lobby: this.lobby
            })
        },
        updateIcon() {
            if(this.drawing) this.drawing.stop()
            this.drawing = makeCanvas(this.$refs.canvas, this.a, this.b, this.c)
        },
        randomIcon() {
            this.a = Math.floor(Math.random() * 31)
            this.b = Math.floor(Math.random() * 24)
            this.c = Math.floor(Math.random() * 18)
            this.updateIcon()
        }
    },
    mounted() {
        this.updateIcon()
    }
}
</script>

<style scoped>

.container {
    justify-content: center;
    align-items: center;
}

.selector {
    width: 400px;
}

.name input {
    width: 100%;
    text-align: center;
}

.skin {
    display: flex;
    justify-content: space-around;
}

.left {
    flex: 1;
    text-align: center;
}

.picker {
    display: flex;
    flex-direction: column;
}

</style>
