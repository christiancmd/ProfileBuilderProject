import {
  Page,
  Text,
  View,
  Document,
  PDFDownloadLink,
  Image,
  //PDFViewer,
} from "@react-pdf/renderer";
import { MinimalistStyles, ModernStyles } from "./DocStyles";
import { useTemplateContext } from "../../context/TemplateContext";
import Button from "../ui/Atoms/Button";
import { useFormContext } from "../../context/FormContext";
import React, { useEffect, useState, useMemo } from "react";
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
  educations: EducationEntry[];
  experiences: ExperienceEntry[];
  skills?: SkillsEntry[];
}

const ModernDocument = React.memo(({ data }: { data: FormData }) => {
  const {
    fullName,
    title,
    summary,
    phone,
    email,
    location,
    educations,
    experiences,
    skills,
    primaryLanguage,
    secundaryLanguage,
  } = data;

  return (
    <Document>
      <Page size="A4" style={ModernStyles.page}>
        {/* HEADER */}
        <View style={ModernStyles.header}>
          <Text style={ModernStyles.name}>
            {fullName?.toUpperCase() || "NOMBRE APELLIDO"}
          </Text>
          <Text style={ModernStyles.title}>
            {title || "Título Profesional"}
          </Text>
          <Text style={ModernStyles.contactRow}>
            {location || "Localidad"} • {email || "correo@ejemplo.com"} •{" "}
            {phone || "Teléfono"}
          </Text>
        </View>

        {/* PERFIL PROFESIONAL */}
        <View style={ModernStyles.section}>
          <Text style={ModernStyles.sectionTitle}>Perfil Profesional</Text>
          <View style={ModernStyles.titleUnderline} />
          <Text style={ModernStyles.paragraph}>
            {summary || "Sin perfil profesional"}
          </Text>
        </View>

        {/* CONTENIDO EN COLUMNAS (Experiencia vs Educación/Idiomas) */}
        <View style={ModernStyles.twoColumn}>
          {/* COLUMNA IZQUIERDA: EXPERIENCIA */}
          <View style={ModernStyles.mainCol}>
            <Text style={ModernStyles.sectionTitle}>Experiencia Laboral</Text>
            <View style={ModernStyles.titleUnderline} />

            {experiences?.map((exp) => (
              <View key={exp.id} style={ModernStyles.entryWrap}>
                <View style={ModernStyles.entryHeader}>
                  <Text style={ModernStyles.jobTitle}>
                    {exp.position || "Posición no especificada"}
                  </Text>
                  <Text style={ModernStyles.jobDates}>
                    {exp.expFrom} - {exp.expTo ? "Presente" : exp.expTo}
                  </Text>
                </View>

                <Text style={ModernStyles.jobCompany}>{exp.company}</Text>

                {exp.details &&
                  exp.details.map((details, i) =>
                    details ? (
                      <View key={i} style={ModernStyles.listItem}>
                        <Text style={ModernStyles.listText}>
                          • {details || "Detalle no especificado"}
                        </Text>
                      </View>
                    ) : null
                  )}
              </View>
            ))}
          </View>

          {/* COLUMNA DERECHA: EDUCACIÓN E IDIOMAS */}
          <View style={ModernStyles.sideCol}>
            <Text style={ModernStyles.sectionTitle}>Educación</Text>
            <View style={ModernStyles.titleUnderline} />
            {educations?.map((edu) => (
              <View key={edu.id} style={ModernStyles.entryWrap}>
                <Text style={ModernStyles.jobTitle}>
                  {edu.degree || "Grado no especificado"}
                </Text>
                <Text style={ModernStyles.instEducation}>
                  {edu.institution || "Institución no especificada"}
                </Text>
                <Text style={ModernStyles.eduDates}>
                  {edu.eduFrom} - {edu.eduTo}
                </Text>
              </View>
            ))}

            <Text style={[ModernStyles.sectionTitle, { marginTop: 15 }]}>
              Idiomas
            </Text>
            <View style={ModernStyles.titleUnderline} />
            <Text style={ModernStyles.listParagraph}>
              {primaryLanguage || "Idiomas no especificados"}
            </Text>
            <Text style={ModernStyles.listParagraph}>
              {secundaryLanguage || "Idiomas no especificados"}
            </Text>
          </View>
        </View>

        <View style={ModernStyles.sectionBottom} wrap={false}>
          <Text style={ModernStyles.sectionTitle}>
            Tecnologías & Habilidades
          </Text>
          <View style={ModernStyles.titleUnderline} />

          <View style={ModernStyles.skillsContainer}>
            {skills?.map((s, i) => (
              <Text key={i} style={ModernStyles.listParagraph}>
                <Text style={{ fontWeight: "bold" }}>
                  {s.skillTitle || "Habilidades y Tech"}:{" "}
                </Text>
                {s.skillDetail}
              </Text>
            ))}

            {!skills ||
              (skills.length === 0 && (
                <Text style={ModernStyles.listParagraph}>
                  No hay tecnologías o habilidades añadidas.
                </Text>
              ))}
          </View>
        </View>
      </Page>
    </Document>
  );
});

const MinimalistDocument = React.memo(({ data }: { data: FormData }) => {
  const styles = MinimalistStyles;
  const {
    fullName,
    title,
    summary,
    phone,
    email,
    location,
    educations,
    experiences,
    skills,
    profileImage,
    primaryLanguage,
    secundaryLanguage,
  } = data;

  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (profileImage) {
      const toBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

      toBase64(profileImage).then(setImageSrc);
    }
  }, [profileImage]);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.aside}>
            {imageSrc && (
              <Image src={imageSrc} style={styles.asideProfileImageWrap} />
            )}
            <View>
              <Text style={styles.asideSectionTitle}>Contacto</Text>
              <Text style={styles.asideText}>+{phone || "Teléfono"}</Text>
              <Text style={styles.asideText}>
                {email || " correo@ejemplo.com"}
              </Text>
              <Text style={styles.asideText}>{location || "Localidad"}</Text>
            </View>

            <View>
              <Text style={styles.asideSectionTitle}>Educación</Text>
              {educations && educations.length > 0 ? (
                educations.map((edu) => (
                  <View key={edu.id} style={{ marginBottom: 15 }}>
                    <Text style={styles.asideDegreeText}>
                      {edu.degree || "Grado no especificado"}
                    </Text>
                    <Text style={styles.asideText}>
                      {edu.institution || "Institución no especificada"}
                    </Text>
                    <Text style={styles.asideText}>
                      {(edu.eduFrom || "") + (` - ${edu.eduTo}` || "")}
                    </Text>
                  </View>
                ))
              ) : (
                <Text style={styles.asideText}>No hay educación añadida.</Text>
              )}
            </View>

            <View>
              <Text style={styles.asideSectionTitle}>Idiomas</Text>
              <Text style={styles.asideText}>
                {primaryLanguage || "Idiomas no especificados"}
              </Text>
              <Text style={styles.asideText}>
                {secundaryLanguage || "Idiomas no especificados"}
              </Text>
            </View>
          </View>

          <View style={styles.main}>
            <Text style={styles.name}>{fullName || "Nombre Apellido"}</Text>
            <Text style={styles.title}>
              {title || "Titulo no especificado"}
            </Text>

            <Text style={styles.sectionTitle}>Perfil Profesional</Text>
            <Text style={styles.summary}>
              {summary || "Resumen no proporcionado."}
            </Text>

            <Text style={styles.sectionTitle}>Experiencia</Text>
            {experiences && experiences.length > 0 ? (
              experiences.map((exp) => (
                <View key={exp.id} style={styles.entryWrap}>
                  <View style={styles.entryHeader}>
                    <Text style={styles.entryPosition}>
                      {exp.position || "Posición no especificada"}
                    </Text>
                    <Text style={styles.entryDates}>
                      {(exp.expFrom || "") +
                        (exp.expTo ? ` - ${exp.expTo}` : "")}
                    </Text>
                  </View>
                  <Text style={styles.entryCompany}>
                    {exp.company || "Empresa no especificada"}
                  </Text>
                  {exp.details &&
                    exp.details.map((details, i) =>
                      details ? (
                        <Text key={i} style={styles.entryList}>
                          • {details || "Detalle no especificado"}
                        </Text>
                      ) : null
                    )}
                </View>
              ))
            ) : (
              <Text style={styles.paragraph}>No hay experiencia.</Text>
            )}

            <Text style={styles.sectionTitle}>Tecnologías & Habilidades</Text>
            {skills && skills.length > 0
              ? skills.map((skill, i) => (
                  <Text key={i} style={styles.skillsItemDetail}>
                    <Text style={{ fontWeight: "bold" }}>
                      {skill.skillTitle || "Habilidad no especificada"}:{" "}
                    </Text>
                    {skill.skillDetail || "Detalle no especificado"}
                  </Text>
                ))
              : "No hay tecnologías o habilidades añadidas."}

            {!skills ||
              (skills.length === 0 && (
                <Text style={styles.paragraph}>
                  No hay tecnologías o habilidades añadidas.
                </Text>
              ))}
          </View>
        </View>
      </Page>
    </Document>
  );
});

export default function GenerateDocument() {
  const { templatePage } = useTemplateContext();
  const { dataForm } = useFormContext();

  const data = useMemo(() => dataForm, [dataForm]); // si dataForm cambia de referencia con frecuencia
  return (
    <div>
      {templatePage && templatePage === "modern" && (
        <PDFDownloadLink
          document={<ModernDocument data={data} />}
          fileName="curriculum.pdf"
        >
          <Button
            type="button"
            className="font-normal border rounded-lg py-2.5 px-6 text-white bg-teal-800 hover:border-teal-950 hover:text-teal-950 hover:bg-teal-100"
          >
            Descargar CV
          </Button>
        </PDFDownloadLink>
      )}

      {templatePage && templatePage === "minimalist" && (
        <PDFDownloadLink
          document={<MinimalistDocument data={data} />}
          fileName="curriculum.pdf"
        >
          <Button
            type="button"
            className="font-normal border rounded-lg py-2.5 px-6 text-white bg-teal-800 hover:border-teal-950 hover:text-teal-950 hover:bg-teal-100"
          >
            Descargar CV
          </Button>
        </PDFDownloadLink>
      )}

      {/* <PDFViewer style={{ width: "900px", height: "90vh" }}>
        <ModernDocument data={dataForm} />
      </PDFViewer> */}
    </div>
  );
}
