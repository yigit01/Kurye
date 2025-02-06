//frontend\src\components\dashboard\AnimatedDashboardCard.tsx
import React from "react";
import { motion } from "framer-motion";

interface AnimatedDashboardCardProps {
  title: string;
  value: string | number;
  color: string;
  index: number;
}

const AnimatedDashboardCard: React.FC<AnimatedDashboardCardProps> = ({
  title,
  value,
  color,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      className={`${color} overflow-hidden rounded-lg shadow cursor-pointer transform transition-all duration-200 hover:shadow-lg`}
    >
      <div className="px-4 py-5 sm:p-6">
        <motion.dt
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
          className="text-sm font-medium text-white truncate"
        >
          {title}
        </motion.dt>
        <motion.dd
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
          className="mt-1 text-3xl font-semibold text-white"
        >
          {value}
        </motion.dd>
      </div>
    </motion.div>
  );
};

export default AnimatedDashboardCard;
