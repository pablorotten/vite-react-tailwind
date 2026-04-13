import Header from "../components/Header";
import ApplyingStyleDemo from "../components/ApplyingStyleDemo";
import AuthInputsDemo from "../components/AuthInputsDemo";
import ComponentCompositionDemo from "../components/ComponentCompositionDemo";
import OnClickDemo from "../components/OnClickDemo";
import UseQueryDemo from "../components/UseQueryDemo";
import UseEffectDemo from "../components/UseEffectDemo";
import RedirectCountdownDemo from "../components/RedirectCountdownDemo";
import "../App.css";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <ApplyingStyleDemo />
        <OnClickDemo />
        <AuthInputsDemo />
        <UseEffectDemo />
        <UseQueryDemo />
        <RedirectCountdownDemo />
        <ComponentCompositionDemo />
      </main>
    </>
  );
}
