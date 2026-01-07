import ProfileHeader from "./ui/Molecules/ProfileHeader";
import PersonalAside from "./PersonalAside";
import MinimalistCurriculum from "../templates/MinimalistCurriculum";
import ModernCurriculum from "../templates/ModernCurriculum";
import ClassicCurriculum from "../templates/ClassicCurriculum";
import { useTemplateContext } from "../context/TemplateContext";

const TEMPLATE_COMPONENTS = {
  modern: ModernCurriculum,
  minimalist: MinimalistCurriculum,
  classic: ClassicCurriculum,
};

// Extraemos los nombres válidos automáticamente para TypeScript
type TemplateName = keyof typeof TEMPLATE_COMPONENTS;

export default function ProfileBuilder() {
  const { templatePage } = useTemplateContext();

  //Dictionary Pattern
  const SelectedTemplate = TEMPLATE_COMPONENTS[templatePage as TemplateName];

  return (
    <div className="w-full min-h-screen flex flex-col lg:grid lg:grid-cols-4 gap-4 p-2 lg:p-4 border-2 border-gray-700 rounded-md bg-gray-200">
      <PersonalAside />
      <section className="md:col-span-3 order-0 md:order-0 h-full flex flex-col lg:">
        <ProfileHeader title="Previsualización Del Curriculum" />
        <div className="w-full bg-linear-to-b from-teal-800 to-cyan-700 border border-gray-700 py-8 flex flex-col items-center rounded-lg gap-6 grow ">
          <div className="sticky top-0 w-11/12 lg:w-4/5 min-h-250">
            {SelectedTemplate ? (
              <SelectedTemplate />
            ) : (
              <p>Seleccione una plantilla válida.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
