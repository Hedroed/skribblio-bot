<template functional>
    <aside>
        <h3>[ * ] Debug</h3>
        <div class="messages">
            <div v-for="(msg, idx) in props.messages" :key="idx">{{msg}}</div>
        </div>
    </aside>
</template>

