import React from "react";

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div className={`bg-white shadow-md rounded-lg p-6 ${className}`}>
      {children}
    </div>
  );
};

export const CardContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="space-y-4">{children}</div>;
};

