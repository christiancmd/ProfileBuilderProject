import Button from "../Atoms/Button";
import { useTemplateContext } from "../../../context/TemplateContext";

export default function SectionButton() {

  const { setTemplatePage } = useTemplateContext();

  const handleTemplateChange = (template: string) => {
    setTemplatePage(template);
  }

  return (
    <div className="flex gap-6">
      <Button
        onClick={() => handleTemplateChange('modern')}
        type="button"
        className="font-medium border px-8 py-4 rounded-lg bg-gray-100 hover:bg-gray-500 focus:bg-gray-600 focus:text-white hover:text-gray-50"
      >
        Moderna (Bloques centrales)
      </Button>

        <Button
        onClick={() => handleTemplateChange('minimalist')}
        type="button"
        className="font-medium border px-8 py-4 rounded-lg bg-gray-100 hover:bg-gray-500 focus:bg-gray-600 focus:text-white hover:text-gray-50"
      >
        Minimalista (Dos columnas)
      </Button>
    </div>
  );
}
