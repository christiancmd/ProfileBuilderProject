import GenerateDocument from "../../pdf/GenerateDocument";

interface ProfileHeaderProps {
  title: string;
}

export default function ProfileHeader({ title }: ProfileHeaderProps) {
  return (
    <div className="w-full flex flex-row justify-between items-center p-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <GenerateDocument />
    </div>
  );
}
