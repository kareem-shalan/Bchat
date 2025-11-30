import React from 'react';

const baseFieldClasses =
  'w-full rounded-full bg-white/10 text-white placeholder:text-white/60 border border-white/20 px-4 py-2 ' +
  'focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-60 disabled:cursor-not-allowed';

const Input = ({
  TypeInput,
  type,
  placeholder,
  optionsHookForm = {},
  className = '',
  name,
  value,
  ...rest
}) => {
  const resolvedType = type || TypeInput || 'text';

  return (
    <input
      type={resolvedType}
      autoComplete="off"
      name={name}
      value={value}
      className={`${baseFieldClasses} ${className}`.trim()}
      placeholder={placeholder}
      {...optionsHookForm}
      {...rest}
    />
  );
};

export default Input;
