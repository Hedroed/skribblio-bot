const COLORS = [
    [0, 0, 0],
    [3, 0, 2],
    [2, 1, 0],
    [1, 2, 2],
    [0, 3, 0],
    [3, 3, 2],
    [2, 0, 1],
    [1, 1, 3],
    [0, 2, 1],
    [3, 2, 3],
    [2, 3, 1],
    [1, 0, 0],
    [0, 1, 2],
    [3, 1, 0],
    [2, 2, 2],
    [1, 3, 0],
    [0, 0, 3],
    [3, 0, 1]
]
const getColor = c => {
    return "#"+COLORS[c].map(i => (i * 40 + 110).toString(16)).join("")
}


export const makeIcon = (a, b, c) => {
    const {speedA, speedB, color} = safeParams(a, b, c)    
    
    const canvas = document.createElement("canvas")
    canvas.width  = 100
    canvas.height = 100
    const ctx = canvas.getContext('2d');

    // ctx.strokeStyle = "#efefef"
    // ctx.fillStyle = color
    ctx.fillStyle = "#efefef"
    ctx.strokeStyle = color

    ctx.fillRect(0, 0, 100, 100);
    
    ctx.beginPath()
    ctx.lineWidth = 2
    
    const step = Math.floor(Math.min(speedA, speedB) / 99 * 6) + 1
    for(let i = 0; i <= 720; i += step) {
        const c1 = Math.floor(i * (speedA / 10 + 1)) % 360
        const c2 = Math.floor(i * (speedB / 10 + 1)) % 360
        
        const r1 = c1 * Math.PI / 180
        const cos1 = (Math.cos(r1) + 1) / 2
        // const sin1 = (Math.sin(r1) + 1) / 2
        
        const r2 = c2 * Math.PI / 180
        // const cos2 = (Math.cos(r2) + 1) / 2
        const sin2 = (Math.sin(r2) + 1) / 2
        
        if(i == 0) {
            ctx.moveTo(5 + 90 * cos1, 5 + 90 * sin2)
        } else {
            ctx.lineTo(5 + 90 * cos1, 5 + 90 * sin2)
        }
    }
    
    // ctx.closePath()
    ctx.stroke()

    return canvas.toDataURL()
}

export const makeCanvas = (canvas, a, b, c) => {
    const {speedA, speedB, color} = safeParams(a, b, c)
    
    canvas.width  = 100
    canvas.height = 100
    const ctx = canvas.getContext('2d');

    // ctx.strokeStyle = "#efefef"
    // ctx.fillStyle = color
    ctx.fillStyle = "#efefef"
    ctx.strokeStyle = color

    ctx.fillRect(0, 0, 100, 100);
    
    ctx.beginPath()
    ctx.lineWidth = 2
    
    // const step = Math.floor(Math.min(speedA, speedB) / 99 * 6) + 1

    const ret = {
        killSwitch: false,
        ctx,
        stop() {
            this.killSwitch = true
        },
        draw(i, step) {
            if(this.killSwitch) return

            const c1 = Math.floor(i * (speedA / 10 + 1)) % 360
            const c2 = Math.floor(i * (speedB / 10 + 1)) % 360
            
            const r1 = c1 * Math.PI / 180
            const cos1 = (Math.cos(r1) + 1) / 2
            // const sin1 = (Math.sin(r1) + 1) / 2
            
            const r2 = c2 * Math.PI / 180
            // const cos2 = (Math.cos(r2) + 1) / 2
            const sin2 = (Math.sin(r2) + 1) / 2
            
            if(i == 0) {
                this.ctx.moveTo(5 + 90 * cos1, 5 + 90 * sin2)
            } else {
                this.ctx.lineTo(5 + 90 * cos1, 5 + 90 * sin2)
            }
            this.ctx.stroke()

            if(i > 360) return
            if(isNaN(i)) return

            setTimeout(() => this.draw(i + step, step), 5)
        }
    }
    ret.draw(0, 2)

    return ret
}


const safeParams = (a, b, c) => {
    // a 31 val
    // b 24 val
    // c 18 val
    const safeA = Math.min(30, Math.max(0, a)) / 30 * 100
    const safeB = Math.min(23, Math.max(0, b)) / 23 * 100
    const safeC = Math.min(17, Math.max(0, c))

    const color = getColor(safeC)
    return {speedA: safeA, speedB: safeB, color}
}