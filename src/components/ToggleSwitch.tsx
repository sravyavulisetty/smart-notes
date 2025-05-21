import React, { useEffect, useState } from 'react';
import "../App.css";

type ToggleSwitchProps = {
  onToggle: (value: boolean) => void;
  isBlocked?: boolean; 
};

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ onToggle, isBlocked = false }) => {
  const [isOn, setIsOn] = useState(false);

  const handleClick = () => {
    if (isBlocked) {
      alert("Notes is required");
      return;
    }
    const newState = !isOn;
    setIsOn(newState);
    onToggle(newState);
  };

  return (
    <label className="slider" style={{ cursor: isBlocked ? "not-allowed" : "pointer" }}>
      <input type="checkbox" checked={isOn} onChange={handleClick}/>
      <div className={isOn ? "sort-toggle" : "sort"}></div>
    </label>
  );
};

export default ToggleSwitch;

