import React from "react";
import { useFormContext } from "../context/FormContext";

const MinimalistCurriculum: React.FC = () => {
  const { dataForm } = useFormContext();
  const {
    fullName,
    title,
    summary,
    profileImage,
    phone,
    email,
    location,
    primaryLanguage,
    secundaryLanguage,
    educations,
    experiences,
    skills,
  } = dataForm;

  let imagePreviewUrl = "/src/assets/defaultImg.webp";

  imagePreviewUrl =
    profileImage !== null ? URL.createObjectURL(profileImage) : imagePreviewUrl;

  return (
    <div className="relative bg-gray-900 flex max-w-5xl mx-auto shadow-2xl min-h-screen font-sans items-stretch">
      <aside className="relative z-10 text-white p-8 w-[300px] shrink-0 h-full flex flex-col justify-between gap-8.5">
        <div className="w-full">
          <div className="size-56 overflow-hidden m-0 mx-auto bg-gray-600 rounded-full">
            <img
              className="w-full h-full object-cover"
              src={imagePreviewUrl}
              alt="image-profile"
            />
          </div>
        </div>

        <section>
          <h3 className="text-xl font-bold mb-4 border-b border-white pb-1 tracking-widest">
            CONTACTO
          </h3>
          <div className="text-md text-gray-10 space-y-1">
            <p>+{phone && phone.trim() ? phone : "34 688 555 123"}</p>
            <p>{email && email.trim() ? email : "andres.lopez@devmail.com"}</p>
            <p>
              {location && location.trim() ? location : "Barcelona, España"}
            </p>
          </div>
        </section>

        <div className="md:col-span-1 space-y-6 pt-1">
          <section>
            <h3 className="text-xl font-bold border-b-2 border-gray-300 pb-1 mb-4 text-white uppercase tracking-wider">
              Educación
            </h3>

            {educations && educations.length > 0 ? (
              educations.map(({ id, degree, institution, eduFrom, eduTo }) => (
                <div key={id} className="mb-4">
                  <h4 className="text-md font-semibold text-gray-100">
                    {degree ? degree : "Grado en Ingeniería Informática"}
                  </h4>
                  <p className="text-md text-gray-200">
                    {institution
                      ? institution
                      : "Universidad de Barcelona (UB)"}
                  </p>
                  <p className="text-sm text-gray-100">
                    {eduFrom ? eduFrom : "2013"} - {eduTo ? eduTo : "2017"}
                  </p>
                </div>
              ))
            ) : (
              <div className="mb-4">
                <h4 className="text-md font-semibold text-gray-100">
                  {"Grado en Ingeniería Informática"}
                </h4>
                <p className="text-md text-gray-100">
                  {"Universidad de Barcelona (UB)"}
                </p>
                <p className="text-sm text-gray-100">
                  {"2013"} - {"2018"}
                </p>
              </div>
            )}
          </section>

          <section>
            <h3 className="text-xl font-bold border-b-2 border-gray-300 pb-1 mb-4 text-white uppercase tracking-wider">
              Idiomas
            </h3>
            <ul className="text-base text-gray-100 space-y-1">
              <li>{primaryLanguage ? primaryLanguage : "Español: Nativo"}</li>
              <li>
                {secundaryLanguage
                  ? secundaryLanguage
                  : "Inglés: C2 - Bilingüe (Certificado TOEFL)"}
              </li>
            </ul>
          </section>
        </div>
      </aside>

      <main className="grow py-8 px-10 bg-white">
        <section className="mb-6">
          <div className="mb-6 space-y-1">
            <h1 className="text-4xl text-black/80 font-bold uppercase tracking-widest">
              {fullName ? fullName : "ANDRÉS LÓPEZ"}
            </h1>
            <h2 className="text-xl font-light text-gray-900/80 inline-block">
              {title && title.trim()
                ? title
                : "Arquitecto de Software & Desarrollador Full Stack"}
            </h2>
          </div>
          <h3 className="text-xl font-bold text-gray-800/90 mb-3 border-b-2 border-gray-300 pb-1 tracking-widest uppercase">
            Perfil Profesional
          </h3>
          <p className="text-[0.95em] text-gray-700 leading-relaxed">
            {summary && summary.trim()
              ? summary
              : `Arquitecto de Software con más de 8 años de experiencia
                  liderando el ciclo de vida completo de aplicaciones web
                  escalables. Experiencia profunda en ecosistemas
                  React/Node.js y arquitectura de Microservicios (AWS
                  Lambda). Enfocado en la optimización del rendimiento y la
                  implementación de prácticas de integración continua (CI/CD)
                  para garantizar entregas de alta calidad.`}
          </p>
        </section>

        <section className="mb-10">
          <h3 className="text-xl font-bold text-gray-800/90 mb-4 border-b-2 border-gray-300 pb-1 tracking-widest uppercase">
            Experiencia Laboral
          </h3>

          {experiences && experiences.length > 0 ? (
            experiences.map(
              ({ id, position, company, expFrom, expTo, details }) => (
                <div id={id.toLocaleString()} className="relative ml-1">
                  <div className="flex justify-between items-start">
                    <h4 className="text-lg font-bold text-gray-700">
                      {position ? position : "Arquitecto de Soluciones Senior"}
                    </h4>
                    <span className="text-sm font-semibold text-gray-500">
                      {expFrom ? expFrom : "2024"} -{" "}
                      {expTo ? expTo : "Presente"}
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

                  <div className="mt-4"></div>
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
                  Reduje el tiempo de procesamiento en un 40%, lideré la
                  migración de un monolito a una arquitectura de 5+
                  Microservicios basados en AWS, reduciendo la latencia de
                  respuesta en un 10%.
                </li>

                <li>
                  Gestioné la infraestructura cloud con Terraform, mentoricé a
                  un equipo de 6 desarrolladores Full Stack en patrones de
                  diseño y code review.
                </li>

                <li>
                  Uso de diferentes tecnologias como AWS, Python, Docker, GitHub
                  Actions y Postman.
                </li>
              </ul>
            </div>
          )}
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-800/90 border-b-2 border-gray-300 pb-1 mb-3  uppercase tracking-wider">
            Tecnologías & Habilidades
          </h3>

          {skills && skills.length > 0 ? (
            <div className="text-sm text-gray-700 leading-relaxed space-y-2">
              {skills[0] && (
                <p>
                  <span className="font-semibold text-gray-700">
                    {skills[0]?.skillTitle ? skills[0].skillTitle : "Frontend"}{" "}
                    :
                  </span>{" "}
                  {""}
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
            <div className="text-gray-700/90 leading-relaxed space-y-2">
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
      </main>
    </div>
  );
};

export default MinimalistCurriculum;
