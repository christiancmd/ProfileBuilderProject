import Header from "./components/ui/Organisms/Header";
import Footer from "./components/ui/Organisms/Footer";
import ProfileBuilder from "./components/ProfileBuilder";
import SectionButton from "./components/SectionButton";
import { FormProvider } from "./context/FormContext";

export default function App() {
  return (
    <>
      <FormProvider>
        <Header />
        <main className="min-h-screen h-full w-full flex flex-col items-center gap-5 py-5 sm:p-2 lg:py-6 lg:p-26  bg-linear-to-b from-teal-800 to-cyan-700">
          <SectionButton />
          <ProfileBuilder />
        </main>
        <Footer />
      </FormProvider>
    </>
  );
}
