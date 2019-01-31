import '../lib/floodfill'

let COLORS = ["#FFF", "#000", "#C1C1C1", "#4C4C4C", "#EF130B", "#740B07", "#FF7100", "#C23800", "#FFE400", "#E8A200", "#00CC00", "#005510", "#00B2FF", "#00569E", "#231FD3", "#0E0865", "#A300BA", "#550069", "#D37CAA", "#A75574", "#A0522D", "#63300D"]

export class Drawer {

    constructor(canvas) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawCommands(commands) {
        const ctx = this.ctx;

        for (const command of commands) {
            // Pencil
            if (command[0] == 0) {
                // Params
                const color = COLORS[command[1]]
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
                // ctx.moveTo(x1, y1)
                // ctx.lineTo(x2, y2)
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
                // ctx.moveTo(x1, y1)
                // ctx.lineTo(x2, y2)
                ctx.quadraticCurveTo(x1, y1, x2, y2)
                ctx.stroke()
                ctx.closePath()
            }
            // Fill flood
            else if (command[0] == 2) {
                const color = COLORS[command[1]]
                const x = command[2]
                const y = command[3]
                ctx.fillStyle = color
                ctx.fillFlood(x, y, 32)
            }
        }
    }
}


