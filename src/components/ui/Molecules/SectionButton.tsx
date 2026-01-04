import Button from "../Atoms/Button";
import { useTemplateContext } from "../../../context/TemplateContext";

type TemplateName = "modern" | "minimalist";

interface TemplateOption {
  id: number;
  name: TemplateName;
  description: string;
}

const TEMPLATE_OPTION: TemplateOption[] = [
  {
    id: 1,
    name: "modern",
    description: "Moderna (Bloques centrales)",
  },
  {
    id: 2,
    name: "minimalist",
    description: "Minimalista (Dos columnas)",
  }
];

export default function SectionButton() {
  const { templatePage, setTemplatePage } = useTemplateContext();

  const handleTemplateChange = (template: string) => {
    setTemplatePage(template);
  };

  return (
    <div className="flex flex-col xl:flex-row gap-6">
      {TEMPLATE_OPTION.map((template) => {
        const isActive = templatePage === template.name;

        return (
          <Button
            key={template.id}
            onClick={() => handleTemplateChange(template.name)}
            type="button"
            className={`font-medium border px-8 py-4 rounded-lg transition-all duration-200 ${
              isActive
                ? "bg-gray-600 text-white border-gray-700 shadow-md scale-105" // Estilo Activo
                : "bg-gray-100 text-gray-900 hover:bg-gray-200 border-transparent" // Estilo Inactivo
            }`}
          >
            {template.description}
          </Button>
        );
      })}
    </div>
  );
}
