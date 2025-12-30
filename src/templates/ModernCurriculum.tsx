import React from "react";
import { useFormContext } from "../context/FormContext";

interface ExperienceEntry {
  id: number;
  position: string;
  company: string;
  expFrom: string;
  expTo: string;
  details: string[];
}

export const ModernCurriculum: React.FC = () => {
  const { dataForm } = useFormContext();
  const { checked } = useFormContext();
  const {
    fullName,
    title,
    summary,
    phone,
    email,
    location,
    primaryLanguage,
    secundaryLanguage,
    educations,
    experiences,
    skills,
  } = dataForm;

  return (
    <div className="px-12 pt-10 pb-20 space-y-10 bg-white">
      <header className="text-center space-y-1">
        <h1 className="text-4xl font-extrabold text-black/80 uppercase tracking-widest">
          {fullName ? fullName : "CHRISTIAN PARISCA"}
        </h1>
        <h2 className="text-xl font-light text-gray-900/80">
          {title ? title : "Ingeniero De Sistemas & Desarrollador Full Stack"}
        </h2>
        <div className="flex justify-center flex-wrap gap-x-5 gap-y-1 text-sm text-gray-600">
          <span>{location ? location : "Barcelona, España"}</span>
          <span>{email ? email : "example@devmail.com"}</span>
          <span>{phone ? phone : "+34 688 555 123"}</span>
        </div>
      </header>

      <section>
        <h3 className="text-xl font-bold border-b-2 border-gray-300 pb-1 mb-4 text-gray-800/90 uppercase tracking-wider">
          Perfil Profesional
        </h3>
        <p className="text-base text-gray-700 leading-relaxed">
          {summary
            ? summary
            : `Ingeniero de Sistemas con más de 2 años de experiencia
                  liderando el ciclo de vida completo de aplicaciones web
                  escalables. Experiencia profunda en ecosistemas
                  React/Node.js y arquitectura de Microservicios (AWS
                  Lambda). Enfocado en la optimización del rendimiento y la
                  implementación de prácticas de integración continua (CI/CD)
                  para garantizar entregas de alta calidad.`}
        </p>
      </section>

      {/* 3. EXPERIENCIA Y EDUCACIÓN (Dos Columnas Lógicas) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* COLUMNA PRINCIPAL: Experiencia (2/3 del ancho) */}
        <div className="md:col-span-2 space-y-8">
          <section>
            <h3 className="text-xl font-bold border-b-2 border-gray-300 pb-1 mb-4 text-gray-800/90 uppercase tracking-wider">
              {checked.checked ? "Experiencia Laboral" : "Experiencia Personal"}
            </h3>

            {checked.checked
              ? hasExperience(experiences)
              : hasNotExperience()}
          </section>
        </div>

        <div className="md:col-span-1 space-y-6 pt-1">
          <section>
            <h3 className="text-xl font-bold border-b-2 border-gray-300 pb-1 mb-4 text-gray-800/90 uppercase tracking-wider">
              Educación
            </h3>

            {educations && educations.length > 0 ? (
              educations.map(({ id, degree, institution, eduFrom, eduTo }) => (
                <div key={id} className="mb-4">
                  <h4 className="text-lg font-semibold text-gray-700 ">
                    {degree ? degree : "Grado en Ingeniería Informática"}
                  </h4>
                  <p className="text-md text-gray-600">
                    {institution
                      ? institution
                      : "Universidad de Barcelona (UB)"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {eduFrom ? eduFrom : "2013"} - {eduTo ? eduTo : "2017"}
                  </p>
                </div>
              ))
            ) : (
              /* Item de Educación por defecto si no hay datos */
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-gray-700">
                  {"Grado en Ingeniería Informática"}
                </h4>
                <p className="text-md text-gray-600">
                  {"Universidad de Barcelona (UB)"}
                </p>
                <p className="text-sm text-gray-500">
                  {"2013"} - {"2017"}
                </p>
              </div>
            )}
          </section>

          <section>
            <h3 className="text-xl font-bold border-b-2 border-gray-300 pb-1 mb-4 text-gray-800/90 uppercase tracking-wider">
              Idiomas
            </h3>
            <ul className="text-base text-gray-600 space-y-1">
              <li>{primaryLanguage ? primaryLanguage : "Español: Nativo"}</li>
              <li>
                {secundaryLanguage
                  ? secundaryLanguage
                  : "Inglés: C2 - Bilingüe (Certificado TOEFL)"}
              </li>
            </ul>
          </section>
        </div>
      </div>

      {/* 4. TECNOLOGIAS Y HABILIDADES   */}

      <div className="space-y-8 pt-2 ">
        <section>
          <h3 className="text-xl font-bold border-b-2 border-gray-300 pb-1 mb-3 text-gray-800/90 uppercase tracking-wider">
            Tecnologías & Habilidades
          </h3>

          {skills && skills.length > 0 ? (
            <div className="text-base text-gray-700 leading-relaxed space-y-2">
              {skills[0] && (
                <p>
                  <span className="font-semibold text-gray-700">
                    {skills[0]?.skillTitle ? skills[0].skillTitle : "Frontend"}{" "}
                    :
                  </span>{" "}
                  {skills[0]?.skillDetail
                    ? skills[0].skillDetail
                    : "React, TypeScript, Redux, Next.js, Tailwind CSS"}
                  .
                </p>
              )}

              {skills[1] && (
                <p>
                  <span className="font-semibold text-gray-700">
                    {skills[1]?.skillTitle
                      ? skills[1].skillTitle
                      : " Cloud y Base de Datos"}
                    :
                  </span>{" "}
                  {""}
                  {skills[1]?.skillDetail
                    ? skills[1].skillDetail
                    : " AWS (S3, EC2), PostgreSQL, MongoDB, Terraform"}
                  .
                </p>
              )}

              {skills[2] && (
                <p>
                  <span className="font-semibold text-gray-700">
                    {skills[2]?.skillTitle
                      ? skills[2].skillTitle
                      : "Habilidades Blandas"}
                    :
                  </span>{" "}
                  {""}
                  {skills[2]?.skillDetail
                    ? skills[2].skillDetail
                    : `Liderazgo de equipos, Gestión de Proyectos, Comunicación
                efectiva, Resolución de problemas`}
                  .
                </p>
              )}
            </div>
          ) : (
            <div className="text-base text-gray-700/90 leading-relaxed space-y-2">
              <p>
                <span className="font-semibold text-gray-700">Frontend:</span>{" "}
                React, TypeScript, Redux, Next.js, Tailwind CSS.
              </p>

              <p>
                <span className="font-semibold text-gray-700">
                  Cloud & Bases de Datos:
                </span>{" "}
                AWS (S3, EC2), PostgreSQL, MongoDB, Terraform.
              </p>

              <p>
                <span className="font-semibold text-gray-700">
                  Habilidades Blandas:
                </span>{" "}
                Liderazgo de equipos, Gestión de Proyectos, Comunicación
                efectiva, Resolución de problemas.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

const hasNotExperience = () => {

  const { dataForm } = useFormContext();
  const {personalTitle, personalRol, personalFrom, personalTo, personalInfo} = dataForm;

  return (
    <div className="mb-6">  
            <div className="mb-6 px-2">
              <div className="flex justify-between items-start">
                <h4 className="text-lg font-bold text-gray-700">
                  {personalTitle
                    ? personalTitle
                    : "Emprendimiento - Productos de Limpieza"}
                </h4>
                <span className="text-sm font-semibold text-gray-500">
                  {personalFrom ? personalFrom : "2021"} - {personalTo ? personalTo : "Presente"}
                </span>
              </div>
              <p className=" text-gray-600 mb-1">
                {personalRol ? personalRol : "Emprendedor & Distribuidor"}
              </p>

              <p className="text-sm text-gray-700 mt-2 px-4 leading-relaxed text-justify">
                <li>
                  {personalInfo
                  ? personalInfo
                  : `Desarrollé un emprendimiento de productos de limpieza desde el confort de mi hogar, 
                    gestionando personalmente cada etapa, desde la preparación hasta el control de calidad. 
                    Además, asumimos un rol de distribuidor donde abastecimos a otros negocios de los alrededores 
                    de Palo Negro, lo que me permitió aprender sobre la atención al cliente, la gestión de inventarios 
                    y la importancia de cumplir con los tiempos de entrega para mantener la confianza de los comerciantes locales.`}
                </li>
              </p>
            </div>       
    </div>
  );
};

const hasExperience = (experiences: ExperienceEntry[]) => {
  return (
    <>
      {experiences && experiences.length > 0 ? (
        experiences.map(
          ({ id, position, company, expFrom, expTo, details }) => (
            <div key={id.toLocaleString()} className="mb-6">
              <div className="flex justify-between items-start">
                <h4 className="text-lg font-bold text-gray-700">
                  {position ? position : "Arquitecto de Soluciones Senior"}
                </h4>
                <span className="text-sm font-semibold text-gray-500">
                  {expFrom ? expFrom : "2024"} - {expTo ? expTo : "Presente"}
                </span>
              </div>
              <p className="text-md font-semibold text-gray-600 mb-1">
                {company ? company : "TecnoPanathon"}
              </p>
              <ul className="list-disc text-sm text-gray-700 space-y-1 ml-5 mt-2">
                <li className="w-full">
                  {details[0]
                    ? details[0]
                    : `Reduje el tiempo de procesamiento en un 40%, lideré la migración de un monolito a una arquitectura de 5+
                  Microservicios basados en AWS, reduciendo la latencia de
                  respuesta en un 10%.`}
                </li>

                <li className="w-full">
                  {details[1]
                    ? details[1]
                    : `Gestioné la infraestructura cloud con Terraform, mentoricé a un equipo de 6 desarrolladores Full Stack en
                  patrones de diseño y code review.`}
                </li>

                <li className="w-full">
                  {details[2]
                    ? details[2]
                    : `Uso de diferentes tecnologias como AWS, Python, Docker, GitHub Actions y Postman.`}
                </li>
              </ul>
            </div>
          )
        )
      ) : (
        <div className="mb-6">
          <div className="flex justify-between items-start">
            <h4 className="text-lg font-bold text-gray-800">
              Arquitecto de Soluciones Senior
            </h4>
            <span className="text-sm font-semibold text-gray-500">
              2021 - Presente
            </span>
          </div>
          <p className="text-md font-semibold text-gray-600 mb-1">
            Tech Solutions S.L. | Barcelona
          </p>
          <ul className="list-disc text-sm text-gray-700 space-y-1 ml-5 mt-2">
            <li>
              Reduje el tiempo de procesamiento en un 40%, lideré la migración
              de un monolito a una arquitectura de 5+ Microservicios basados en
              AWS, reduciendo la latencia de respuesta en un 10%.
            </li>

            <li>
              Gestioné la infraestructura cloud con Terraform, mentoricé a un
              equipo de 6 desarrolladores Full Stack en patrones de diseño y
              code review.
            </li>

            <li>
              Uso de diferentes tecnologias como AWS, Python, Docker, GitHub
              Actions y Postman.
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default ModernCurriculum;
