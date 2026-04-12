import { ReactNode } from "react";

type FlexibleCardProps = {
  title?: string;
  footer?: ReactNode;
  className?: string;
  children: ReactNode;
};

export default function FlexibleCard({
  title,
  footer,
  className = "",
  children,
}: FlexibleCardProps) {
  return (
    <section className={`p-4 bg-white rounded shadow-sm ${className}`}>
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
      <div className="mb-2">{children}</div>
      {footer && <div className="mt-3 text-right">{footer}</div>}
    </section>
  );
}
