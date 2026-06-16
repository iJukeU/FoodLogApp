import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
  children?: ReactNode;
  className?: string;
};

export function Button({ variant = 'primary', fullWidth = false, className = '', children, ...props }: ButtonProps) {
  const baseClasses = 'px-6 py-4 rounded-xl font-display font-semibold transition-all flex items-center justify-center gap-2';
  
  const variants = {
    primary: 'bg-primary text-[#561f00] hover:bg-orange-500 active:bg-orange-600',
    secondary: 'bg-surface border border-outline text-white hover:bg-surface-bright',
    outline: 'border border-primary text-primary hover:bg-primary/10',
  };

  const classes = `${baseClasses} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
