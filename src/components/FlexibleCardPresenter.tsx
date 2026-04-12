import { ReactNode, useState } from "react";

type FlexibleCardPresenterProps = {
  render?: (props: {
    title: string;
    content: ReactNode;
    footer?: ReactNode;
    showing: boolean;
    toggle: () => void;
  }) => ReactNode;
};

export default function FlexibleCardPresenter({ render }: FlexibleCardPresenterProps) {
  const [showing, setShowing] = useState(true);

  const toggle = () => setShowing((s) => !s);

  const title = "Presenter-powered card";
  const content = (
    <div>
      <p>This content comes from the presenter.</p>
      <p className="text-sm text-gray-600">Currently: {showing ? "expanded" : "collapsed"}</p>
    </div>
  );

  const footer = (
    <button onClick={toggle} className="px-3 py-1 bg-indigo-600 text-white rounded">
      Toggle
    </button>
  );

  if (render) return <>{render({ title, content, footer, showing, toggle })}</>;
  return null;
}
