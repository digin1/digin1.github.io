// src/components/common/Loader.jsx
import React from 'react';

/**
 * Loader component for showing loading states
 * 
 * @param {Object} props - Component props
 * @param {string} [props.size='md'] - Loader size (sm, md, lg)
 * @param {string} [props.color='primary'] - Loader color (primary, gray, white)
 * @param {string} [props.className] - Additional CSS classes
 */
const Loader = ({
  size = 'md',
  color = 'primary',
  className = '',
  ...props
}) => {
  // Size classes
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-3'
  };
  
  // Color classes
  const colorClasses = {
    primary: 'border-primary/30 border-t-primary',
    gray: 'border-gray-300 border-t-gray-700',
    white: 'border-white/30 border-t-white'
  };
  
  return (
    <div className={`flex justify-center items-center ${className}`} {...props}>
      <div 
        className={`animate-spin rounded-full ${sizeClasses[size]} ${colorClasses[color]}`}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;