import React, { createContext, useContext } from "react";

type ButtonGroupContextValue = {
  value: string;
  onChange: (value: string) => void;
};

const ButtonGroupContext = createContext<ButtonGroupContextValue | null>(null);

type ButtonGroupProps = {
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
};

type OptionProps = {
  value: string;
  children: React.ReactNode;
};

function ButtonGroup({ value, onChange, children }: ButtonGroupProps) {
  return (
    <ButtonGroupContext.Provider value={{ value, onChange }}>
      <div className="flex flex-wrap gap-2">{children}</div>
    </ButtonGroupContext.Provider>
  );
}

function Option({ value, children }: OptionProps) {
  const context = useContext(ButtonGroupContext);

  if (!context) {
    throw new Error("ButtonGroup.Option must be used inside <ButtonGroup>");
  }

  const isSelected = context.value === value;

  return (
    <button
      type="button"
      onClick={() => context.onChange(value)}
      className={`px-3 py-1 rounded border transition-colors ${
        isSelected
          ? "bg-indigo-600 text-white border-indigo-600"
          : "bg-white text-gray-700 border-gray-300 hover:border-indigo-400"
      }`}
    >
      {children}
    </button>
  );
}

ButtonGroup.Option = Option;

export default ButtonGroup;
