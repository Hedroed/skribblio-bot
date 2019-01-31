<template>
    <canvas ref="canvas"></canvas>
</template>

<script>
import '../lib/floodfill'

export default {
    name: 'DrawingBoard',
    data() {
        return {
            canvas: undefined,
            ctx: undefined,
            width: 800,
            hieight: 600
        }
    },
    methods: {
        clearCanvas() {
            this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        },
        drawCommands(commands) {
            const ctx = this.ctx

            for (const command of commands) {
                // Pencil
                if (command[0] == 0) {
                    // Params
                    const color = colors[command[1]]
                    const linewidth = command[2]
                    const x1 = command[3]
                    const y1 = command[4]
                    const x2 = command[5]
                    const y2 = command[6]
                    // Draw on canvas
                    ctx.beginPath()
                    ctx.lineWidth = linewidth
                    ctx.strokeStyle = color
                    ctx.lineJoin = ctx.lineCap = 'round';
                    ctx.quadraticCurveTo(x1, y1, x2, y2)
                    ctx.stroke()
                    ctx.closePath()
                }
                // Eraser
                else if (command[0] == 1) {
                    const color = "#FFF"
                    const linewidth = command[1]
                    const x1 = command[2]
                    const y1 = command[3]
                    const x2 = command[4]
                    const y2 = command[5]
                    // Draw on canvasDraw
                    ctx.beginPath()
                    ctx.lineWidth = linewidth
                    ctx.strokeStyle = color
                    ctx.lineJoin = ctx.lineCap = 'round';
                    ctx.quadraticCurveTo(x1, y1, x2, y2)
                    ctx.stroke()
                    ctx.closePath()
                }
                // Fill flood
                else if (command[0] == 2) {
                    const color = colors[command[1]]
                    const x = command[2]
                    const y = command[3]
                    ctx.fillStyle = color
                    ctx.fillFlood(x, y, 32)
                }
            }
        }

    },
    mounted() {
        this.canvas = this.$refs.canvas
        
        this.canvas.width = this.width
        this.canvas.height = this.height

        this.ctx = canvas.getContext("2d");
    }
}
</script>

