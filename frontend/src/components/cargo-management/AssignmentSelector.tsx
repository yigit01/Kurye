// src/components/AssignmentSelector.tsx
import React from "react";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export interface AssignmentOption {
  id: string;
  name: string;
  type: "Kuryeler" | "Depolar" | "Tırlar";
}

interface AssignmentSelectorProps {
  value: AssignmentOption | null;
  onChange: (newValue: AssignmentOption | null) => void;
  options: AssignmentOption[];
  label?: string;
}

const AssignmentSelector: React.FC<AssignmentSelectorProps> = ({
  value,
  onChange,
  options,
  label = "Atama Seçiniz",
}) => {
  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => onChange(newValue)}
      options={options}
      groupBy={(option) => option.type}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => <TextField {...params} label={label} variant="standard" />}
      size="small"
    />
  );
};

export default AssignmentSelector;
