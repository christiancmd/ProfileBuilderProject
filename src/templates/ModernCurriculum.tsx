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

interface EducationEntry {
  id: number;
  degree: string;
  institution: string;
  eduFrom: string;
  eduTo: string;
}

interface SkillsEntry {
  skillTitle: string;
  skillDetail: string;
}

interface PrincipalDataEntry {
  fullName: string;
  title: string;
  summary: string;
  phone: string;
  email: string;
  location: string;
}

interface LanguageEntry {
  primaryLanguage: string;
  secundaryLanguage: string;
}

export const ModernCurriculum: React.FC = () => {
  const { dataForm, checked } = useFormContext();
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
        {hasPrincipalData({ fullName, title, location, email, phone, summary })}
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
      <main className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* COLUMNA PRINCIPAL: Experiencia (2/3 del ancho) */}
        <section className="md:col-span-2 space-y-8">
          <h3 className="text-xl font-bold border-b-2 border-gray-300 pb-1 mb-4 text-gray-800/90 uppercase tracking-wider">
            {checked.checked ? "Experiencia Laboral" : "Experiencia Personal"}
          </h3>

          {checked.checked ? hasExperience(experiences) : hasNotExperience()}
        </section>

        <div className="md:col-span-1 space-y-6 ">
          <section>
            <h3 className="text-xl font-bold border-b-2 border-gray-300 pb-1 mb-4 text-gray-800/90 uppercase tracking-wider">
              Educación
            </h3>

            {hasEducation(educations)}
          </section>

          <section>
            <h3 className="text-xl font-bold border-b-2 border-gray-300 pb-1 mb-4 text-gray-800/90 uppercase tracking-wider">
              Idiomas
            </h3>
            
            {hasLanguage({ primaryLanguage, secundaryLanguage })}
          </section>
        </div>
      </main>

      {/* 4. TECNOLOGIAS Y HABILIDADES   */}

      <section className="space-y-8 pt-2 pb-10 ">
        <h3 className="text-xl font-bold border-b-2 border-gray-300 pb-1 mb-3 text-gray-800/90 uppercase tracking-wider">
          Tecnologías & Habilidades
        </h3>

        {hasSkills(skills || [])}
      </section>
    </div>
  );
};

const hasPrincipalData = ({
  fullName,
  title,
  location,
  email,
  phone,
}: PrincipalDataEntry) => {

  const DEFAULTS = {
    fullName: "CHRISTIAN PARISCA",
    title: "Ingeniero De Sistemas & Desarrollador Full Stack",
    location: "Barcelona, España",
    email: "christian.parisca@example.com",
    phone: "+34 688 555 123",
  };

  return (
    <div>
      <h1 className="text-4xl font-extrabold text-black/80 uppercase tracking-wider">
        {fullName || DEFAULTS.fullName}
      </h1>
      <h2 className="text-xl font-medium text-gray-900/70">
        {title || DEFAULTS.title}
      </h2>
      <div className="flex justify-center flex-wrap gap-x-5 gap-y-1 text-sm text-gray-600">
        <span>{location || DEFAULTS.location}</span>
        <span>{email || DEFAULTS.email}</span>
        <span>{phone || DEFAULTS.phone}</span>
      </div>
    </div>
  );
};

const hasLanguage = ({ primaryLanguage, secundaryLanguage }: LanguageEntry) => {

  const DEFAULTS = {
    primaryLanguage: "Español - Nativo",
    secundaryLanguage: "Inglés - Avanzado (C1)",
  };

  return (
    <ul className="text-base text-gray-600 space-y-1">
      <li>{primaryLanguage || DEFAULTS.primaryLanguage}</li>
      <li>{secundaryLanguage || DEFAULTS.secundaryLanguage}</li>
    </ul>
  );
}

const hasSkills = (skills: SkillsEntry[]) => {
  const DEFAULT_SKILLS = [
    {
      skillTitle: "Frontend",
      skillDetail: "React, TypeScript, Redux, Next.js, Tailwind CSS.",
    },
    {
      skillTitle: "Cloud & Bases de Datos",
      skillDetail: "AWS (S3, EC2), PostgreSQL, MongoDB, Terraform.",
    },
    {
      skillTitle: "Habilidades Blandas",
      skillDetail:
        "Liderazgo de equipos, Gestión de Proyectos, Comunicación efectiva, Resolución de problemas.",
    },
  ];

  const skillsToRender = skills && skills.length > 0 ? skills : DEFAULT_SKILLS;

  return (
    <div className="text-gray-700 leading-relaxed space-y-2">
      {skillsToRender.map((skill, index) => (
        <p key={index}>
          <span className="font-semibold text-gray-700">
            {skill.skillTitle || "Sin título"}:{" "}
          </span>
          {skill.skillDetail || "Sin detalle"}.{" "}
        </p>
      ))}
    </div>
  );
};

const hasEducation = (educations: EducationEntry[]) => {
  const DEFAULT_EDUCATION = [ //info de default
    {
      id: "default",
      degree: "Grado en Ingeniería Informática",
      institution: "Universidad de Barcelona (UB)",
      eduFrom: "2013",
      eduTo: "2017",
    },
  ];

    const hasRealContent = educations?.some(
    (educ) => educ.degree?.trim() !== "" || educ.institution?.trim() !== ""
  );

  // Si no hay contenido real, usamos el DEFAULT
  const educationToRender = hasRealContent ? educations : DEFAULT_EDUCATION;
  
  return (
    <>
      {educationToRender.map(({ id, degree, institution, eduFrom, eduTo }) => (
        <div key={id} className="mb-4">
          <h4 className="text-lg font-semibold text-gray-700 ">
            {degree || "Grado en Ingeniería Informática"}
          </h4>
          <p className="text-md text-gray-600">
            {institution || "Universidad de Barcelona (UB)"}
          </p>
          <p className="text-sm text-gray-500">
            {eduFrom || "2013"} - {eduTo || "2017"}
          </p>
        </div>
      ))}
    </>
  );
};

const hasNotExperience = () => {
  const { dataForm } = useFormContext();
  const { personalTitle, personalRol, personalFrom, personalTo, personalInfo } =
    dataForm;

  const DEFAULTS = {
    id: "default",
    personalTitle: "Emprendimiento - Productos de Limpieza",
    personalRol: "Emprendedor & Distribuidor",
    personalFrom: "2021",
    personalTo: "Presente",
    personalInfo: `Desarrollé un emprendimiento de productos de limpieza desde el confort de mi hogar, 
      gestionando personalmente cada etapa, desde la preparación hasta el control de calidad. 
      Además, asumimos un rol de distribuidor donde abastecimos a otros negocios de los alrededores,`,
  };

  return (
    <>
      <div className="mb-12 px-2">
        <div className="flex justify-between items-start">
          <h4 className="text-lg font-bold text-gray-700">
            {personalTitle || DEFAULTS.personalTitle}
          </h4>
          <span className="text-sm font-semibold text-gray-500">
            {personalFrom || DEFAULTS.personalFrom} -{" "}
            {personalTo || DEFAULTS.personalTo}
          </span>
        </div>
        <p className=" text-gray-600 mb-1">
          {personalRol || DEFAULTS.personalRol}
        </p>

        <div className="text-sm text-gray-700 mt-2 px-4 leading-relaxed text-justify">
          <li className="text-sm text-gray-700 mt-2 px-4 leading-relaxed text-justify">
            {personalInfo || DEFAULTS.personalInfo}
          </li>
        </div>
      </div>
    </>
  );
};

const hasExperience = (experiences: ExperienceEntry[]) => {
  const DEFAULT_EXPERIENCE = [
    {
      id: "default",
      position: "Arquitecto de Soluciones Senior",
      company: "Tech Solutions S.L. | Barcelona",
      expFrom: "2021",
      expTo: "Presente",
      details: [
        "Reduje el tiempo de procesamiento en un 40%, lideré la migración de un monolito a una arquitectura de 5+ Microservicios basados en AWS, reduciendo la latencia de respuesta en un 10%.",
        "Gestioné la infraestructura cloud con Terraform y mentoricé a un equipo de 6 desarrolladores Full Stack en patrones de diseño y code review.",
        "Uso de tecnologías como AWS, Python, Docker, GitHub Actions y Postman.",
      ],
    },
  ];

    // Verificamos si hay al menos un estudio que tenga información real
  const hasRealContent = experiences?.some(
    (exp) => exp.position?.trim() !== "" || exp.company?.trim() !== "" 
  );

  // Si no hay contenido real, usamos el DEFAULT
  const hasExpToRender = hasRealContent ? experiences : DEFAULT_EXPERIENCE;

  return (
    <>
      {hasExpToRender.map(
        ({ id, position, company, expFrom, expTo, details }) => (
          <div key={id.toLocaleString()} className="mb-6">
            <div className="flex justify-between items-start">
              <h4 className="text-lg font-bold text-gray-700">
                {position || "Arquitecto de Soluciones Senior"}
              </h4>
              <span className="text-sm font-semibold text-gray-500">
                {expFrom || "2024" } - {expTo || "Presente"}
              </span>
            </div>

            <p className="text-md font-semibold text-gray-600 mb-1">
              {company || "Tech Solutions S.L. | Barcelona"}
            </p>

            {details && details.length > 0 && (
              <ul className="list-disc text-sm text-gray-700 space-y-1 ml-5 mt-2">
                {details.map((detail, index) => (
                  <li key={index} className="w-full">
                    {detail || DEFAULT_EXPERIENCE[0].details[index]}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-4"></div>
          </div>
        )
      )}
    </>
  );
};

export default ModernCurriculum;
