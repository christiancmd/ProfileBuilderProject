import { createContext, useContext, useState } from "react";

interface FormData {
  fullName: string;
  title: string;
  summary: string;
}

interface FormContextType {
  dataForm: FormData;
  DataHandleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

// src/context/FormContext.tsx (Continuación)

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [dataForm, setDataForm] = useState<FormData>({
    fullName: "",
    title: "",
    summary: "",
  });

  const DataHandleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDataForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Objeto de valor que se pasará a los componentes consumidores
  const contextValue = {
    dataForm,
    DataHandleChange,
  };

  return (
    <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
  );
};

// src/context/FormContext.tsx (Continuación)

// 4. Custom Hook para consumir el contexto
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useFormContext debe usarse dentro de un FormProvider");
  }
  return context;
};
