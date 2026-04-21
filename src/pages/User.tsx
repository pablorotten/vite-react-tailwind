import { useParams, useNavigate } from "react-router-dom";
import HeadingWithAnchor from "../components/HeadingWithAnchor";

export default function User() {
  const { email, name } = useParams<{ email?: string; name?: string }>();
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20 }}>
      <HeadingWithAnchor id="user-page" level={1}>
        User page
      </HeadingWithAnchor>
      <p>
        <strong>Email:</strong> {email ?? "(no email)"}
      </p>
      <p>
        <strong>Name:</strong> {name ?? "(no name)"}
      </p>
      <p>
        The params are passed in the URL as <code>/user/:email/:name</code>
      </p>
      <p> You can edit those params directly</p>
      <button onClick={() => navigate(-1)} style={{ marginRight: 8 }}>
        Go back
      </button>
      <button onClick={() => navigate("/")}>Home</button>
    </div>
  );
}
