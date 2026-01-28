import Label from "./ui/Atoms/Label";
import Textarea from "./ui/Atoms/Textarea";
import Input from "./ui/Atoms/Input";
import { useFormContext } from "../context/FormContext";
import { useTemplateContext } from "../context/TemplateContext";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";

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

export default function PersonalAside() {
  const { dataForm, DataHandleChange, setChecked } = useFormContext();
  const { templatePage } = useTemplateContext();
  const [showModalExperience, setShowModalExperience] = useState(true);

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
        (s.skillDetail && s.skillDetail.trim() !== ""),
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
    value: string,
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
      id: 1, // id inicial constante para evitar llamadas impuras en render
      degree: "",
      institution: "",
      eduFrom: "",
      eduTo: "",
    },
  ]);

  const [experiences, setExperiences] = useState<ExperienceEntry[]>([
    {
      id: 1,
      position: "",
      company: "",
      expFrom: "",
      expTo: "",
      details: ["", "", ""],
    },
  ]);

  // Contador local para generar ids numéricos únicos sin llamar funciones impuras durante el render
  const nextId = useRef<number>(3);

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
    value: string,
  ) => {
    setEducations((prevEducations) =>
      prevEducations.map((edu) =>
        edu.id === id
          ? {
              ...edu,
              [field]: value, // Actualiza el campo específico
            }
          : edu,
      ),
    );
  };

  // Función para manejar los cambios en los campos de entrada
  const expHandleInputChange = (
    id: number,
    field: Exclude<keyof ExperienceEntry, "details">, // excluding details
    value: string,
  ) => {
    setExperiences((prevExperiences) =>
      prevExperiences.map((exp) =>
        exp.id === id
          ? {
              ...exp,
              [field]: value, // Actualiza el campo específico
            }
          : exp,
      ),
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
      }),
    );
  };

  // 2. Función para agregar una nueva entrada de educación
  const addEducation = () => {
    // 4. Límite de 3: Solo agrega si hay menos de 3
    if (educations.length < 3) {
      const newId = nextId.current++;
      setEducations((prev) => [
        ...prev,
        {
          id: newId,
          degree: "",
          institution: "",
          eduFrom: "",
          eduTo: "",
        },
      ]);
    } else {
      alert("Solo puedes añadir un máximo de 3 educaciones.");
    }
  };

  // Funciones para experiencias
  const addExperience = () => {
    if (experiences.length < 2) {
      const newId = nextId.current++;
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
        prevEducations.filter((edu) => edu.id !== id),
      );
    } else {
      alert("Debe haber al menos una entrada de educación.");
    }
  };

  const handleExperienceChange = () => {
    const nextValue = !showModalExperience;
    setShowModalExperience(nextValue);

    if (nextValue) {
      toast.success("Modal de experiencia activado");
    } else {
      toast.error("Modal de experiencia desactivado");
    }

    try {
      setChecked({ checked: nextValue });
    } catch (error) {
      console.error("Error al actualizar context:", error);
    }
  };

  return (
    <aside className="rounded-xl p-4 md:p-6 md:col-span-1 order-1 md:order-0 bg-white/60 shadow-lg border border-gray-100">
      <h2 className="text-2xl text-gray-700 font-bold text-center border-b pb-4 xl:pb-6 mb-6 ">
        Información Personal
      </h2>
      <form className="space-y-4">
        {/* --------------Datos personales ---------------*/}
        <section className="flex flex-col gap-5">
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
              maxLength={35}
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
              maxLength={60}
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
              rows={6}
              maxLength={425}
            />
          </div>

          {templatePage && templatePage === "classic" && (
            <div>
              <Label htmlFor="webLink">Sitio web / Linkedin</Label>
              <Input
                id="webLink"
                name="webLink"
                type="text"
                value={dataForm.webLink}
                onChange={DataHandleChange}
                maxLength={90}
                placeholder="www.web.com / Linkedi"
              ></Input>
            </div>
          )}

          {templatePage && templatePage === "minimalist" && (
            <div>
              <Label htmlFor="profileImage">Imagen (Perfil)</Label>
              <Input
                id="profileImage"
                name="profileImage"
                placeholder="Imagen de perfil"
                type="file"
                // accept both MIME types and common extensions to maximize support
                accept="image/png,image/jpeg,image/jpg,image/webp,.png,.jpg,.jpeg,.webp"
                onChange={DataHandleChange}
              ></Input>
            </div>
          )}
        </section>

        {/* ---------------Sección de Contacto ----------------*/}
        <section className="pt-2 border-t">
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
                placeholder="XX XXX XXX XX XX"
                maxLength={26}
                required
                autoComplete="tel"
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
                maxLength={33}
                required
                autoComplete="email"
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
                maxLength={60}
                required
              />
            </div>
          </div>
        </section>

        {/* --------------Sección de Educación ------------------*/}

        <section className="pt-4 border-t flex flex-col items-center justify-center">
          <h3 className="text-xl font-bold text-center text-teal-800 mb-3">
            Educación
          </h3>

          <div className="flex flex-col gap-6">
            {/* Mapea y renderiza cada entrada de educación */}
            {educations.map((edu, index) => (
              <div
                key={edu.id}
                className={`p-5 md:p-6 border border-gray-200 rounded-lg bg-white/50 shadow-sm ${
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
                      maxLength={63}
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
                          e.target.value,
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
                    className="mt-4 w-full py-2 px-3 bg-linear-to-r from-red-50 to-red-100 text-red-700 rounded-lg hover:from-red-100 hover:to-red-200 transition shadow-sm"
                  >
                    Quitar Educación
                  </button>
                )}
              </div>
            ))}
            {/* Botón para añadir (solo si hay menos de 2) */}
            {educations.length < 3 && (
              <button
                type="button"
                onClick={addEducation}
                className="mt-4 w-full py-2 px-3 bg-linear-to-r from-teal-600 to-teal-500 text-white rounded-lg hover:from-teal-700 hover:to-teal-600 transition shadow-sm"
              >
                Agregar Otra Educación
              </button>
            )}
          </div>
        </section>

        {/* --------------Sección de Idiomas ------------------*/}

        {templatePage !== "classic" && (
          <section className="pt-4 border-t">
            <h3 className="text-xl font-bold text-center text-teal-800 mb-3">
              Idioma
            </h3>

            <div className="flex flex-col gap-5">
              <div>
                <Label htmlFor="primaryLanguage">Idioma Principal</Label>
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
                <Label htmlFor="secundaryLanguage">Idioma Secundario</Label>

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
          </section>
        )}

        {/* ---------------Sección de Referencias ----------------*/}
        {templatePage === "minimalist" && (
          <section className="pt-4 border-t">
            <h3 className="text-xl font-bold text-center text-teal-800 mb-3">
              Referencias Personales
            </h3>

            <div className="space-y-5">
              <div>
                <Label htmlFor="primaryReference">
                  Primera Referencia Personal
                </Label>
                <Input
                  id="primaryReference"
                  name="primaryReference"
                  placeholder="Christian Parisca: 04142961677"
                  value={dataForm.primaryReference}
                  onChange={DataHandleChange}
                  type="text"
                ></Input>
              </div>

              <div>
                <Label htmlFor="secundaryReference">
                  Segunda Referencia Personal
                </Label>
                <Input
                  id="secundaryReference"
                  name="secundaryReference"
                  placeholder="Christian Parisca: 04142961677"
                  value={dataForm.secundaryReference}
                  onChange={DataHandleChange}
                  type="text"
                ></Input>
              </div>
            </div>
          </section>
        )}

        {/* --------------Sección de Experiencia ------------------*/}

        <section className="relative pt-4 border-t">
          <div className="w-full flex justify-center items-center mb-4">
            <h3 className="text-xl font-bold text-center text-teal-800">
              {showModalExperience
                ? "Experiencia Laboral"
                : "Experiencias Personales"}
            </h3>

            <input
              type="checkbox"
              name="hasExperience"
              id="hasExperience"
              onChange={handleExperienceChange}
              className="
                absolute right-1 top-4 h-6 w-6 mr-2.5 
                appearance-none border-2 border-gray-300 rounded
                checked:bg-red-200 checked:border-red-500
                focus:outline-none focus:ring-2 focus:ring-red-800
                transition-all cursor-pointer
                checked:bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg/viewBox=%220%200%2024%2024%22%20fill=%22none%22%20stroke=%22white%22%20stroke-width=%224%22%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22%3E%3Cpath/d=%22M18%206L6%2018M6%206l12%2018%22/%3E%3C/svg%3E')]
                bg-center bg-no-repeat bg-size[:14px_14px]
              "
            />
          </div>
          {showModalExperience == true ? (
            <div className="flex flex-col gap-4">
              {experiences.map((exp, index) => (
                <div
                  key={exp.id}
                  className={`p-5 md:p-6 border border-gray-200 rounded-lg bg-white/50 shadow-sm ${
                    index > 0 ? "mt-4" : ""
                  } `}
                >
                  {experiences.length > 1 && (
                    <h4 className="font-semibold mb-3 text-teal-700">
                      Experiencia #{index + 1}
                    </h4>
                  )}

                  <div>
                    <Label htmlFor="position">Cargo / Puesto</Label>
                    <Input
                      id="position"
                      name="position"
                      type="text"
                      value={exp.position}
                      onChange={(e) => {
                        expHandleInputChange(
                          exp.id,
                          "position",
                          e.target.value,
                        );
                      }}
                      placeholder="Ej: Ingeniero en Sistemas"
                    />
                  </div>

                  <div>
                    <Label htmlFor="company">Empresa</Label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      value={exp.company}
                      onChange={(e) => {
                        expHandleInputChange(exp.id, "company", e.target.value);
                      }}
                      placeholder="Ej: Empana-Tech"
                      autoComplete="organization"
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
                          expHandleInputChange(
                            exp.id,
                            "expFrom",
                            e.target.value,
                          );
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

                  <div className="pt-2">
                    <h4 className="text-md text-center font-semibold text-teal-900 my-4">
                      Logros y Responsabilidades
                    </h4>

                    <div className="flex flex-col gap-5">
                      {/* Tarea o Proyecto Principal */}
                      <div>
                        <Label htmlFor={`responsibility-${exp.id}`}>
                          Tarea/Proyecto Principal
                        </Label>
                        <Textarea
                          id={`responsibility-${exp.id}`}
                          name={`responsibility-${exp.id}`}
                          value={exp.details?.[0] ?? ""}
                          onChange={(e) => {
                            updateExperienceDetail(exp.id, 0, e.target.value);
                          }}
                          placeholder="Ej: Gestioné la infraestructura cloud con Terraform"
                          rows={3}
                          maxLength={220}
                        />
                      </div>

                      {/* Logro Clave (Énfasis en resultados) */}
                      <div>
                        <Label htmlFor={`achievement-${exp.id}`}>
                          Logro Clave
                        </Label>
                        <Textarea
                          id={`achievement-${exp.id}`}
                          name={`achievement-${exp.id}`}
                          value={exp.details?.[1] ?? ""}
                          onChange={(e) => {
                            updateExperienceDetail(exp.id, 1, e.target.value);
                          }}
                          placeholder="Ej: Reduje el tiempo de procesamiento en un 40%"
                          rows={3}
                          maxLength={240}
                        />
                      </div>

                      {/* Habilidades/Tecnologías Clave */}
                      <div>
                        <Label htmlFor={`techSkills-${exp.id}`}>
                          Tecnologías/Habilidades
                        </Label>
                        <Textarea
                          id={`techSkills-${exp.id}`}
                          name={`techSkills-${exp.id}`}
                          value={exp.details?.[2] ?? ""}
                          onChange={(e) => {
                            updateExperienceDetail(exp.id, 2, e.target.value);
                          }}
                          placeholder="Ej: AWS, Python, Docker, GitHub Actions"
                          rows={2}
                          maxLength={200}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Botón para quitar (solo si hay más de 1) */}
                  {experiences.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeExperience(exp.id)}
                      className="mt-4 w-full py-2 px-3 bg-linear-to-r from-red-50 to-red-100 text-red-700 rounded-lg hover:from-red-100 hover:to-red-200 transition shadow-sm"
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
                  className="mt-4 w-full py-2 px-3 bg-linear-to-r from-teal-600 to-teal-500 text-white rounded-lg hover:from-teal-700 hover:to-teal-600 transition shadow-sm"
                >
                  Agregar Otra Experiencia
                </button>
              )}
            </div>
          ) : (
            <div className="flex justify-center items-center flex-col p-4">
              <p className="text-gray-600 italic text-center">
                Has indicado que no tienes experiencia laboral.
              </p>

              <div className="w-full mt-8 border border-gray-200 rounded-xl p-5 shadow-sm bg-white/60 transition duration-300 hover:border-teal-300 hover:shadow-teal-100">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="personalTitle">Actividad</Label>
                    <Input
                      id="personalTitle"
                      name="personalTitle"
                      placeholder="Ej: Emprendimientos, Proyectos Personales, Voluntariados..."
                      type="text"
                      value={dataForm.personalTitle}
                      onChange={DataHandleChange}
                      maxLength={40}
                    />
                  </div>

                  <div>
                    <Label htmlFor="personalRol">Rol</Label>
                    <Input
                      id="personalRol"
                      name="personalRol"
                      placeholder="Ej: Voluntario, Emprendedor, Freelancer..."
                      type="text"
                      value={dataForm.personalRol}
                      onChange={DataHandleChange}
                      maxLength={40}
                    />
                  </div>

                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Label htmlFor={`personalFrom`}>Desde</Label>
                      <Input
                        id="personalFrom"
                        name="personalFrom"
                        type="text"
                        value={dataForm.personalFrom}
                        onChange={DataHandleChange}
                        placeholder="MM/AAAA"
                      />
                    </div>

                    <div className="flex-1">
                      <Label htmlFor={"personalTo"}>Hasta</Label>
                      <Input
                        id="personalTo"
                        name="personalTo"
                        type="text"
                        value={dataForm.personalTo}
                        onChange={DataHandleChange}
                        placeholder="MM/AAAA o presente"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="personalInfo">Información</Label>
                    <Textarea
                      id="personalInfo"
                      name="personalInfo"
                      placeholder="Ej: Christian Parisca"
                      value={dataForm.personalInfo}
                      onChange={DataHandleChange}
                      rows={8}
                      maxLength={500}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* --------------Sección de Tecnologias y Habilidades------------------*/}

        <section className="pt-4 border-t border-gray-200">
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
                    maxLength={30}
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
                    maxLength={135}
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
                    maxLength={30}
                    placeholder="Título (Ej: Cloud - Base de datos)"
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
                    maxLength={135}
                    placeholder="Tecnologías (Ej: AWS (S3, EC2), PostgreSQL, MongoDB, Terraform)"
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
                    maxLength={28}
                    placeholder="Título (Ej: Habilidades blandas)"
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
                    maxLength={135}
                    placeholder="Tecnologías (Ej: Gestión de Proyectos, Comunicación)"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </aside>
  );
}
