'use client'

import { useEffect, useRef } from 'react'

class Popcorn {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  rotation: number
  rotationSpeed: number

  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth
    this.y = canvasHeight + 20
    this.size = Math.random() * 15 + 5
    this.speedX = Math.random() * 1 - 0.5
    this.speedY = Math.random() * -1 - 0.5
    this.rotation = Math.random() * Math.PI * 2
    this.rotationSpeed = (Math.random() - 0.5) * 0.1
  }

  update(canvasWidth: number, canvasHeight: number) {
    this.x += this.speedX
    this.y += this.speedY
    this.rotation += this.rotationSpeed

    if (this.y < -20) {
      this.y = canvasHeight + 20
      this.x = Math.random() * canvasWidth
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.rotation)
    
    // Draw popcorn
    ctx.beginPath()
    ctx.moveTo(0, -this.size / 2)
    ctx.quadraticCurveTo(this.size / 2, -this.size, 0, -this.size * 1.5)
    ctx.quadraticCurveTo(-this.size / 2, -this.size, 0, -this.size / 2)
    ctx.fillStyle = 'rgba(255, 250, 240, 0.7)'
    ctx.fill()

    ctx.restore()
  }
}

export function BackgroundEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const popcorns: Popcorn[] = []
    const popcornCount = 50

    for (let i = 0; i < popcornCount; i++) {
      popcorns.push(new Popcorn(canvas.width, canvas.height))
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      popcorns.forEach(popcorn => {
        popcorn.update(canvas.width, canvas.height)
        popcorn.draw(ctx)
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-[-1] opacity-30" />
}

