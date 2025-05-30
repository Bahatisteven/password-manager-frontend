import calculatePasswordStrength from 'shared-utils/passwordStrength.js';

const PasswordStrengthMeter = ({ password }) => {
  const strength = calculatePasswordStrength(password);
  const width = (strength.score / 6) * 100;
  
  return (
    <div className="mt-3">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
          Password Strength
        </span>
        <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
          {strength.label}
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-300 ${strength.color}`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;