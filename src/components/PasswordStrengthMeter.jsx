import React from 'react';
import { calculatePasswordStrength } from '../utils/passwordStrength.js';

const PasswordStrengthMeter = ({ password }) => {
  const strength = calculatePasswordStrength(password);
  const percentage = (strength.score / 6) * 100;

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm text-bw-text-secondary">Password Strength</span>
        <span className="text-sm font-medium text-bw-text">{strength.label}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;