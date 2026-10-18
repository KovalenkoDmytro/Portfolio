'use client';

import { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import { alpha, useTheme } from '@mui/material/styles';
import { useMotionPaused } from './motion';

type Point3D = { x: number; y: number; z: number };
const particles = Array.from({ length: 72 }, (_, index) => ({
  x: Math.sin(index * 127.1) * 1050,
  y: Math.cos(index * 311.7) * 720,
  z: (index * 113) % 1200,
}));
const cubeVertices: Point3D[] = [
  { x: -1, y: -1, z: -1 }, { x: 1, y: -1, z: -1 },
  { x: 1, y: 1, z: -1 }, { x: -1, y: 1, z: -1 },
  { x: -1, y: -1, z: 1 }, { x: 1, y: -1, z: 1 },
  { x: 1, y: 1, z: 1 }, { x: -1, y: 1, z: 1 },
];
const cubeEdges = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]];

export const AmbientBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const elapsed = useRef(0);
  const paused = useMotionPaused();
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;
    let width = 0;
    let height = 0;
    let frame = 0;
    let lastFrame = 0;
    let disposed = false;
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    const draw = () => {
      context.clearRect(0, 0, width, height);
      const time = elapsed.current;
      const yaw = Math.sin(time * .08) * .1 + pointer.x * .09;
      const pitch = Math.cos(time * .06) * .035 + pointer.y * .035;
      const project = ({ x, y, z }: Point3D) => {
        const rx = x * Math.cos(yaw) - z * Math.sin(yaw);
        const rz = x * Math.sin(yaw) + z * Math.cos(yaw);
        const ry = y * Math.cos(pitch) - rz * Math.sin(pitch);
        const depth = y * Math.sin(pitch) + rz * Math.cos(pitch) + 1100;
        const scale = Math.min(width, 1500) / Math.max(depth, 200);
        return { x: width * .5 + rx * scale, y: height * .48 + ry * scale, scale };
      };
      const stroke = (from: Point3D, to: Point3D) => {
        const a = project(from);
        const b = project(to);
        context.moveTo(a.x, a.y);
        context.lineTo(b.x, b.y);
      };

      // A gently undulating plane is projected from world space into the viewport.
      context.strokeStyle = alpha(primary, .12);
      context.lineWidth = .65;
      context.beginPath();
      const wave = (x: number, z: number) => ({ x, z, y: 350 + Math.sin(x * .004 + z * .003 + time * .3) * 35 });
      for (let x = -1800; x <= 1800; x += 150) {
        for (let z = 0; z < 1800; z += 150) {
          stroke(wave(x, z), wave(x, z + 150));
          if (x < 1800) stroke(wave(x, z), wave(x + 150, z));
        }
      }
      context.stroke();

      const visibleParticles = width < 600 ? particles.slice(0, 32) : particles;
      const projected = visibleParticles.map((particle, index) => project({
        x: particle.x + Math.sin(time * .12 + index) * 30,
        y: particle.y + Math.cos(time * .1 + index) * 22,
        z: particle.z,
      }));
      projected.forEach((point, index) => {
        context.fillStyle = alpha(index % 3 === 0 ? secondary : primary, .22);
        context.beginPath();
        context.arc(point.x, point.y, Math.max(.6, point.scale * 1.4), 0, Math.PI * 2);
        context.fill();
        const next = projected[index + 1];
        if (next && Math.hypot(point.x - next.x, point.y - next.y) < 160) {
          context.strokeStyle = alpha(secondary, .065);
          context.beginPath();
          context.moveTo(point.x, point.y);
          context.lineTo(next.x, next.y);
          context.stroke();
        }
      });

      [{ x: -.43, y: -.22, size: 78 }, { x: .42, y: .15, size: 110 }, { x: .28, y: -.4, size: 44 }].forEach((cube, index) => {
        const angle = time * .09 + index * 1.8;
        const points = cubeVertices.map(vertex => {
          const x = vertex.x * Math.cos(angle) - vertex.z * Math.sin(angle);
          const z = vertex.x * Math.sin(angle) + vertex.z * Math.cos(angle);
          return {
            x: cube.x * 1600 + x * cube.size,
            y: cube.y * height * 1.6 + (vertex.y * Math.cos(angle * .7) - z * Math.sin(angle * .7)) * cube.size,
            z: 320 + (vertex.y * Math.sin(angle * .7) + z * Math.cos(angle * .7)) * cube.size,
          };
        });
        context.strokeStyle = alpha(index === 1 ? secondary : primary, .2);
        context.lineWidth = .8;
        context.beginPath();
        cubeEdges.forEach(([a, b]) => stroke(points[a], points[b]));
        context.stroke();
      });
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, width < 600 ? 1.25 : 1.5);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw();
    };
    const tick = (now: number) => {
      if (disposed || paused || document.hidden) return;
      const interval = width < 600 ? 50 : 1000 / 30;
      if (now - lastFrame >= interval) {
        elapsed.current += lastFrame ? Math.min((now - lastFrame) / 1000, .08) : 0;
        lastFrame = now;
        pointer.x += (pointer.targetX - pointer.x) * .045;
        pointer.y += (pointer.targetY - pointer.y) * .045;
        draw();
      }
      frame = window.requestAnimationFrame(tick);
    };
    const visibility = () => {
      window.cancelAnimationFrame(frame);
      lastFrame = 0;
      if (!paused && !document.hidden) frame = window.requestAnimationFrame(tick);
    };
    const move = (event: PointerEvent) => {
      pointer.targetX = event.clientX / width * 2 - 1;
      pointer.targetY = event.clientY / height * 2 - 1;
    };
    const resetPointer = () => { pointer.targetX = 0; pointer.targetY = 0; };
    resize();
    visibility();
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', visibility);
    if (!paused && finePointer) {
      window.addEventListener('pointermove', move, { passive: true });
      window.addEventListener('blur', resetPointer);
    }
    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', visibility);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('blur', resetPointer);
    };
  }, [paused, primary, secondary]);

  return <Box aria-hidden="true" sx={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden', bgcolor: 'background.default' }}>
    <Box component="canvas" ref={canvasRef} sx={{ display: 'block', width: '100%', height: '100%' }} />
    <Box sx={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 38%, ${alpha(theme.palette.background.default, .88)} 0%, ${alpha(theme.palette.background.default, .35)} 60%, transparent 100%)` }} />
  </Box>;
};
