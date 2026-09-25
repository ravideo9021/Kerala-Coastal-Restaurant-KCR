'use client';
import { Printer } from 'lucide-react';

export default function PrintButton() {
  return (
    <button type="button" className="btn btn-outline print-btn" onClick={() => window.print()}>
      <Printer size={17} aria-hidden="true" /> Print menu
    </button>
  );
}
