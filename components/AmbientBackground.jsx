'use client';
import { useEffect, useRef } from 'react';

/**
 * The slow teal swirl behind the page (WebGL 2 fragment shader) — the same
 * look as before, at a fraction of the cost.
 *
 * The old version drew every physical pixel (about 3 million per frame on a
 * phone) 60 times a second from the first moment the page loaded. This one
 * renders at half the CSS resolution (it is a soft gradient, so the upscale is
 * invisible), is capped at 30 fps, starts only after the page has loaded,
 * pauses in background tabs, and draws a single still frame for
 * reduced-motion, data-saver and low-memory devices. Without WebGL the CSS
 * gradient on `.ambient` shows instead.
 */

const FRAGMENT_SHADER = `#version 300 es
precision highp float;
uniform float u_time;
uniform float u_scale;
uniform vec2 u_resolution;
uniform vec3 u_color1;
uniform vec3 u_color2;
uniform vec3 u_color3;
out vec4 fragColor;
#define PI 3.14159265358979323846

vec2 rotate(vec2 uv, float th) { return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv; }
float random(vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123); }
float noise(vec2 st) {
  vec2 i = floor(st); vec2 f = fract(st);
  float a = random(i), b = random(i + vec2(1.0, 0.0)), c = random(i + vec2(0.0, 1.0)), d = random(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
void main() {
  // Same parameters as the original preset: rotation -35deg, scale .35,
  // distortion 3, swirl .45 x 8 iterations, "edge" shape 55%, proportion 30%,
  // softness 90%.
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float t = 0.5 * u_time;
  float noiseScale = 0.0005 + 0.006 * 0.35;
  uv -= 0.5;
  uv *= noiseScale * u_resolution;
  uv = rotate(uv, -35.0 * PI / 180.0 * 0.5 * PI);
  uv /= u_scale;
  uv += 0.5;
  float n1 = noise(uv + t);
  float n2 = noise(uv * 2.0 - t);
  float angle = n1 * 6.28318530718;
  uv += 4.0 * 0.06 * n2 * vec2(cos(angle), sin(angle));
  for (float i = 1.0; i <= 8.0; i++) {
    uv.x += 0.45 / i * cos(t + i * 1.5 * uv.y);
    uv.y += 0.45 / i * cos(t + i * uv.x);
  }
  // Vertical falloff as it looked on the 2x (retina) screen it was designed on.
  float sh = 1.0 - uv.y;
  sh -= 0.5;
  sh /= noiseScale * (u_resolution.y / u_scale) * 2.0;
  sh += 0.5;
  float shaping = 0.2 * (1.0 - 0.55);
  float m = smoothstep(0.45 - shaping, 0.55 + shaping, sh + 0.3 * (0.3 - 0.5));
  float r1 = smoothstep(0.035, 0.67175, m);
  float r2 = smoothstep(0.335, 0.9785, m);
  fragColor = vec4(mix(mix(u_color1, u_color2, r1), u_color3, r2), 1.0);
}`;

const VERTEX_SHADER = `#version 300 es
in vec4 a_position;
void main() { gl_Position = a_position; }`;

const COLORS = [
  [0x04 / 255, 0x0a / 255, 0x07 / 255],
  [0x0d / 255, 0x7c / 255, 0x66 / 255],
  [0x0a / 255, 0x15 / 255, 0x10 / 255],
];

const RENDER_SCALE = 0.5;
const FRAME_MS = 1000 / 30;
// Original preset: speed 12 -> 0.6 time units per second, offset -200 -> -2.
const SPEED = 0.6;
const OFFSET = -2;

export default function AmbientBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let cleanup = () => {};

    const start = () => {
      const gl = canvas.getContext('webgl2', { alpha: false, antialias: false, powerPreference: 'low-power' });
      if (!gl) return;

      const compile = (type, source) => {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        return shader;
      };
      const vs = compile(gl.VERTEX_SHADER, VERTEX_SHADER);
      const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
      const program = gl.createProgram();
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
      gl.useProgram(program);

      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
      const position = gl.getAttribLocation(program, 'a_position');
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

      const uTime = gl.getUniformLocation(program, 'u_time');
      const uResolution = gl.getUniformLocation(program, 'u_resolution');
      gl.uniform1f(gl.getUniformLocation(program, 'u_scale'), RENDER_SCALE);
      ['u_color1', 'u_color2', 'u_color3'].forEach((name, i) => gl.uniform3fv(gl.getUniformLocation(program, name), COLORS[i]));

      const resize = () => {
        canvas.width = Math.max(1, Math.round(window.innerWidth * RENDER_SCALE));
        canvas.height = Math.max(1, Math.round(window.innerHeight * RENDER_SCALE));
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(uResolution, canvas.width, canvas.height);
      };
      resize();

      const t0 = performance.now();
      const render = (now) => {
        gl.uniform1f(uTime, ((now - t0) / 1000) * SPEED + OFFSET);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      };

      const still =
        window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        navigator.connection?.saveData ||
        (navigator.deviceMemory && navigator.deviceMemory < 4);

      let raf = 0;
      let last = 0;
      const loop = (now) => {
        raf = requestAnimationFrame(loop);
        if (now - last < FRAME_MS) return;
        last = now;
        render(now);
      };
      const play = () => {
        cancelAnimationFrame(raf);
        if (!still && !document.hidden) raf = requestAnimationFrame(loop);
      };

      render(performance.now());
      canvas.classList.add('is-ready');
      play();

      const onResize = () => {
        resize();
        render(performance.now());
      };
      window.addEventListener('resize', onResize);
      document.addEventListener('visibilitychange', play);

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('resize', onResize);
        document.removeEventListener('visibilitychange', play);
        gl.deleteProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        gl.deleteBuffer(buffer);
      };
    };

    // Wait for the page to finish loading so this never competes with content.
    let idleId = 0;
    const schedule = () => {
      const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 600));
      idleId = idle(start, { timeout: 2500 });
    };
    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule, { once: true });

    return () => {
      window.removeEventListener('load', schedule);
      (window.cancelIdleCallback || clearTimeout)(idleId);
      cleanup();
    };
  }, []);

  return (
    <div className="ambient" aria-hidden="true">
      <canvas ref={canvasRef} />
      <div className="ambient-grain" />
    </div>
  );
}
