import Label from "./ui/Atoms/Label";
import Button from "./ui/Atoms/Button";
import Textarea from "./ui/Atoms/Textarea";
import Input from "./ui/Atoms/Input";
import { useFormContext } from "../context/FormContext";

//import { useState } from "react";
//import {useForm} from 'react-hook-form';

/*interface PersonalInfo {
  fullname: string;
  title: string;
  summary: string;
  phone: number;
  email: string;
  location: string;
  linkedin: string;
  github: string;
  portfolio: string;
}*/

const PersonalAside: React.FC = () => {

  const { dataForm, DataHandleChange } = useFormContext();

  return (
    <aside className="border rounded-lg p-4 md:col-span-1 order-1 md:order-0 bg-white shadow-lg">
      <h2 className="text-2xl text-gray-700 font-bold text-center border-b pb-4 mb-6 ">
        Información Personal
      </h2>
      <form className="space-y-4">
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
        </div>

        {/* Botón de Guardar/Navegación (Opcional) */}
        <div className="pt-4 text-center">
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Guardar Información Personal
          </Button>
        </div>
      </form>
    </aside>
  );
};

export default PersonalAside;
