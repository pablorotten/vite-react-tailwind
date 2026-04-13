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
    <section className={className}>
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
      <div className="mb-2">{children}</div>
      {footer && <div className="mt-3 flex justify-center">{footer}</div>}
    </section>
  );
}
