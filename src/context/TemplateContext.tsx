import {createContext, useContext, useState} from 'react';

interface TemplateContextProps {
    children: React.ReactNode
}

interface TemplateContextValue {
  templatePage: string;
  setTemplatePage: React.Dispatch<React.SetStateAction<string>>;
}

const TemplateContext = createContext<TemplateContextValue | undefined>(undefined);

export const TemplateProvider = ({children}:TemplateContextProps) => {
    const [templatePage, setTemplatePage] = useState<string>('modern');

    return(
        <TemplateContext.Provider value={{templatePage, setTemplatePage}}>{children}</TemplateContext.Provider>
    );
}

export const useTemplateContext = () => {3
  const context = useContext(TemplateContext);
  if (context === undefined) {
    throw new Error("useTemplateContext debe usarse dentro de un FormProvider");
  }
  return context;
};
