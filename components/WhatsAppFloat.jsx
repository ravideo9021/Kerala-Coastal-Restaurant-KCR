'use client';

import { useState, useEffect } from 'react';

export default function WhatsAppFloat() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 2000);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <a
      href="https://wa.me/917633019866?text=Hi%20KCR%2C%20I%27d%20like%20to%20know%20more!"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat on WhatsApp"
    >
      <svg viewBox="0 0 32 32" width="28" height="28" fill="#fff">
        <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.502 1.14 6.742 3.072 9.37L1.062 31.34l6.166-1.976A15.88 15.88 0 0016.004 32C24.826 32 32 24.826 32 16.004 32 7.176 24.826 0 16.004 0zm9.336 22.596c-.39 1.1-1.932 2.014-3.168 2.28-.844.18-1.946.324-5.656-1.216-4.748-1.968-7.802-6.784-8.036-7.1-.226-.316-1.882-2.508-1.882-4.784 0-2.274 1.192-3.39 1.614-3.856.39-.43.916-.574 1.186-.574.27 0 .54.002.776.014.316.014.492.014.728.558.296.684 1.004 2.46 1.09 2.64.088.18.17.424.048.674-.114.258-.214.372-.394.578-.18.206-.37.364-.55.588-.168.194-.354.402-.15.786.206.384.914 1.508 1.964 2.442 1.35 1.202 2.488 1.574 2.84 1.748.354.174.562.146.77-.088.214-.24.912-1.062 1.156-1.428.238-.364.48-.304.81-.182.334.116 2.108.994 2.468 1.174.36.182.6.27.688.418.086.146.086.858-.304 1.958z" />
      </svg>
      <span className="whatsapp-float__pulse" />
    </a>
  );
}
