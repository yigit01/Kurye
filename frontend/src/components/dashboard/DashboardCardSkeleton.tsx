import React from "react";
import LoadingSkeleton from "../shared/LoadingSkeleton";

const DashboardCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white overflow-hidden rounded-lg shadow p-6">
      <LoadingSkeleton className="w-24 h-4 mb-2" />
      <LoadingSkeleton className="w-32 h-8" />
    </div>
  );
};

export default DashboardCardSkeleton;
