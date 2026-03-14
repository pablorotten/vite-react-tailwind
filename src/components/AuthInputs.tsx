import { useState, useRef } from "react";
import { styled } from "styled-components";
import "./AuthInputs.css";
import styles from "./AuthInputs.module.css";

interface InputProps {
  $invalid?: boolean;
}

const AuthInputsContainer = styled.div`
  width: 100%;
  max-width: 28rem;
  padding: 2rem;
  margin: 0 auto;
  border-radius: 0.5rem;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.06);
  background: linear-gradient(180deg, #474232 0%, #28271c 100%);
  color: white;
`;

const ControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const MyLabel = styled.label<InputProps>`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ $invalid }) => ($invalid ? "#f87171" : "#6b7280")};
`;

const Input = styled.input<InputProps>`
  width: 100%;
  max-width: 28rem;
  padding: 2rem;
  margin: 0 auto;
  border-radius: 0.5rem;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.06);
  color: white;
  line-height: 1.5;
  background-color: ${({ $invalid }) => ($invalid ? "#fed2d2" : "#d1d5db")};
  color: ${({ $invalid }) => ($invalid ? "#ef4444" : "#374151")};
  border: 1px solid ${({ $invalid }) => ($invalid ? "#f73f3f" : "transparent")};
  border-radius: 0.25rem;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.06);
`;

const CSSInlineDiv = styled.div<{ $invalid?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  border: ${({ $invalid }) => ($invalid ? "1px solid #f73f3f" : "transparent")};
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

export default function AuthInputs() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);

  function focusEmail() {
    emailInputRef.current?.focus();
  }

  function handleInputChange(identifier: "email" | "password", value: string) {
    if (identifier === "email") {
      setEnteredEmail(value);
    } else {
      setEnteredPassword(value);
    }
  }

  function handleLogin() {
    setSubmitted(true);
  }

  const emailNotValid: boolean = submitted && !enteredEmail.includes("@");
  const passwordNotValid = submitted && enteredPassword.trim().length < 6;

  return (
    <AuthInputsContainer>
      <ControlContainer className={styles.controls}>
        <p>
          <MyLabel
            $invalid={emailNotValid}
            className={emailNotValid ? styles.invalid : undefined}
          >
            Email
          </MyLabel>
          <Input
            ref={emailInputRef}
            $invalid={emailNotValid}
            type="email"
            className={emailNotValid ? styles.invalid : undefined}
            onChange={(event) => handleInputChange("email", event.target.value)}
          />
        </p>
        <p>
          <MyLabel
            $invalid={passwordNotValid}
            className={passwordNotValid ? styles.invalid : undefined}
          >
            Password
          </MyLabel>
          <Input
            $invalid={passwordNotValid}
            type="password"
            className={passwordNotValid ? styles.invalid : undefined}
            onChange={(event) =>
              handleInputChange("password", event.target.value)
            }
          />
        </p>
      </ControlContainer>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles["text-button"]}
          onClick={focusEmail}
        >
          Focus Email
        </button>
        <button type="button" className={styles["text-button"]}>
          Create a new account
        </button>
        <button className={styles.button} onClick={handleLogin}>
          Sign In
        </button>
      </div>

      <div
        className={`css-component-controls ${emailNotValid ? "invalid-mail" : ""}`}
      >
        <label className="css-component">Classic CSS Style 👎</label>
      </div>
      
      <div
        className={`${styles["css-module-controls"]} ${
          emailNotValid ? styles["invalid-mail"] : ""
        }`}
      >
        <label className={emailNotValid ? styles["invalid-mail"] : undefined}>
          CSS Module Styled 👍👍
        </label>
      </div>
      
      <CSSInlineDiv $invalid={emailNotValid}>
        <CSSInlineLabel $invalid={emailNotValid}>
          Inline Style 👍
        </CSSInlineLabel>
      </CSSInlineDiv>
    </AuthInputsContainer>
  );
}
