import React, { Suspense } from "react";

interface ProfileHeaderProps {
  title: string;
}

const PDFGenerator = React.lazy(() => import("../../pdf/GenerateDocument"));

const PdfContainer: React.FC = () => {
  return (
    <Suspense fallback={<div>Cargando Módulo PDF...</div>}>
      <PDFGenerator />
    </Suspense>
  );
}

export default function ProfileHeader({ title }: ProfileHeaderProps) {
  return (
    <div className="w-full flex flex-row justify-between items-center p-4 border-b border-gray-700 mb-4">
      <h2 className="text-md xl:text-2xl font-semibold pr-6 xl:pr-0">{title}</h2>
      <PdfContainer />
    </div>
  );
}
