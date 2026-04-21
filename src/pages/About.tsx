import { useNavigate } from "react-router-dom";
import HeadingWithAnchor from "../components/HeadingWithAnchor";

export default function About({ info }: { info?: string }) {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20 }}>
      <HeadingWithAnchor id="about" level={1}>About</HeadingWithAnchor>
      <p>This demo shows basic React Router usage and `useNavigate()`.</p>
      {info && (
        <p style={{ fontStyle: 'italic', color: '#555' }}>Prop: {info}</p>
      )}
      <button onClick={() => navigate('/')}>Go home</button>
    </div>
  );
}
