import Button from "../Atoms/Button";
import { useFormContext } from "../../../context/FormContext";
import { useTemplateContext } from "../../../context/TemplateContext";

interface ProfileHeaderProps {
    title: string;
}

export default function ProfileHeader({title}: ProfileHeaderProps) {
  const {dataForm} = useFormContext();
  const {templatePage} = useTemplateContext();

  const handleDocument = () => {
    try {
      const data = {
        ...dataForm,
        template: templatePage
      }
      
    } catch (error) {
      console.error(`error procesando datos: ${error} -> `, dataForm );
      
    }
  }

  return (
    <div className="w-full flex justify-between items-center p-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Button onClick={handleDocument} type="button" className="font-normal border rounded-lg py-2.5 px-6 text-white bg-teal-800 hover:border-teal-950 hover:text-teal-950 hover:bg-teal-100">Descargar CV</Button>
    </div>
  );
}
