import ProfileHeader from "./ui/Molecules/ProfileHeader";
import PersonalAside from "./PersonalAside";
import MinimalistCurriculum from "../templates/MinimalistCurriculum";
import ModernCurriculum from "../templates/ModernCurriculum";
import { useTemplateContext } from "../context/TemplateContext";

export default function ProfileBuilder() {
  const { templatePage } = useTemplateContext();

  return (
    <div className="w-full min-h-screen flex flex-col lg:grid lg:grid-cols-4 gap-4 p-2 lg:p-4 border bg-gray-200">
      <PersonalAside />
      <section className="md:col-span-3 order-0 md:order-0 h-full flex flex-col lg:">
        <ProfileHeader title="Previsualización Del Curriculum" />
        <div className="w-full bg-gray-400 border border-gray-700 py-8 flex flex-col items-center rounded-lg gap-6 grow ">
          <div className="sticky top-0 w-11/12 lg:w-4/5 min-h-250">
            {templatePage === "minimalist" ? (
              <MinimalistCurriculum />
            ) : templatePage === "modern" ? (
              <ModernCurriculum />
            ) : (
              <p>Seleccione una plantilla válida.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
