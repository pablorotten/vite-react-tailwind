import React from "react";

interface HeadingWithAnchorProps {
  id: string;
  level?: 1 | 2;
  children: React.ReactNode;
}

export default function HeadingWithAnchor({ id, level = 1, children }: HeadingWithAnchorProps) {
  const Tag = `h${level}` as const;
  const anchorLink = `#${id}`;

  return (
    <Tag id={id} className="group scroll-mt-20 flex items-center justify-center gap-2 text-center">
      {children}
      <a
        href={anchorLink}
        aria-label="Copy link to section"
        className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 text-gray-400 hover:text-blue-600"
        tabIndex={-1}
        onClick={e => {
          e.preventDefault();
          window.navigator.clipboard?.writeText(window.location.origin + window.location.pathname + anchorLink);
        }}
      >
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.5 12.5L12.5 7.5M9.16667 6.66667H7.5C6.11929 6.66667 5 7.78595 5 9.16667V12.5C5 13.8807 6.11929 15 7.5 15H10.8333C12.214 15 13.3333 13.8807 13.3333 12.5V10.8333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12.5 5H15.8333C17.214 5 18.3333 6.11929 18.3333 7.5V10.8333C18.3333 12.214 17.214 13.3333 15.8333 13.3333H14.1667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
    </Tag>
  );
}
