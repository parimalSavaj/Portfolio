import React, { Suspense } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface LazyLoaderProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

const LazyLoader: React.FC<LazyLoaderProps> = ({
  children,
  fallback,
  className = "",
}) => {
  const defaultFallback = (
    <div className={`flex items-center justify-center py-20 ${className}`}>
      <LoadingSpinner size="lg" />
    </div>
  );

  return <Suspense fallback={fallback || defaultFallback}>{children}</Suspense>;
};

export default LazyLoader;
