import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

type SelectContextValue = {
  value: string;
  onChange: (value: string) => void;
  close: () => void;
};

const SelectContext = createContext<SelectContextValue | null>(null);

type SelectProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  children: React.ReactNode;
};

type OptionProps = {
  value: string;
  disabled?: boolean;
  children: React.ReactNode;
};

function Select({ value, onChange, placeholder = "Select…", children }: SelectProps) {
  const [open, setOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  const ref = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Close on outside click — exclude both the trigger and the portaled list
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        ref.current && !ref.current.contains(target) &&
        listRef.current && !listRef.current.contains(target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleToggle() {
    if (!open && ref.current) {
      // Calculate position of the trigger button so the portal can be placed exactly below it
      const rect = ref.current.getBoundingClientRect();
      setDropdownStyle({
        position: "fixed",
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
        zIndex: 9999,
      });
    }
    setOpen((o) => !o);
  }

  // Filters to have only OptionProps and then finds the selected option which it's the one whose value is equals to SelectProps value 
  const selectedLabel = React.Children.toArray(children)
    .filter((child): child is React.ReactElement<OptionProps> => React.isValidElement(child))
    .find((child) => child.props.value === value)?.props.children;

  return (
    <SelectContext.Provider value={{ value, onChange, close: () => setOpen(false) }}>
      <div ref={ref} className="relative inline-block w-48">
        <button
          type="button"
          onClick={handleToggle}
          className="w-full flex items-center justify-between px-3 py-2 bg-white border border-gray-300 rounded shadow-sm hover:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          <span className={selectedLabel ? "text-gray-800" : "text-gray-400"}>
            {selectedLabel ?? placeholder}
          </span>
          <span className="ml-2 text-gray-400">{open ? "▲" : "▼"}</span>
        </button>

        {/* Portal: renders the dropdown list directly on <body>, escaping any parent stacking context */}
        {open && createPortal(
          <ul ref={listRef} style={dropdownStyle} className="bg-white border border-gray-200 rounded shadow-lg py-1">
            {children}
          </ul>,
          document.body
        )}
      </div>
    </SelectContext.Provider>
  );
}

function Option({ value, disabled, children }: OptionProps) {
  const context = useContext(SelectContext);

  if (!context) {
    throw new Error("Select.Option must be used inside <Select>");
  }

  const isSelected = context.value === value;

  return (
    <li
      onClick={() => { if (!disabled) { context.onChange(value); context.close(); } }}
      className={`px-3 py-2 ${
        disabled
          ? "cursor-not-allowed opacity-40"
          : "cursor-pointer hover:bg-indigo-50"
      } ${
        isSelected ? "bg-indigo-100 font-semibold text-indigo-700" : "text-gray-700"
      }`}
    >
      {children}
    </li>
  );
}

Select.Option = Option;

export default Select;
