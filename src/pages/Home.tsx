import Header from "../components/Header";
import ApplyingStyleDemo from "../components/ApplyingStyleDemo";
import ComponentCompositionAndReusabilityDemo from "../components/ComponentCompositionAndReusabilityDemo";
import HooksControlledComponentsAndFormsDemo from "../components/HooksControlledComponentsAndFormsDemo";
import FetchingDataDemo from "../components/UseQueryDemo";
import RouterDemo from "../components/RouterDemo";
import ContextApiAndPropDrillingDemo from "../components/ContextApiAndPropDrillingDemo";
import "../App.css";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <ApplyingStyleDemo />
        <HooksControlledComponentsAndFormsDemo />
        <FetchingDataDemo />
        <RouterDemo />
        <ContextApiAndPropDrillingDemo />
        <ComponentCompositionAndReusabilityDemo />
      </main>
    </>
  );
}
