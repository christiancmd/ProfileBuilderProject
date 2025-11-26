import ProfileHeader from "./ui/Molecules/ProfileHeader";
import PersonalAside from "./PersonalAside";
import { useFormContext } from "../context/FormContext";

export default function ProfileBuilder() {
  const { dataForm } = useFormContext();

  const { fullName, title, summary } = dataForm;

  return (
    <div className="w-full min-h-screen flex flex-col md:grid md:grid-cols-4 gap-4 p-4 border bg-gray-200">
      <PersonalAside />
      <section className=" md:col-span-3 order-0 md:order-0 h-full flex flex-col">
        <ProfileHeader title="Previsualizacion del Curriculum" />
        <div className="w-full bg-gray-400 border border-gray-700 p-8 flex flex-col items-center rounded-lg gap-6 grow ">
          <div className="sticky top-0 border w-3/4 lg:w-8/12 min-h-[1000px] bg-white shadow-xl overflow-y-auto">
            {/* Aquí iría el contenido dinámico */}
            <div className="p-10 space-y-10">
              {/* 1. CABECERA: Nombre y Título */}
              <header className="text-center pb-4 border-b-4 border-blue-600/70">
                <h1 className="text-5xl font-extrabold text-gray-900 uppercase tracking-widest">
                  {fullName ? fullName : "ANDRÉS LÓPEZ"}
                </h1>
                <p className="text-xl font-light text-blue-700 mt-2">
                  {title
                    ? title
                    : "Arquitecto de Software & Desarrollador Full Stack"}
                </p>
                <div className="flex justify-center flex-wrap gap-x-5 gap-y-1 text-sm text-gray-600 mt-3">
                  <span>📍 Barcelona, España</span>
                  <span>📧 andres.lopez@devmail.com</span>
                  <span>📞 +34 688 555 123</span>
                </div>
              </header>

              {/* 2. RESUMEN PROFESIONAL */}
              <section>
                <h3 className="text-xl font-bold border-b-2 border-gray-300 pb-1 mb-4 text-gray-800 uppercase tracking-wider">
                  Perfil Profesional
                </h3>
                <p className="text-base text-gray-700 leading-relaxed italic">
                  {summary
                    ? summary
                    : `Arquitecto de Software con **más de 8 años** de experiencia
                  liderando el ciclo de vida completo de aplicaciones web
                  escalables. Experiencia profunda en ecosistemas
                  **React/Node.js** y arquitectura de Microservicios (AWS
                  Lambda)**. Enfocado en la optimización del rendimiento y la
                  implementación de prácticas de integración continua (CI/CD)
                  para garantizar entregas de alta calidad.`}
                </p>
              </section>

              {/* 3. EXPERIENCIA Y EDUCACIÓN (Dos Columnas Lógicas) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* COLUMNA PRINCIPAL: Experiencia (2/3 del ancho) */}
                <div className="md:col-span-2 space-y-8">
                  <section>
                    <h3 className="text-xl font-bold border-b-2 border-blue-600 pb-1 mb-4 text-gray-800 uppercase tracking-wider">
                      Experiencia Laboral
                    </h3>

                    {/* Puesto 1 */}
                    <div className="mb-6">
                      <div className="flex justify-between items-start">
                        <h4 className="text-lg font-bold text-gray-800">
                          Arquitecto de Soluciones Senior
                        </h4>
                        <span className="text-sm font-semibold text-gray-500">
                          2021 - Presente
                        </span>
                      </div>
                      <p className="text-md font-semibold text-blue-600 mb-1">
                        Tech Solutions S.L. | Barcelona
                      </p>
                      <ul className="list-disc text-sm text-gray-700 space-y-1 ml-5 mt-2">
                        <li>
                          Lideré la migración de un monolito a una arquitectura
                          de **15+ Microservicios** basados en AWS, reduciendo
                          la latencia de respuesta en un 40%.
                        </li>
                        <li>
                          Diseñé e implementé la estrategia de CI/CD utilizando
                          **GitHub Actions** y **Terraform**.
                        </li>
                        <li>
                          Mentoricé a un equipo de 6 desarrolladores Full Stack
                          en patrones de diseño y *code review*.
                        </li>
                      </ul>
                    </div>

                    {/* Puesto 2 */}
                    <div className="mb-4">
                      <div className="flex justify-between items-start">
                        <h4 className="text-lg font-bold text-gray-800">
                          Desarrollador Web Full Stack
                        </h4>
                        <span className="text-sm font-semibold text-gray-500">
                          2017 - 2021
                        </span>
                      </div>
                      <p className="text-md font-semibold text-blue-600 mb-1">
                        Innovate Digital Agency | Madrid
                      </p>
                      <ul className="list-disc text-sm text-gray-700 space-y-1 ml-5 mt-2">
                        <li>
                          Desarrollé la interfaz de usuario con React y Redux,
                          mejorando la experiencia de usuario (UX) en el proceso
                          de checkout.
                        </li>
                        <li>
                          Optimicé consultas SQL complejas, lo que resultó en
                          una mejora del 25% en el tiempo de carga de informes
                          críticos.
                        </li>
                      </ul>
                    </div>
                  </section>
                </div>

                {/* COLUMNA LATERAL: Educación y Otros (1/3 del ancho) */}
                <div className="md:col-span-1 space-y-6 pt-1">
                  <section>
                    <h3 className="text-xl font-bold border-b-2 border-gray-300 pb-1 mb-4 text-gray-800 uppercase tracking-wider">
                      Educación
                    </h3>
                    {/* Item de Educación 1 */}
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-gray-800">
                        Máster en Arquitectura de Software
                      </h4>
                      <p className="text-md text-gray-600">
                        Universidad Politécnica de Cataluña (UPC)
                      </p>
                      <p className="text-sm text-gray-500">2021</p>
                    </div>
                    {/* Item de Educación 2 */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">
                        Ingeniería Informática
                      </h4>
                      <p className="text-md text-gray-600">
                        Universidad Complutense de Madrid (UCM)
                      </p>
                      <p className="text-sm text-gray-500">2013 - 2017</p>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-xl font-bold border-b-2 border-gray-300 pb-1 mb-4 text-gray-800 uppercase tracking-wider">
                      Idiomas
                    </h3>
                    <ul className="text-base text-gray-700 space-y-1">
                      <li>**Español:** Nativo</li>
                      <li>**Inglés:** C2 - Bilingüe (Certificado TOEFL)</li>
                    </ul>
                  </section>
                </div>
              </div>

              {/* 4. BLOQUE DE HABILIDADES Y PROYECTOS (Bloque Central Inferior) */}
              <div className="space-y-8 pt-4 border-t border-gray-200">
                <section>
                  <h3 className="text-xl font-bold border-b-2 border-blue-600 pb-1 mb-3 text-gray-800 uppercase tracking-wider">
                    Tecnologías & Habilidades
                  </h3>

                  <div className="text-base text-gray-700 leading-relaxed space-y-2">
                    {/* Lista simple de Tecnologías (Frontend, Backend, DevOps, BD) */}

                    <p>
                      <span className="font-semibold text-gray-800">
                        Frontend:
                      </span>{" "}
                      React, TypeScript, Redux, Next.js, Tailwind CSS.
                    </p>

                    <p>
                      <span className="font-semibold text-gray-800">
                        Backend & Servidor:
                      </span>{" "}
                      Node.js, Express, Python, Serverless (AWS Lambda).
                    </p>

                    <p>
                      <span className="font-semibold text-gray-800">
                        Cloud & Bases de Datos:
                      </span>{" "}
                      AWS (S3, EC2), PostgreSQL, MongoDB, Terraform.
                    </p>

                    <p>
                      <span className="font-semibold text-gray-800">
                        DevOps & Metodologías:
                      </span>{" "}
                      CI/CD, Docker, Git, Scrum/Agile.
                    </p>

                    {/* Se puede incluir una línea extra para Habilidades Blandas */}
                    <p>
                      <span className="font-semibold text-gray-800">
                        Habilidades Blandas:
                      </span>{" "}
                      Liderazgo de equipos, Gestión de Proyectos, Comunicación
                      efectiva, Resolución de problemas.
                    </p>
                  </div>
                </section>
              </div>
            </div>
            {/* Aquí iría el contenido dinámico */}
          </div>
        </div>
      </section>
    </div>
  );
}
