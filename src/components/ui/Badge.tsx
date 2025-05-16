import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'neutral';
  size?: 'sm' | 'md';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  className = ''
}) => {
  const variantClasses = {
    primary: 'bg-purple-100 text-purple-800 border-purple-200',
    secondary: 'bg-teal-100 text-teal-800 border-teal-200',
    success: 'bg-green-100 text-green-800 border-green-200',
    warning: 'bg-amber-100 text-amber-800 border-amber-200',
    danger: 'bg-red-100 text-red-800 border-red-200',
    neutral: 'bg-gray-100 text-gray-800 border-gray-200'
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5'
  };

  return (
    <span 
      className={`inline-flex items-center rounded-full border ${variantClasses[variant]} ${sizeClasses[size]} font-medium ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;