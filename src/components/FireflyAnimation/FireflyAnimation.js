"use client";
import React, { useEffect, useRef } from 'react';
import styles from './FireflyAnimation.module.css';

const FireflyAnimation = () => {
  const canvasRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const firefliesRef = useRef([]); // To store fireflies array across renders
  const mousePosRef = useRef({ x: 0, y: 0 });
  const animationFrameIdRef = useRef(null); // To store requestAnimationFrame ID

  const numFireflies = 80; // Default number of fireflies

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const canvasContainer = canvasContainerRef.current;

    // --- Firefly Class ---
    class Firefly {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 1;
        this.vy = (Math.random() - 0.5) * 1;
        this.radius = Math.random() * 2 + 1;
        this.color = this.getRandomColor();
        this.speed = Math.random() * 0.5 + 0.5;
        this.attractionRadius = 150;
        this.attractionStrength = 0.02;
        this.glowIntensity = Math.random() * 0.3 + 0.1;
      }

      getRandomColor() {
        const colors = [
          'var(--primary-color)',
          'var(--secondary-color)',
          'var(--highlight-color)',
          'var(--font-primary-color)'
        ];
        // To use CSS variables, we need to get their computed style.
        // However, for canvas, it's easier to use the actual color values.
        // Let's fetch them once.
        const computedStyle = getComputedStyle(document.documentElement);
        const actualColors = colors.map(color => {
          const variableName = color.match(/\(([^)]+)\)/)[1];
          return computedStyle.getPropertyValue(variableName).trim();
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
        }

        this.vx += (Math.random() - 0.5) * 0.05;
        this.vy += (Math.random() - 0.5) * 0.05;

        let currentSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (currentSpeed > this.speed) {
          this.vx = (this.vx / currentSpeed) * this.speed;
          this.vy = (this.vy / currentSpeed) * this.speed;
        }

        this.x += this.vx;
        this.y += this.vy;

        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
          this.vx *= -1;
          this.x = Math.max(this.radius, Math.min(this.x, canvas.width - this.radius)); // Prevent sticking
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
          this.vy *= -1;
          this.y = Math.max(this.radius, Math.min(this.y, canvas.height - this.radius)); // Prevent sticking
        }
      }

      draw() {
        ctx.shadowColor = this.color;
        ctx.shadowBlur = this.glowIntensity * 10; // Increased glow
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
      }
    }

    // --- Initialization Function ---
    const initFireflies = (count) => {
      firefliesRef.current = [];
      for (let i = 0; i < count; i++) {
        firefliesRef.current.push(new Firefly());
      }
    };

    // --- Animation Loop ---
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      firefliesRef.current.forEach(firefly => {
        firefly.update();
        firefly.draw();
      });
      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    // --- Mouse Tracking ---
    const handleMouseMove = (e) => {
      if (canvasContainer) { // Check if canvasContainer is not null
        const rect = canvasContainer.getBoundingClientRect();
        mousePosRef.current.x = e.clientX - rect.left;
        mousePosRef.current.y = e.clientY - rect.top;
      }
    };

    // --- Resize Handling ---
    const resizeCanvas = () => {
      if (canvasContainer && canvas) { // Check if canvasContainer and canvas are not null
        canvas.width = canvasContainer.clientWidth;
        canvas.height = canvasContainer.clientHeight;
        // Re-initialize fireflies only if canvas dimensions actually changed to avoid flicker
        if (firefliesRef.current.length === 0 ||
            (firefliesRef.current.length > 0 && (canvas.width !== firefliesRef.current[0].canvasWidthOnCreation || canvas.height !== firefliesRef.current[0].canvasHeightOnCreation))) {
            // Store canvas dimensions at creation time to compare later
            firefliesRef.current.forEach(f => {
                f.canvasWidthOnCreation = canvas.width;
                f.canvasHeightOnCreation = canvas.height;
            });
             initFireflies(numFireflies);
        }
      }
    };

    // Add a helper to Firefly class to store canvas dimensions
    Firefly.prototype.canvasWidthOnCreation = canvas.width;
    Firefly.prototype.canvasHeightOnCreation = canvas.height;


    // --- Initial Setup ---
    if (canvasContainer && canvas) { // Ensure elements are available
        canvasContainer.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas(); // Set initial canvas size
        animate();
    }

    // --- Cleanup ---
    return () => {
      if (canvasContainer) {
        canvasContainer.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [numFireflies]); // numFireflies as dependency

  return (
    <div ref={canvasContainerRef} id="canvas-container" className={styles.canvasContainer}>
      <canvas ref={canvasRef} id="fireflyCanvas" className={styles.fireflyCanvas}></canvas>
    </div>
  );
};

export default FireflyAnimation;
