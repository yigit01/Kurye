//frontend\src\components\dashboard\ChartSkeleton.tsx
import React from "react";
import LoadingSkeleton from "../shared/LoadingSkeleton";

const ChartSkeleton: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <LoadingSkeleton className="w-48 h-6 mb-6" />
      <div className="space-y-4">
        <LoadingSkeleton className="w-full h-[300px]" />
        <div className="flex justify-center space-x-4">
          <LoadingSkeleton className="w-24 h-4" />
          <LoadingSkeleton className="w-24 h-4" />
        </div>
      </div>
    </div>
  );
};

export default ChartSkeleton;
