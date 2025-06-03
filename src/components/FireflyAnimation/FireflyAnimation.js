"use client";

import React, { useEffect, useRef } from 'react';
import styles from './FireflyAnimation.module.css';

const FireflyAnimation = () => {
  const canvasRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const firefliesRef = useRef([]);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const animationFrameIdRef = useRef(null);

  const numFireflies = 75;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const canvasContainer = canvasContainerRef.current;

    class Firefly {
      constructor() {        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.radius = Math.random() * 1.5 + 0.8;
        this.color = this.getRandomColor();
        this.speed = Math.random() * 0.4 + 0.3;
        this.attractionRadius = 120;
        this.attractionStrength = 0.03;
        this.glowIntensity = Math.random() * 0.2 + 0.08;
      }

      getRandomColor() {
        const colorVars = [
          'var(--primary-color)',
          'var(--secondary-color)',
          'var(--highlight-color)',
          'var(--font-primary-color)'
        ];
        const computedStyle = getComputedStyle(document.documentElement);
        const actualColors = colorVars.map(colorVar => {
          // Safer way to extract variable name: var(--name) -> --name
          const variableName = colorVar.substring(4, colorVar.length - 1);
          try {
            const colorValue = computedStyle.getPropertyValue(variableName).trim();
            if (!colorValue) {
                // Fallback color if CSS variable is not found or empty
                console.warn(`CSS variable ${variableName} not found or empty. Defaulting to #FFFFFF.`);
                return '#FFFFFF'; // Default to white
            }
            return colorValue;
          } catch (e) {
            console.error(`Error getting CSS variable ${variableName}:`, e);
            return '#FFFFFF'; // Default to white on error
          }
        });
        return actualColors[Math.floor(Math.random() * actualColors.length)];
      }

      update() {
        let dx = mousePosRef.current.x - this.x;
        let dy = mousePosRef.current.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.attractionRadius) {
          let angle = Math.atan2(dy, dx);
          let force = this.attractionStrength * (this.attractionRadius - distance) / this.attractionRadius;
          this.vx += Math.cos(angle) * force;
          this.vy += Math.sin(angle) * force;
        }        this.vx += (Math.random() - 0.5) * 0.03;
        this.vy += (Math.random() - 0.5) * 0.03;

        let currentSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (currentSpeed > this.speed) {
          this.vx = (this.vx / currentSpeed) * this.speed;
          this.vy = (this.vy / currentSpeed) * this.speed;
        }

        this.x += this.vx;
        this.y += this.vy;

        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
          this.vx *= -1;
          this.x = Math.max(this.radius, Math.min(this.x, canvas.width - this.radius));
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
          this.vy *= -1;
          this.y = Math.max(this.radius, Math.min(this.y, canvas.height - this.radius));
        }
      }      draw() {
        ctx.shadowColor = this.color;
        ctx.shadowBlur = this.glowIntensity * 8;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        ctx.globalAlpha = 1.0;
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
      }
    }

    const initFireflies = (count) => {
      firefliesRef.current = [];
      for (let i = 0; i < count; i++) {
        firefliesRef.current.push(new Firefly());
      }
    };

    const animate = () => {
      if (!canvas || !ctx) return; // Ensure canvas and context are still valid
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      firefliesRef.current.forEach(firefly => {
        firefly.update();
        firefly.draw();
      });
      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      if (canvasContainer) {
        const rect = canvasContainer.getBoundingClientRect();
        mousePosRef.current.x = e.clientX - rect.left;
        mousePosRef.current.y = e.clientY - rect.top;
      }
    };

    const resizeCanvas = () => {
      if (canvasContainer && canvas) {
        const newWidth = canvasContainer.clientWidth;
        const newHeight = canvasContainer.clientHeight;

        // Check if canvas dimensions actually changed or if fireflies haven't been initialized
        if (canvas.width !== newWidth || canvas.height !== newHeight || firefliesRef.current.length === 0) {
          canvas.width = newWidth;
          canvas.height = newHeight;
          initFireflies(numFireflies);
        }
      }
    };

    if (canvasContainer && canvas) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('resize', resizeCanvas);
      resizeCanvas();
      // Check if animation is already running to avoid multiple requestAnimationFrames from HMR
      if (!animationFrameIdRef.current) {
        animationFrameIdRef.current = requestAnimationFrame(animate); // Start animation
      }
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null; // Reset ref after cancelling
      }
    };
  }, []);

  return (
    <div ref={canvasContainerRef} id="canvas-container" className={styles.canvasContainer}>
      <canvas ref={canvasRef} id="fireflyCanvas" className={styles.fireflyCanvas}></canvas>
    </div>
  );
};

export default FireflyAnimation;
