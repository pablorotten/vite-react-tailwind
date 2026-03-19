import { useNavigate } from "react-router-dom";

export default function About({ info }: { info?: string }) {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20 }}>
      <h1>About</h1>
      <p>This demo shows basic React Router usage and `useNavigate()`.</p>
      {info && (
        <p style={{ fontStyle: 'italic', color: '#555' }}>Prop: {info}</p>
      )}
      <button onClick={() => navigate('/')}>Go home</button>
    </div>
  );
}
