import { createContext, useContext, useState, useCallback } from "react";
import type { ChangeEvent } from "react";

interface HandleCheckboxEvent {
  checked: boolean;
  setChecked?: (name: string, value: boolean) => void;
}

interface EducationEntry {
  id: number;
  degree: string;
  institution: string;
  eduFrom: string;
  eduTo: string;
}

interface ExperienceEntry{
  id: number;
  position: string;
  company: string;
  expFrom: string;
  expTo: string;
  details: string[];
}

interface SkillsEntry{
  skillTitle: string ;
  skillDetail: string;
}

interface FormData {
  fullName: string;
  title: string;
  summary: string;
  profileImage: File | null;
  phone: string;
  email: string;
  location: string;
  primaryLanguage: string;
  secundaryLanguage: string;
  // Campos para la variante "sin experiencia laboral" (experiencias personales)
  personalRol?: string;
  personalTitle?: string;
  personalFrom?: string;
  personalTo?: string;
  personalInfo?: string;
  educations: EducationEntry[];
  experiences: ExperienceEntry[];
  skills?: SkillsEntry[];
}

type ArrayTarget = "educations" | "experiences" | "skills" ;

interface FormContextType {
  dataForm: FormData;
  checked: HandleCheckboxEvent;
  setChecked: (checked: HandleCheckboxEvent) => void;
  DataHandleChange: (
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | EducationEntry[]
      | ExperienceEntry[]
      | SkillsEntry[],
    target?: ArrayTarget
  ) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [dataForm, setDataForm] = useState<FormData>({
    fullName: "",
    title: "",
    summary: "",
    profileImage: null,
    phone: "",
    email: "",
    location: "",
    primaryLanguage: "",
    secundaryLanguage: "",
    personalRol: "",
    personalTitle: "",
    personalFrom: "",
    personalTo: "",
    personalInfo: "",
    educations: [],
    experiences: [],
    skills: [],
  });

  const [checked, setChecked] = useState<HandleCheckboxEvent>({ checked: true });

  const DataHandleChange = useCallback(
    (
      e:
        | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        | EducationEntry[]
        | ExperienceEntry[]
        | SkillsEntry[],
      target?: ArrayTarget
    ) => {
      if (Array.isArray(e)) {
        const arr = e as any[];

        if (target) {
          setDataForm((prev) => ({ ...prev, [target]: arr } as FormData));
          return;
        }

        if (arr.length === 0) return; 

        const first = arr[0] as any;

        if (first && Object.prototype.hasOwnProperty.call(first, "degree")) {
          const educs = arr as EducationEntry[];
          setDataForm((prev) => (prev.educations === educs ? prev : { ...prev, educations: educs }));
          return;
        }
        if (first && Object.prototype.hasOwnProperty.call(first, "position")) {
          const exps = arr as ExperienceEntry[];
          setDataForm((prev) => (prev.experiences === exps ? prev : { ...prev, experiences: exps }));
          return;
        }
        if (first && Object.prototype.hasOwnProperty.call(first, "skillTitle")) {
          const sks = arr as SkillsEntry[];
          setDataForm((prev) => (prev.skills === sks ? prev : { ...prev, skills: sks }));
          return;
        }
        return;
      }

      const targetEl = e.target as HTMLInputElement | HTMLTextAreaElement;
      const name = targetEl.name;

      if (targetEl instanceof HTMLInputElement && targetEl.type === "file") {
        const file = (targetEl.files && targetEl.files.length > 0) ? targetEl.files[0] : null;

        if (name === "profileImage") {
          setDataForm((prev) => ({ ...prev, profileImage: file } as FormData));
          return;
        }
        setDataForm((prev) => ({ ...prev, [name]: file } as any));
        return;
      }

      const value = targetEl.value;

      setDataForm((prevData) => {
        const patch: Partial<FormData> = { [name]: value } as Partial<FormData>;
        return { ...prevData, ...patch };
      });
    },
    []
  );

  const contextValue = {
    dataForm,
    DataHandleChange,
    checked,
    setChecked,
  };

  return (
    <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useFormContext debe usarse dentro de un FormProvider");
  }
  return context;
};
