import Label from "./ui/Atoms/Label";
import Textarea from "./ui/Atoms/Textarea";
import Input from "./ui/Atoms/Input";
import { useFormContext } from "../context/FormContext";
//import { useTemplateContext } from "../context/TemplateContext";
import { useState, useEffect } from "react";

interface EducationEntry {
  id: number;
  degree: string;
  institution: string;
  eduFrom: string;
  eduTo: string;
}

interface ExperienceEntry {
  id: number;
  position: string;
  company: string;
  expFrom: string;
  expTo: string;
  details: string[];
}

interface SkillsEntry {
  skillTitle: string;
  skillDetail: string;
}

const PersonalAside: React.FC = () => {
  const { dataForm, DataHandleChange } = useFormContext();
  //const { templatePage } = useTemplateContext();

  const [skills, setSkills] = useState<SkillsEntry[]>([
    {
      skillTitle: "",
      skillDetail: "",
    },
    {
      skillTitle: "",
      skillDetail: "",
    },
    {
      skillTitle: "",
      skillDetail: "",
    },
  ]);

  useEffect(() => {
    const nonEmpty = skills.filter(
      (s) =>
        (s.skillTitle && s.skillTitle.trim() !== "") ||
        (s.skillDetail && s.skillDetail.trim() !== "")
    );
    if (nonEmpty.length > 0) {
      DataHandleChange(nonEmpty, "skills");
    } else {
      DataHandleChange([], "skills");
    }
  }, [skills, DataHandleChange]);

  const updateSkill = (
    index: number,
    field: keyof SkillsEntry,
    value: string
  ) => {
    setSkills((prev) => {
      const next = [...prev];
      // Si el índice no existe, expandir el array con entradas vacías
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const [educations, setEducations] = useState<EducationEntry[]>([
    {
      id: Date.now(), // Usamos Date.now() como un id inicial simple
      degree: "",
      institution: "",
      eduFrom: "",
      eduTo: "",
    },
  ]);

  const [experiences, setExperiences] = useState<ExperienceEntry[]>([
    {
      id: Date.now(),
      position: "",
      company: "",
      expFrom: "",
      expTo: "",
      details: ["", "", ""],
    },
  ]);

  useEffect(() => {
    DataHandleChange(educations, "educations");
  }, [educations, DataHandleChange]);

  useEffect(() => {
    DataHandleChange(experiences, "experiences");
  }, [experiences, DataHandleChange]);

  // Función para manejar los cambios en los campos de entrada
  const handleInputChange = (
    id: number,
    field: keyof EducationEntry, // 'degree', 'institution', etc.
    value: string
  ) => {
    setEducations((prevEducations) =>
      prevEducations.map((edu) =>
        edu.id === id
          ? {
              ...edu,
              [field]: value, // Actualiza el campo específico
            }
          : edu
      )
    );
  };

  // Función para manejar los cambios en los campos de entrada
  const expHandleInputChange = (
    id: number,
    field: Exclude<keyof ExperienceEntry, "details">, // excluding details
    value: string
  ) => {
    setExperiences((prevExperiences) =>
      prevExperiences.map((exp) =>
        exp.id === id
          ? {
              ...exp,
              [field]: value, // Actualiza el campo específico
            }
          : exp
      )
    );
  };

  // Actualiza un detalle específico (por índice) dentro de una experiencia
  const updateExperienceDetail = (id: number, index: number, value: string) => {
    setExperiences((prev) =>
      prev.map((exp) => {
        if (exp.id !== id) return exp;
        const details = Array.isArray(exp.details) ? [...exp.details] : [];
        details[index] = value;
        return { ...exp, details };
      })
    );
  };

  // 2. Función para agregar una nueva entrada de educación
  const addEducation = () => {
    // 4. Límite de 2: Solo agrega si hay menos de 2
    if (educations.length < 2) {
      const newId = Date.now() + Math.random(); // Generar un ID único
      setEducations([
        ...educations,
        {
          id: newId,
          degree: "",
          institution: "",
          eduFrom: "",
          eduTo: "",
        },
      ]);
    } else {
      alert("Solo puedes añadir un máximo de 2 educaciones.");
    }
  };

  // Funciones para experiencias
  const addExperience = () => {
    if (experiences.length < 2) {
      const newId = Date.now() + Math.random();
      setExperiences((prev) => [
        ...prev,
        {
          id: newId,
          position: "",
          company: "",
          expFrom: "",
          expTo: "",
          details: ["", "", ""],
        },
      ]);
    } else {
      alert("Máximo 2 experiencias permitidas.");
    }
  };

  const removeExperience = (id: number) => {
    if (experiences.length > 1) {
      setExperiences((prev) => prev.filter((e) => e.id !== id));
    } else {
      alert("Debe haber al menos una experiencia.");
    }
  };

  // 3. Función para quitar una entrada de educación
  const removeEducation = (id: number) => {
    // Evita eliminar si solo queda una entrada
    if (educations.length > 1) {
      setEducations((prevEducations) =>
        prevEducations.filter((edu) => edu.id !== id)
      );
    } else {
      alert("Debe haber al menos una entrada de educación.");
    }
  };

  return (
    <aside className="border rounded-lg p-4 md:col-span-1 order-1 md:order-0 bg-white shadow-lg">
      <h2 className="text-2xl text-gray-700 font-bold text-center border-b pb-4 mb-6 ">
        Información Personal
      </h2>
      <form className="space-y-4">
        {/* --------------Datos personales ---------------*/}
        <div className="flex flex-col gap-5">
          <h3 className="text-teal-800 text-xl font-bold text-center">
            Datos personales
          </h3>
          {/* Nombre Completo */}
          <div>
            <Label htmlFor="fullName">Nombre Completo</Label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Ej: Christian Parisca"
              value={dataForm.fullName}
              onChange={DataHandleChange}
              required
            />
          </div>

          {/* Campo de Título Profesional (o Posición Deseada) */}
          <div>
            <Label htmlFor="title">Título Profesional / Posición Deseada</Label>
            <Input
              id="title"
              name="title"
              type="text"
              required
              value={dataForm.title}
              onChange={DataHandleChange}
              placeholder="Ej: Desarrollador Frontend Senior"
            />
          </div>

          {/* Campo de Resumen Profesional (Perfil) */}
          <div>
            <Label htmlFor="summary">Resumen Profesional (Perfil)</Label>
            <Textarea
              id="summary"
              name="summary"
              value={dataForm.summary}
              onChange={DataHandleChange}
              placeholder="Breve resumen de tu experiencia, habilidades y objetivos profesionales."
            />
          </div>

          <div>
            <Input
              id="profileImage"
              name="profileImage"
              placeholder="Imagen de perfil"
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/webp"
              onChange={DataHandleChange}
            ></Input>
          </div>

          {/* {templatePage && templatePage === 'minimalist' && (
            <div>
              <Input id="profileImage" name="profileImage" placeholder="Imagen de perfil" type="file"  accept="image/png, image/jpeg, image/jpg, image/webp" 
                onChange={DataHandleChange}
              ></Input>
            </div>
          )} */}
        </div>

        {/* ---------------Sección de Contacto ----------------*/}
        <div className="pt-2 border-t">
          <h3 className="text-xl font-bold text-center text-teal-800 mb-3">
            Contacto
          </h3>

          <div className="flex flex-col gap-4">
            {/* Teléfono */}
            <div>
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={dataForm.phone}
                onChange={DataHandleChange}
                placeholder="+XX XXX XXX XX XX"
                required
              />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={dataForm.email}
                onChange={DataHandleChange}
                placeholder="christian@gmail.com"
                required
              />
            </div>

            {/* Campo de Ubicación */}
            <div>
              <Label htmlFor="location">Ubicación (Ciudad, País)</Label>
              <Input
                id="location"
                name="location"
                type="text"
                value={dataForm.location}
                onChange={DataHandleChange}
                placeholder="Ej: Madrid, España"
                required
              />
            </div>
          </div>
        </div>

        {/* --------------Sección de Educación ------------------*/}

        <div className="pt-4 border-t flex flex-col items-center justify-center">
          <h3 className="text-xl font-bold text-center text-teal-800 mb-3">
            Educación
          </h3>

          <div className="flex flex-col gap-6">
            {/* Mapea y renderiza cada entrada de educación */}
            {educations.map((edu, index) => (
              <div
                key={edu.id}
                className={`p-4 border border-gray-500 rounded-b-2xl ${
                  index > 0 ? "mt-4" : ""
                }`}
              >
                {/* Título de la sección (opcional si hay más de 1) */}
                {educations.length > 1 && (
                  <h4 className="font-semibold mb-3 text-teal-700">
                    Educación #{index + 1}
                  </h4>
                )}

                <div className="flex flex-col gap-4">
                  {/* Grado / Título */}
                  <div>
                    <Label htmlFor={`degree-${edu.id}`}>Grado / Título</Label>
                    <Input
                      id={`degree-${edu.id}`}
                      name="degree"
                      type="text"
                      placeholder="Ej: Ingeniería en Sistemas"
                      required
                      value={edu.degree}
                      onChange={(e) => {
                        handleInputChange(edu.id, "degree", e.target.value);
                        //DataHandleChange(e);
                      }}
                    />
                  </div>
                  {/* Institución */}
                  <div>
                    <Label htmlFor={`institution-${edu.id}`}>Institución</Label>
                    <Input
                      id={`institution-${edu.id}`}
                      name="institution"
                      type="text"
                      placeholder="Ej: Universidad X"
                      required
                      value={edu.institution}
                      onChange={(e) => {
                        handleInputChange(
                          edu.id,
                          "institution",
                          e.target.value
                        );
                        //DataHandleChange(e);
                      }}
                    />
                  </div>
                  {/* Fechas */}
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Label htmlFor={`eduFrom-${edu.id}`}>Desde</Label>
                      <Input
                        id={`eduFrom-${edu.id}`}
                        name="eduFrom"
                        type="text"
                        placeholder="MM/AAAA"
                        required
                        value={edu.eduFrom}
                        onChange={(e) => {
                          handleInputChange(edu.id, "eduFrom", e.target.value);
                        }}
                      />
                    </div>

                    <div className="flex-1">
                      <Label htmlFor={`eduTo-${edu.id}`}>Hasta</Label>
                      <Input
                        id={`eduTo-${edu.id}`}
                        name="eduTo"
                        type="text"
                        placeholder="MM/AAAA o presente"
                        value={edu.eduTo}
                        onChange={(e) => {
                          handleInputChange(edu.id, "eduTo", e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Botón para quitar (solo si hay más de 1) */}
                {educations.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeEducation(edu.id)}
                    className="mt-4 p-2 w-full bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                  >
                    Quitar Educación
                  </button>
                )}
              </div>
            ))}
            {/* Botón para añadir (solo si hay menos de 2) */}
            {educations.length < 2 && (
              <button
                type="button"
                onClick={addEducation}
                className="p-2 mt-4 bg-teal-600 text-white rounded hover:bg-teal-700 transition"
              >
                Agregar Otra Educación
              </button>
            )}
          </div>
        </div>

        {/* --------------Sección de Educación ------------------*/}

        <div className="pt-4 border-t">
          <h3 className="text-xl font-bold text-center text-teal-800 mb-3">
            Idioma
          </h3>

          <div className="flex flex-col gap-5">
            <div>
              <Label htmlFor="language1">Idioma Principal</Label>
              <Input
                id="primaryLanguage"
                name="primaryLanguage"
                type="text"
                value={dataForm.primaryLanguage}
                onChange={DataHandleChange}
                placeholder="Español: Nativo"
                required
              />
            </div>

            <div>
              <Label htmlFor="language2">Idioma Secundario</Label>

              <Input
                id="secundaryLanguage"
                name="secundaryLanguage"
                type="text"
                value={dataForm.secundaryLanguage}
                onChange={DataHandleChange}
                placeholder="Inglés: B1"
                required
              />
            </div>
          </div>
        </div>

        {/* --------------Sección de Experiencia ------------------*/}

        <div className="pt-4 border-t">
          <h3 className="text-xl font-bold text-center text-teal-800 mb-3">
            Experiencia
          </h3>

          <div className="flex flex-col gap-4  ">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`border border-gray-500 rounded-b-2xl  p-4 ${
                  index > 0 ? "mt-4" : ""
                } `}
              >
                {experiences.length > 1 && (
                  <h4 className="font-semibold mb-3 text-teal-700">
                    Experiencia #{index + 1}
                  </h4>
                )}

                <div>
                  <Label htmlFor={`position`}>Cargo / Puesto</Label>
                  <Input
                    id={`position`}
                    name="position"
                    type="text"
                    value={exp.position}
                    onChange={(e) => {
                      expHandleInputChange(exp.id, "position", e.target.value);
                    }}
                    placeholder="Ej: Ingeniero en Sistemas"
                  />
                </div>

                <div>
                  <Label htmlFor={`company`}>Empresa</Label>
                  <Input
                    id={`company`}
                    name="company"
                    type="text"
                    value={exp.company}
                    onChange={(e) => {
                      expHandleInputChange(exp.id, "company", e.target.value);
                    }}
                    placeholder="Ej: Empana-Tech"
                  />
                </div>

                {/* Fechas */}
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Label htmlFor={`expFrom`}>Desde</Label>
                    <Input
                      id="expFrom"
                      name="expFrom"
                      type="text"
                      value={exp.expFrom}
                      onChange={(e) => {
                        expHandleInputChange(exp.id, "expFrom", e.target.value);
                      }}
                      placeholder="MM/AAAA"
                    />
                  </div>

                  <div className="flex-1">
                    <Label htmlFor={"expTo"}>Hasta</Label>
                    <Input
                      id="expTo"
                      name="expTo"
                      type="text"
                      value={exp.expTo}
                      onChange={(e) => {
                        expHandleInputChange(exp.id, "expTo", e.target.value);
                      }}
                      placeholder="MM/AAAA o presente"
                    />
                  </div>
                </div>

                <div className="pt-2 ">
                  <h4 className="text-md text-center font-semibold text-teal-900 my-4">
                    Logros y Responsabilidades
                  </h4>

                  <div className="flex flex-col gap-5">
                    {/* Logro Clave (Énfasis en resultados) */}
                    <div>
                      <Label htmlFor={`achievement-${exp.id}`}>
                        Logro Clave
                      </Label>
                      <Input
                        id={`achievement-${exp.id}`}
                        name={`achievement-${exp.id}`}
                        value={exp.details?.[0] ?? ""}
                        type="text"
                        onChange={(e) => {
                          updateExperienceDetail(exp.id, 0, e.target.value);
                        }}
                        placeholder="Ej: Reduje el tiempo de procesamiento en un 40%"
                      />
                    </div>

                    {/* Tarea o Proyecto Principal */}
                    <div>
                      <Label htmlFor={`responsibility1`}>
                        Tarea/Proyecto Principal
                      </Label>
                      <Input
                        id={`responsibility-${exp.id}`}
                        name={`responsibility-${exp.id}`}
                        value={exp.details?.[1] ?? ""}
                        type="text"
                        onChange={(e) => {
                          updateExperienceDetail(exp.id, 1, e.target.value);
                        }}
                        placeholder="Ej: Gestioné la infraestructura cloud con Terraform"
                      />
                    </div>

                    {/* Habilidades/Tecnologías Clave */}
                    <div>
                      <Label htmlFor={`techSkills`}>Tecnologías/Skills</Label>
                      <Input
                        id={`techSkills-${exp.id}`}
                        name={`techSkills-${exp.id}`}
                        value={exp.details?.[2] ?? ""}
                        type="text"
                        onChange={(e) => {
                          updateExperienceDetail(exp.id, 2, e.target.value);
                        }}
                        placeholder="Ej: AWS, Python, Docker, GitHub Actions"
                      />
                    </div>
                  </div>
                </div>

                {/* Botón para quitar (solo si hay más de 1) */}
                {experiences.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeExperience(exp.id)}
                    className="mt-4 p-2 w-full bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                  >
                    Quitar Experiencia
                  </button>
                )}
              </div>
            ))}

            {/* Botón para añadir (solo si hay menos de 2) */}
            {experiences.length < 2 && (
              <button
                type="button"
                onClick={addExperience}
                className="p-2 mt-4 bg-teal-600 text-white rounded hover:bg-teal-700 transition"
              >
                Agregar Otra Experiencia
              </button>
            )}
          </div>
        </div>

        {/* --------------Sección de Tecnologias y Habilidades------------------*/}

        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-2xl font-extrabold text-center text-teal-700 mb-5 tracking-wide">
            Habilidades / Tecnologías
          </h3>

          <div className="flex flex-col gap-6">
            <div className="border border-gray-400 rounded-xl p-5 shadow-lg bg-white/50 backdrop-blur-sm transition duration-300 hover:border-teal-500 hover:shadow-teal-200">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="skill-title-1">Título de Habilidad 1</Label>
                  <Input
                    id="skill-title-1"
                    name="skill-title-1"
                    type="text"
                    value={skills[0]?.skillTitle ?? ""}
                    onChange={(e) =>
                      updateSkill(0, "skillTitle", e.target.value)
                    }
                    placeholder="Título (Ej: Frontend)"
                  />
                </div>

                <div>
                  <Label htmlFor="skill-detail-1">Detalle de Habilidad 1</Label>
                  <Input
                    id="skill-detail-1"
                    name="skill-detail-1"
                    type="text"
                    value={skills[0]?.skillDetail ?? ""}
                    onChange={(e) =>
                      updateSkill(0, "skillDetail", e.target.value)
                    }
                    placeholder="Tecnologías (Ej: React, Vue, JS)"
                  />
                </div>
              </div>
            </div>

            <div className="border border-gray-400 rounded-xl p-5 shadow-lg bg-white/50 backdrop-blur-sm transition duration-300 hover:border-teal-500 hover:shadow-teal-200">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="skill-title-2">Título de Habilidad 2</Label>
                  <Input
                    id="skill-title-2"
                    name="skill-title-2"
                    type="text"
                    value={skills[1]?.skillTitle ?? ""}
                    onChange={(e) =>
                      updateSkill(1, "skillTitle", e.target.value)
                    }
                    placeholder="Título (Ej: Backend)"
                  />
                </div>

                <div>
                  <Label htmlFor="skill-detail-2">Detalle de Habilidad 2</Label>
                  <Input
                    id="skill-detail-2"
                    name="skill-detail-2"
                    type="text"
                    value={skills[1]?.skillDetail ?? ""}
                    onChange={(e) =>
                      updateSkill(1, "skillDetail", e.target.value)
                    }
                    placeholder="Tecnologías (Ej: Node.js, Python, SQL)"
                  />
                </div>
              </div>
            </div>

            <div className="border border-gray-400 rounded-xl p-5 shadow-lg bg-white/50 backdrop-blur-sm transition duration-300 hover:border-teal-500 hover:shadow-teal-200">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="skill-title-3">Título de Habilidad 3</Label>
                  <Input
                    id="skill-title-3"
                    name="skill-title-3"
                    type="text"
                    value={skills[2]?.skillTitle ?? ""}
                    onChange={(e) =>
                      updateSkill(2, "skillTitle", e.target.value)
                    }
                    placeholder="Título (Ej: Herramientas)"
                  />
                </div>

                <div>
                  <Label htmlFor="skill-detail-3">Detalle de Habilidad 3</Label>
                  <Input
                    id="skill-detail-3"
                    name="skill-detail-3"
                    type="text"
                    value={skills[2]?.skillDetail ?? ""}
                    onChange={(e) =>
                      updateSkill(2, "skillDetail", e.target.value)
                    }
                    placeholder="Tecnologías (Ej: Git, Docker, AWS)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </aside>
  );
};

export default PersonalAside;
