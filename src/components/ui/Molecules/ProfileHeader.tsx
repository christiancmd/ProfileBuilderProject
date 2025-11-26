import Button from "../Atoms/Button";

interface ProfileHeaderProps {
    title: string;
}

export default function ProfileHeader({title}: ProfileHeaderProps) {
  return (
    <div className="w-full flex justify-between items-center p-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Button type="button" className="font-normal border rounded-lg py-2.5 px-6 text-white bg-teal-800 hover:border-teal-950 hover:text-teal-950 hover:bg-teal-100">Descargar CV</Button>
    </div>
  );
}
