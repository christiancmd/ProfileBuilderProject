import Button from "./ui/Atoms/Button"

export default function SectionButton() {
  return (
     <div className="flex gap-6">
      <Button className="border px-8 py-4 rounded-lg">
        Minimalista (Dos columnas)
      </Button>

      <Button className="border px-8 py-4 rounded-lg">
        Moderna (Bloques centrales)
      </Button>
    </div>
  )
}

