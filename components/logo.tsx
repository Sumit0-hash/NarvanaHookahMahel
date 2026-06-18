import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({
  className,
  size = 'md',
}: LogoProps) {
  const sizes = {
    sm: 'w-28 h-12',
    md: 'w-40 h-16',
    lg: 'w-52 h-20',
  };

  return (
    <div className={cn('relative', sizes[size], className)}>
      <Image
        src="/xx.png"
        alt="Narwana Hookah Mahal"
        fill
        priority
        className="object-contain"
      />
    </div>
  );
}