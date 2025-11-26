import Button from "./ui/Atoms/Button";

export default function SectionButton() {
  return (
    <div className="flex gap-6">
      <Button
        type="button"
        className="font-medium border px-8 py-4 rounded-lg bg-gray-100 hover:bg-sky-800 hover:text-gray-50"
      >
        Minimalista (Dos columnas)
      </Button>

      <Button
        type="button"
        className="font-medium border px-8 py-4 rounded-lg bg-gray-100 hover:bg-sky-800 hover:text-gray-50"
      >
        Moderna (Bloques centrales)
      </Button>
    </div>
  );
}
