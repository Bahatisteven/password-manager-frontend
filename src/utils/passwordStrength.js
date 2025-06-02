export const calculatePasswordStrength = (password) => {
  if (!password) return { score: 0, label: 'No password', color: 'bg-gray-300' };
  
  let score = 0;
  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    numbers: /\d/.test(password),
    symbols: /[^a-zA-Z0-9]/.test(password),
    longLength: password.length >= 12
  };
  
  score = Object.values(checks).filter(Boolean).length;
  
  if (score <= 2) {
    return { score, label: 'Weak', color: 'bg-gradient-to-r from-red-500 to-red-600' };
  } else if (score <= 4) {
    return { score, label: 'Fair', color: 'bg-gradient-to-r from-yellow-500 to-orange-500' };
  } else if (score <= 5) {
    return { score, label: 'Good', color: 'bg-gradient-to-r from-blue-500 to-blue-600' };
  } else {
    return { score, label: 'Strong', color: 'bg-gradient-to-r from-green-500 to-green-600' };
  }
};