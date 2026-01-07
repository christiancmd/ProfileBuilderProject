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
  specialization?: string; // Agregado para coincidir con la imagen
  thesis?: string; // Agregado para coincidir con la imagen
}

interface SkillsEntry {
  skillTitle: string;
  skillDetail: string;
}

interface PrincipalDataEntry {
  fullName: string;
  title: string;
  phone: string;
  email: string;
  location: string;
  webLink?: string; // Dato por defecto de la imagen
}

function ClassicCurriculum() {
  const { dataForm, checked } = useFormContext();
  const {
    fullName,
    title,
    summary,
    webLink,
    phone,
    email,
    location,
    experiences,
    educations,
    skills,
  } = dataForm;

  return (
    <div className="px-12 pt-10 pb-20 space-y-10 bg-white">
      {/* HEADER SECTION */}
      <header className="mb-4">
        {hasPrincipalData({
          fullName,
          title,
          phone,
          email,
          location,
          webLink,
        })}
      </header>

      {/* SUMMARY SECTION */}
      <section className="mb-3">
        <h2 className="text-xl font-bold border-b-2 border-gray-300 pb-1 mb-4 text-gray-800/90 uppercase tracking-wider">
          Perfil Profesional
        </h2>
        <p className="text-sm md:text-[11pt] text-justify leading-relaxed text-gray-700">
          {summary ||
            `Ingeniero de Sistemas con más de 2 años de experiencia
                  liderando el ciclo de vida completo de aplicaciones web
                  escalables. Experiencia profunda en ecosistemas
                  React/Node.js y arquitectura de Microservicios (AWS
                  Lambda). Enfocado en la optimización del rendimiento y la
                  implementación de prácticas de integración continua (CI/CD)
                  para garantizar entregas de alta calidad.`}
        </p>
      </section>


      {/* WORK EXPERIENCE SECTION */}
      <section className="mb-4">
        <h2 className="text-xl font-bold border-b-2 border-gray-300 pb-1 mb-4 text-gray-800/90 uppercase tracking-wider">
          {checked.checked ? "Experiencia Laboral" : "Experiencia Personal"}
        </h2>

        {checked.checked ? hasExperience(experiences) : hasNotExperience()}
      </section>

      {/* EDUCATION SECTION */}
      <section className="mb-4">
        <h2 className="text-xl font-bold border-b-2 border-gray-300 pb-1 mb-4 text-gray-800/90 uppercase tracking-wider">
          EStudios Y Cursos
        </h2>
        <div className="space-y-2">{hasEducation(educations || [])}</div>
      </section>


      {/* ADDITIONAL INFORMATION SECTION */}
      <section className="mb-8">
        <h2 className="text-xl font-bold border-b-2 border-gray-300 pb-1 mb-4 text-gray-800/90 uppercase tracking-wider">
          Información Adicional 
        </h2>

        <div className="text-sm md:text-[11pt] text-gray-700 space-y-2">
          {hasSkills(skills || [])}
        </div>
      </section>
    </div>
  );
}

const hasPrincipalData = (principalData: PrincipalDataEntry) => {
  const { fullName, title, phone, email, location, webLink } = principalData;

  const DEFAULTS = {
    fullName: "CHRISTIAN PARISCA",
    location: "Barcelona, España",
    title: "Ingeniero De Sistemas & Desarrollador Full Stack",
    email: "christian.parisca@example.com",
    phone: "+34 688 555 123",
    webLink: 'www.pagina.com'
  };

  return (
    <div>
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-extrabold  text-black/80  tracking-wide  uppercase leading-tight">
          {fullName || DEFAULTS.fullName}
        </h1>
        <h2 className="text-lg md:text-xl font-medium text-gray-900/70 tracking-wide">
          {title || DEFAULTS.title}
        </h2>
      </div>

      <div className="flex justify-center items-center text-sm text-center text-gray-600 flex-col md:flex-row  gap-1 md:gap-3 ">
        <div className="flex items-center space-x-2">
          <span>{location || DEFAULTS.location}</span>
        </div>   
        <div className="flex items-center">
          <span>{email || DEFAULTS.email}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>{phone || DEFAULTS.phone}</span>
        </div>
      </div>

      <p className="text-sm text-center text-gray-500">{webLink || DEFAULTS.webLink}</p>
    </div>
  );
};

const hasEducation = (educations: EducationEntry[]) => {
  const DEFAULT_EDUCATION = [
    {
      id: "default",
      degree: "Grado en Ingeniería Informática",
      institution: "Universidad de Barcelona (UB)",
      eduFrom: "May 2013",
      eduTo: "Jun 2017",
    },
    {
      id: "default2",
      degree: "Máster en Ciencia de Datos",
      institution: "Universidad Politécnica de Cataluña (UPC)",
      eduFrom: "Feb 2018",
      eduTo: "Jun 2019",
    },
  ];

  // Verificamos si hay al menos un estudio que tenga información real
  const hasRealContent = educations?.some(
    (educ) => educ.degree?.trim() !== "" || educ.institution?.trim() !== ""
  );

  // Si no hay contenido real, usamos el DEFAULT
  const educationToRender = hasRealContent ? educations : DEFAULT_EDUCATION;

  return (
    <>
      {educationToRender.map(({ id, degree, institution, eduFrom, eduTo }) => (
        <div key={id} className="mb-2">
          <div className="flex justify-between items-baseline">
            <h3 className="text-sm md:text-md font-semibold text-gray-700">
            {degree || "Grado en Ingeniería Informática"}
            </h3>
            <span className="text-sm font-semibold text-gray-500">
            {eduFrom || "May 2013"} - {eduTo || "Jun 2017"}
            </span>
          </div>

          <p className="text-sm md:text-[11pt] text-gray-700">
            {institution || "Universidad de Barcelona (UB)"}
          </p>
        </div>
      ))}
    </>
  );
};

const hasSkills = (skills: SkillsEntry[]) => {
  const DEFAULT_SKILLS = [
    {
      skillTitle: "Habilidades Técnicas",
      skillDetail:
        "JavaScript, TypeScript, React, Node.js, Python, Docker, Kubernetes.",
    },
    {
      skillTitle: "Lenguajes",
      skillDetail: "Ingles (Fluente), Spanish (Nativo), French (Intermedio).",
    },
    {
      skillTitle: "Habilidades Blandas",
      skillDetail:
        "Liderazgo de equipos, Gestión de Proyectos, Comunicación efectiva, Resolución de problemas.",
    },
  ];

  const skillsToRender = skills && skills.length > 0 ? skills : DEFAULT_SKILLS;

  return (
    <div className="text-gray-700 leading-relaxed space-y-1">
      {skillsToRender.map((skill, index) => (
        <p key={index}>
          <span className="font-semibold text-gray-700">
            {skill.skillTitle || "Sin título"}:{" "}
          </span>
          {skill.skillDetail || "Sin detalle"}
        </p>
      ))}
    </div>
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
      <div className="mb-4 px-2">
        <div className="flex justify-between items-start">
          <h4 className="text-md font-bold text-gray-700">
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

        <div className=" mt-2 px-4 ">
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
      expFrom: "Ene 2024",
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
          <div key={id.toLocaleString()} className="mb-2">
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
              <ul className="list-disc text-sm text-gray-700 space-y-1 ml-5 mt-2 p-0 md:pr-10">
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

export default ClassicCurriculum;
