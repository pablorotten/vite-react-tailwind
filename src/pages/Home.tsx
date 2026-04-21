import Header from "../components/Header";
import ApplyingStyleDemo from "../components/ApplyingStyleDemo";
import AuthInputsDemo from "../components/AuthInputsDemo";
import ComponentCompositionAndReusabilityDemo from "../components/ComponentCompositionAndReusabilityDemo";
import OnClickDemo from "../components/OnClickDemo";
import UseQueryDemo from "../components/UseQueryDemo";
import UseEffectDemo from "../components/UseEffectDemo";
import RedirectCountdownDemo from "../components/RedirectCountdownDemo";
import ContextApiAndPropDrillingDemo from "../components/ContextApiAndPropDrillingDemo";
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
        <ContextApiAndPropDrillingDemo />
        <ComponentCompositionAndReusabilityDemo />
      </main>
    </>
  );
}
