import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  onClick, 
  hover = false,
  padding = 'md'
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-8'
  };

  const hoverClass = hover 
    ? 'hover:shadow-lg hover:transform hover:translate-y-[-2px] cursor-pointer' 
    : '';
  
  const clickClass = onClick ? 'cursor-pointer' : '';

  return (
    <div 
      className={`bg-white rounded-xl shadow-md transition-all duration-300 ${paddingClasses[padding]} ${hoverClass} ${clickClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;