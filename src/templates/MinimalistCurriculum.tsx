import React from "react";
import { useFormContext } from "../context/FormContext";
import { useState, useEffect } from "react";

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

interface LanguageEntry {
  primaryLanguage: string;
  secundaryLanguage: string;
}

interface PrincipalDataEntry {
  fullName: string;
  title: string;
  summary: string;
}

const MinimalistCurriculum: React.FC = () => {
  const [previewUrl, setPreviewUrl] = useState<string>(
    "/src/assets/image/defaultImg.webp"
  );

  const { dataForm, checked } = useFormContext();
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

  useEffect(() => {
    if (!profileImage) {
      setPreviewUrl("/src/assets/image/defaultImg.webp");
      return;
    }
    const url = URL.createObjectURL(profileImage);
    setPreviewUrl(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [profileImage]);

  return (
    <div className="relative bg-gray-900 flex flex-col md:flex-row max-w-5xl mx-auto shadow-2xl min-h-screen font-sans items-stretch">
      <aside className="relative text-white p-6 md:p-8 w-full md:w-72 min-w-[18rem] max-w-full md:max-w-[18em] shrink-0 h-full flex flex-col justify-between gap-8 overflow-hidden">
        <div className="w-full">
          <div className="w-56 h-56 overflow-hidden m-0 mx-auto bg-gray-600 rounded-full">
            <img
              className="w-full h-full object-cover"
              src={previewUrl}
              alt="image-profile"
            />
          </div>
        </div>

        <section>
          <h3 className="text-xl font-bold mb-4 border-b border-white pb-1 tracking-widest">
            CONTACTO
          </h3>
          <div className="text-md text-gray-10 space-y-1">
            <p>{phone && phone.trim() ? phone : "+34 688 555 123"}</p>
            <p>{email && email.trim() ? email : "example@devmail.com"}</p>
            <p>
              {location && location.trim() ? location : "Barcelona, España"}
            </p>
          </div>
        </section>

        <div className="md:col-span-1 space-y-6 pt-1">
          <section className="overflow-hidden flex flex-col flex-wrap">
            <h3 className="text-xl font-bold border-b-2 border-gray-300 pb-1 mb-4 text-white uppercase tracking-wider">
              Educación
            </h3>

            {hasEducation(educations)}
          </section>

          <section>
            <h3 className="text-xl font-bold border-b-2 border-gray-300 pb-1 mb-4 text-white uppercase tracking-wider">
              Idiomas
            </h3>

            {hasLanguage({ primaryLanguage, secundaryLanguage })}
          </section>
        </div>
      </aside>

      <main className="grow py-8 px-6 md:px-10 bg-white">
        <section className="mb-6">
          {hasPrincipalData({ fullName, title, summary })}
        </section>

        <section className="mb-10">
          <h3 className="text-xl font-bold text-gray-800/90 mb-4 border-b-2 border-gray-300 pb-1 tracking-widest uppercase">
            {checked.checked ? "Experiencia Laboral" : "Experiencia Personal"}
          </h3>

          {checked.checked ? hasExperience(experiences) : hasNotExperience()}
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-800/90 border-b-2 border-gray-300 pb-1 mb-3 uppercase tracking-wider">
            Tecnologías & Habilidades
          </h3>

          {hasSkills(skills || [])}
        </section>
      </main>
    </div>
  );
};

const hasPrincipalData = ({ fullName, title, summary }: PrincipalDataEntry) => {

  const DEFAULTS = {
    fullName: "CHRISTIAN PARISCA",
    title: "Ingeniero De Sistemas & Desarrollador Full Stack",
    summary: `Ingeniero de Sistemas con más de 2 años de experiencia
            liderando el ciclo de vida completo de aplicaciones web
            escalables. Experiencia profunda en ecosistemas
            React/Node.js y arquitectura de Microservicios (AWS
            Lambda). Enfocado en la optimización del rendimiento y la
            implementación de prácticas de integración continua (CI/CD)
            para garantizar entregas de alta calidad.`,
  };

  return (
    <>
      <div className="mb-6 space-y-1">
        <h1 className="text-3xl text-black/80 font-bold uppercase tracking-wide">
          {fullName || DEFAULTS.fullName}
        </h1>
        <h2 className="text-xl font-medium text-gray-900/70 inline-block">
          {(title && title.trim()) ||
            DEFAULTS.title}
        </h2>
      </div>
      <h3 className="text-xl font-bold text-gray-800/90 mb-3 border-b-2 border-gray-300 pb-1 tracking-widest uppercase">
        Perfil Profesional
      </h3>
      <p className="text-[0.95em] text-gray-700 leading-relaxed">
        {(summary && summary.trim()) ||
          DEFAULTS.summary}
      </p>
    </>
  );
};

const hasLanguage = ({ primaryLanguage, secundaryLanguage }: LanguageEntry) => {
  const DEFAULTS = {
    primaryLanguage: "Español - Nativo",
    secundaryLanguage: "Inglés - Avanzado (C1)",
  };

  return (
    <ul className="text-base text-gray-200 space-y-1">
      <li>{primaryLanguage || DEFAULTS.primaryLanguage}</li>
      <li>{secundaryLanguage || DEFAULTS.secundaryLanguage}</li>
    </ul>
  );
};

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
  const DEFAULT_EDUCATION = [
    {
      id: "default",
      degree: "Grado en Ingeniería Informática",
      institution: "Universidad de Barcelona (UB)",
      eduFrom: "2013",
      eduTo: "2017",
    },
  ];

    // Verificamos si hay al menos un estudio que tenga información real
  const hasRealContent = educations?.some(
    (exp) => exp.degree?.trim() !== "" || exp.institution?.trim() !== ""
  );

  // Si no hay contenido real, usamos el DEFAULT
  const educationToRender = hasRealContent ? educations : DEFAULT_EDUCATION;

  return (
    <>
      {educationToRender.map(({ id, degree, institution, eduFrom, eduTo }) => (
        <div key={id} className="mb-4">
          <h4 className="text-md font-semibold text-gray-100">
            {degree || "Grado en Ingeniería Informática"}
          </h4>
          <p className="text-md text-gray-200">
            {institution || "Universidad de Barcelona (UB)"}
          </p>
          <p className="text-sm text-gray-100">
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
          <div key={id.toLocaleString()} className="relative ml-1">
            <div className="flex justify-between items-start">
              <h4 className="text-lg font-bold text-gray-700">
                {position || "Arquitecto de Soluciones Senior"}
              </h4>
              <span className="text-sm font-semibold text-gray-500">
                {expFrom || "Ene 2024" } - {expTo || "Presente"}
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

export default MinimalistCurriculum;
