import { useFormContext } from "../context/FormContext";

export const MinimalistCurriculum: React.FC = () => {
    const { dataForm } = useFormContext();
    const { fullName, title, summary } = dataForm;

  return (
    <div className="flex max-w-5xl mx-auto shadow-xl">
      
      {/* ======================= COLUMNA LATERAL (AZUL) ======================= */}
      <aside className="bg-blue-800 text-white p-8 w-[350px] shrink-0">
        
        {/* Nombre y Título */}
        <div className="mb-10">
          <h1 className="text-5xl font-extrabold leading-none">
            {fullName ? fullName : "JUAN PÉREZ"}
          </h1>
          <p className="text-sm mt-1">
            {title ? title : "Desarrollador Full Stack"}
            </p>
        </div>

        {/* Contacto */}
        <section className="mb-8">
          <h2 className="text-lg font-bold mb-3 border-b border-white pb-1">{`CONTACTO`}</h2>
          <div className="text-sm space-y-1">
            <p>📧 {`juan.perez@ejemplo.com`}</p>
            <p>📞 {`+34 600 123 456`}</p>
            <p>📍 {`Madrid, España`}</p>
            <p>🔗 {`linkedin.com/in/juanperezdev`}</p>
          </div>
        </section>

        {/* Habilidades */}
        <section className="mb-8">
          <h2 className="text-lg font-bold mb-3 border-b border-white pb-1">{`HABILIDADES`}</h2>
          <ul className="list-none p-0 m-0 text-sm space-y-1">
            {([
              "JavaScript", "TypeScript", "React", "Node.js", "MongoDB",
              "PostgreSQL", "Express", "Tailwind CSS", "Git", "Docker"
            ] as const).map((habilidad, index) => (
              <li key={index}>▶ {habilidad}</li>
            ))}
          </ul>
        </section>

        {/* Educación */}
        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-white pb-1">{`EDUCACIÓN`}</h2>
          {([
            {
              titulo: "Máster en Ingeniería de Software",
              institucion: "Universidad Tecnológica de Madrid",
              periodo: "2019 - 2020",
            },
            {
              titulo: "Grado en Informática",
              institucion: "Universidad Politécnica",
              periodo: "2015 - 2019",
            },
          ] as const).map((item, index) => (
            <div key={index} className="mb-3 leading-tight">
              <p className="text-sm font-bold">{item.titulo}</p>
              <p className="text-xs">{item.institucion}</p>
              <p className="text-xs">{item.periodo}</p>
            </div>
          ))}
        </section>
      </aside>

      {/* ======================= COLUMNA PRINCIPAL (BLANCA) ======================= */}
      <main className="grow p-8 bg-white">
        
        {/* Perfil Profesional */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3 border-b-2 border-gray-300 pb-1 text-blue-800">{`PERFIL PROFESIONAL`}</h2>
          <p className="text-base text-gray-700 leading-relaxed">
            {summary ? summary : `Desarrollador con 5 años de experiencia en la creación y
            mantenimiento de aplicaciones web escalables. Experiencia sólida en
            React, Node.js y bases de datos relacionales.`}
          </p>
        </section>

        {/* Experiencia */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3 border-b-2 border-gray-300 pb-1 text-blue-800">{`EXPERIENCIA`}</h2>

          {/* Listado de Experiencia */}
          {([
            {
              titulo: "Desarrollador Principal",
              empresa: "Tech Solutions Inc.",
              periodo: "Ene 2022 - Presente",
              logros: [
                "Lideré el desarrollo de un nuevo panel de administración utilizando React y TypeScript, mejorando la velocidad de carga en un 40%.",
                "Implementación de CI/CD con GitHub Actions."
              ]
            },
            {
              titulo: "Desarrollador Junior",
              empresa: "Innovate Web",
              periodo: "Mar 2020 - Dic 2021",
              logros: [
                "Mantenimiento y desarrollo de nuevas funcionalidades para la plataforma de e-commerce.",
                "Contribuí a la migración de JQuery a React."
              ]
            },
          ] as const).map((exp, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-lg text-blue-700">{exp.titulo}</h3>
                <span className="text-gray-500 text-sm">{exp.periodo}</span>
              </div>
              <p className="italic text-gray-600 mb-2">{exp.empresa}</p>
              <ul className="list-disc ml-5 text-sm space-y-1">
                {exp.logros.map((logro, i) => <li key={i}>{logro}</li>)}
              </ul>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default MinimalistCurriculum;