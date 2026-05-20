import React from 'react';

export function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-full font-medium transition-all hover:scale-105 active:scale-95";
  
  const variants = {
    primary: "bg-brand text-white shadow-lg shadow-brand/20 hover:bg-brand/90",
    secondary: "bg-white text-foreground border border-gray-200 hover:border-brand hover:text-brand",
    outline: "border-2 border-brand text-brand hover:bg-brand hover:text-white"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
