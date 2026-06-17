import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className, size = 'md' }: LogoProps) {
  const sizeMap = {
    sm: { text: 'text-lg', icon: 'w-6 h-6' },
    md: { text: 'text-xl', icon: 'w-8 h-8' },
    lg: { text: 'text-3xl', icon: 'w-10 h-10' },
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className={cn(sizeMap[size].icon, 'relative')}>
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <circle cx="20" cy="20" r="18" stroke="url(#gold-gradient)" strokeWidth="2" fill="none" />
          <path d="M20 8C14 8 12 14 12 18C12 22 14 28 20 28C26 28 28 22 28 18C28 14 26 8 20 8Z" stroke="url(#gold-gradient)" strokeWidth="1.5" fill="none" />
          <path d="M16 14C16 14 18 12 20 12C22 12 24 14 24 14" stroke="url(#gold-gradient)" strokeWidth="1" fill="none" />
          <line x1="20" y1="28" x2="20" y2="34" stroke="url(#gold-gradient)" strokeWidth="2" />
          <line x1="17" y1="34" x2="23" y2="34" stroke="url(#gold-gradient)" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="20" cy="18" r="3" fill="url(#gold-gradient)" opacity="0.3" />
          <defs>
            <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4A847" />
              <stop offset="50%" stopColor="#F5E6A3" />
              <stop offset="100%" stopColor="#D4A847" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className={cn(sizeMap[size].text, 'font-display font-bold gold-gradient-text tracking-wide')}>
          NARWANA
        </span>
        <span className={cn(
          size === 'sm' ? 'text-[10px]' : size === 'md' ? 'text-xs' : 'text-sm',
          'text-gold-500/70 tracking-[0.3em] uppercase font-light'
        )}>
          Hookah Mahal
        </span>
      </div>
    </div>
  );
}
