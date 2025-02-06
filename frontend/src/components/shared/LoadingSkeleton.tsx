//frontend\src\components\shared\LoadingSkeleton.tsx
import React from "react";

interface LoadingSkeletonProps {
  className?: string;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  className = "",
}) => {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${className}`}
      style={{ minHeight: "20px" }}
    />
  );
};

export default LoadingSkeleton;
