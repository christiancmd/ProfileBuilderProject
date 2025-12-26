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
    <div className="w-full flex flex-row justify-between items-center p-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <PdfContainer />
    </div>
  );
}
