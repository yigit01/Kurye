//frontend\src\components\dashboard\CustomTooltip.tsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatCurrency } from "../../utils/date";

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (!active || !payload) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white p-3 rounded-lg shadow-lg border border-gray-200"
      >
        <p className="text-gray-600 font-medium mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            <span className="font-medium">{entry.name}: </span>
            {entry.name === "Gelir" ? formatCurrency(entry.value) : entry.value}
          </p>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default CustomTooltip;
