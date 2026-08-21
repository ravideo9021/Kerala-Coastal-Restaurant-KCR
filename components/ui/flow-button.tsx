'use client';
import { ArrowRight } from 'lucide-react';

export function FlowButton({ text = 'Modern Button', href }: { text?: string; href?: string }) {
  const Tag = href ? 'a' : 'button';
  const linkProps = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <Tag className="flow-button" {...(linkProps as any)}>
      <ArrowRight className="flow-arr flow-arr-left" size={16} />
      <span className="flow-text">{text}</span>
      <span className="flow-circle" />
      <ArrowRight className="flow-arr flow-arr-right" size={16} />
    </Tag>
  );
}
