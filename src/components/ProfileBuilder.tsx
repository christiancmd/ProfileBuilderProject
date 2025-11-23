import Button from "./ui/Atoms/Button";

export default function ProfileBuilder() {
  return (
    <div className="w-full min-h-screen flex flex-col md:grid md:grid-cols-4 gap-4 p-4 border">
      <aside className="border rounded-lg p-1 md:col-span-1 order-1 md:order-0">
        <h2 className="text-xl font-semibold">Profile Builder Sidebar</h2>
        <div>
          <p>Opciones de navegación o resumen.</p>
        </div>
      </aside>

      <section className=" md:col-span-3 order-0 md:order-0 h-full flex flex-col">
        <div className="w-full flex justify-between items-center p-4">
          <h2 className="text-xl font-semibold">
            Previsualizacion del Curriculum
          </h2>

          <Button className="border rounded-lg py-2 px-6 ">
            Descargar CV
          </Button>
        </div>

        <div className="w-full bg-gray-200 border border-gray-700 p-8 flex flex-col items-center rounded-lg gap-6 grow overflow-y-auto">
          <div className="border w-3/4 lg:w-3/5 h-full min-h-[800px] bg-white shadow-xl">
            Curriculum Vitae
          </div>
        </div>
      </section>
    </div>
  );
}
