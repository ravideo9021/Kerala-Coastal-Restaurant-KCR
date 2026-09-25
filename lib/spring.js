/**
 * A tiny spring that follows a moving target — the same physics as a
 * stiffness / damping / mass spring in animation libraries, without the
 * library. Used by the scroll-linked sections (gallery, culinary journey).
 */
export class Spring {
  constructor({ stiffness = 100, damping = 10, mass = 1, value = 0, restDelta = 0.0005, restSpeed = 0.002 } = {}) {
    this.k = stiffness;
    this.c = damping;
    this.m = mass;
    this.value = value;
    this.target = value;
    this.velocity = 0;
    this.restDelta = restDelta;
    this.restSpeed = restSpeed;
  }

  /** Jump straight to a value (no animation). */
  set(value) {
    this.value = value;
    this.target = value;
    this.velocity = 0;
  }

  get resting() {
    return Math.abs(this.velocity) < this.restSpeed && Math.abs(this.value - this.target) < this.restDelta;
  }

  /** Advance by `dt` seconds. Returns true while still moving. */
  step(dt) {
    if (this.resting) {
      this.value = this.target;
      this.velocity = 0;
      return false;
    }
    // Small fixed sub-steps keep the integration stable on slow frames.
    const steps = Math.max(1, Math.ceil(dt / (1 / 240)));
    const h = dt / steps;
    for (let i = 0; i < steps; i++) {
      const force = -this.k * (this.value - this.target) - this.c * this.velocity;
      this.velocity += (force / this.m) * h;
      this.value += this.velocity * h;
    }
    return true;
  }
}

export const clamp01 = (v) => Math.min(Math.max(v, 0), 1);
export const lerp = (a, b, t) => a + (b - a) * t;

/** Maps `v` from [inMin, inMax] to [outMin, outMax], clamped. */
export const mapRange = (v, inMin, inMax, outMin, outMax) => lerp(outMin, outMax, clamp01((v - inMin) / (inMax - inMin)));

/**
 * Runs `tick(dt)` on animation frames until it returns false, then stops.
 * `wake()` starts it again (e.g. on scroll). Returns { wake, stop }.
 */
export function createLoop(tick) {
  let raf = 0;
  let last = 0;
  const frame = (now) => {
    const dt = Math.min((now - last) / 1000, 1 / 15);
    last = now;
    raf = tick(dt) ? requestAnimationFrame(frame) : 0;
  };
  return {
    wake() {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    },
    stop() {
      cancelAnimationFrame(raf);
      raf = 0;
    },
  };
}
