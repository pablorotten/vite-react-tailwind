import { styled } from "styled-components";
import "../pages/Home.css";
import styles from "../pages/Home.module.css";

const CSSInlineDiv = styled.div<{ $invalid?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  border: ${({ $invalid }) =>
    $invalid ? "1px solid #f73f3f" : "transparent"};
  padding: 0.5rem;
  border-radius: 4px;
`;

const CSSInlineLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #6b7280;
  background-color: #d1fafc;
`;

export default function ApplyingStyleDemo() {
  return (
    <div className="card">
      <h2>Applying style</h2>
      <div className="css-component-controls">
        <label className="css-component">Classic CSS Style 🚫</label>
      </div>

      <div className={styles["css-module-controls"]}>
        <label>CSS Module Styled ✅✅</label>
      </div>

      <CSSInlineDiv>
        <CSSInlineLabel>Inline Style ✅</CSSInlineLabel>
      </CSSInlineDiv>
    </div>
  );
}