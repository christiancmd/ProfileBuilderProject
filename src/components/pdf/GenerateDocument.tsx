import {
  Page,
  Text,
  View,
  Document,
  PDFDownloadLink,
  Image,
  Svg,
  Path,
  Rect,
  Circle,
  //PDFViewer,
} from "@react-pdf/renderer";
import { MinimalistStyles, ModernStyles, ClassicStyles } from "./DocStyles";
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
  profileImage?: File | null;
  webLink?: string;
  phone: string;
  email: string;
  location: string;
  primaryLanguage: string;
  secundaryLanguage: string;
  //
  primaryReference?: string;
  secundaryReference?: string;

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

const ModernDocument = React.memo(
  ({ data, expValid }: { data: FormData; expValid: boolean }) => {
    const styles = ModernStyles;
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
      personalTitle,
      personalRol,
      personalFrom,
      personalTo,
      personalInfo,
      primaryLanguage,
      secundaryLanguage,
    } = data;

    return (
      <Document>
        <Page size="A4" style={styles.page}>
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.name}>
              {fullName?.toUpperCase() || "NOMBRE APELLIDO"}
            </Text>
            <Text style={styles.title}>{title || "Título Profesional"}</Text>
            <Text style={styles.contactRow}>
              {location || "Localidad"} • {email || "correo@ejemplo.com"} •{" "}
              {phone || "Teléfono"}
            </Text>
          </View>

          {/* PERFIL PROFESIONAL */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Perfil Profesional</Text>
            <View style={styles.titleUnderline} />
            <Text style={styles.paragraph}>
              {(summary || "Resumen no proporcionado.")
                .toString()
                .replace(/\r?\n|\r/g, " ")}
            </Text>
          </View>

          {/* CONTENIDO EN COLUMNAS (Experiencia vs Educación/Idiomas) */}
          <View style={styles.twoColumn}>
            {/* COLUMNA IZQUIERDA: EXPERIENCIA */}
            <View style={styles.mainCol}>
              {expValid && experiences && experiences.length > 0 ? (
                <View>
                  <Text style={styles.sectionTitle}>Experiencia Laboral</Text>
                  <View style={styles.titleUnderline} />

                  {experiences?.map((exp) => (
                    <View key={exp.id} style={styles.entryWrap}>
                      <View style={styles.entryHeader}>
                        <Text style={styles.jobTitle}>
                          {exp.position || "Posición no especificada"}
                        </Text>
                        <Text style={styles.jobDates}>
                          {exp.expFrom} - {exp.expTo ? "Presente" : exp.expTo}
                        </Text>
                      </View>

                      <Text style={styles.jobCompany}>{exp.company}</Text>

                      {exp.details &&
                        exp.details.map((details, i) =>
                          details ? (
                            <View key={i} style={styles.listItem}>
                              <Text style={styles.listText}>
                                •
                                {(details || "Detalle no proporcionado.")
                                  .toString()
                                  .replace(/\r?\n|\r/g, " ")}
                              </Text>
                            </View>
                          ) : null,
                        )}
                    </View>
                  ))}
                </View>
              ) : (
                <View>
                  <Text style={styles.sectionTitle}>Experiencia Personal</Text>
                  <View style={styles.titleUnderline} />

                  <View style={styles.entryWrap}>
                    <View style={styles.entryHeader}>
                      <Text style={styles.jobTitle}>
                        {personalTitle || "Posición no especificada"}
                      </Text>
                      <Text style={styles.jobDates}>
                        {personalFrom} - {personalTo ? "Presente" : personalTo}
                      </Text>
                    </View>

                    <Text style={styles.jobCompany}>{personalRol}</Text>

                    <View style={styles.listItem}>
                      <Text style={styles.expListText}>
                        •{" "}
                        {(personalInfo || "Detalle no especificado")
                          .toString()
                          .replace(/\r?\n|\r/g, " ")}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            </View>

            {/* COLUMNA DERECHA: EDUCACIÓN E IDIOMAS */}
            <View style={styles.sideCol}>
              <Text style={styles.sectionTitle}>Educación</Text>
              <View style={styles.titleUnderline} />
              {educations?.map((edu) => (
                <View key={edu.id} style={styles.entryWrap}>
                  <Text style={styles.jobTitle}>
                    {edu.degree || "Grado no especificado"}
                  </Text>
                  <Text style={styles.instEducation}>
                    {edu.institution || "Institución no especificada"}
                  </Text>
                  <Text style={styles.eduDates}>
                    {edu.eduFrom} - {edu.eduTo}
                  </Text>
                </View>
              ))}

              <Text style={[styles.sectionTitle, { marginTop: 2 }]}>
                Idiomas
              </Text>
              <View style={styles.titleUnderline} />
              <View>
                <Text style={styles.listParagraph}>
                  {primaryLanguage || "Idiomas no especificados"}
                </Text>
                <Text style={styles.listParagraph}>
                  {secundaryLanguage || "Idiomas no especificados"}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.sectionBottom} wrap={false}>
            <Text style={styles.sectionTitle}>Tecnologías & Habilidades</Text>
            <View style={styles.titleUnderline} />

            <View style={styles.skillsContainer}>
              {skills?.map((s, i) => (
                <Text key={i} style={styles.listParagraph}>
                  <Text style={{ fontWeight: "bold" }}>
                    {s.skillTitle || "Habilidades y Tech"}:{" "}
                  </Text>
                  {s.skillDetail}
                </Text>
              ))}

              {!skills ||
                (skills.length === 0 && (
                  <Text style={styles.listParagraph}>
                    No hay tecnologías o habilidades añadidas.
                  </Text>
                ))}
            </View>
          </View>
        </Page>
      </Document>
    );
  },
);

const PhoneIcon = () => (
  <Svg width="12" height="12" viewBox="0 0 24 24" style={{ marginRight: 5, marginBottom: 6 }}>
    <Path
      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
      stroke="white"
      strokeWidth="2"
      fill="none"
    />
  </Svg>
);

const MailIcon = () => (
  <Svg width="10" height="10" viewBox="0 0 24 24" style={{ marginRight: 5, marginBottom: 6 }}>
    <Rect
      x="2"
      y="4"
      width="20"
      height="16"
      rx="2"
      stroke="white"
      strokeWidth="2"
      fill="none"
    />
    <Path
      d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
      stroke="white"
      strokeWidth="2"
      fill="none"
    />
  </Svg>
);

const MapPinIcon = () => (
  <Svg width="10" height="10" viewBox="0 0 24 24" style={{ marginRight: 5, marginBottom: 6 }}>
    <Path
      d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"
      stroke="white"
      strokeWidth="2"
      fill="none"
    />
    <Circle cx="12" cy="10" r="3" stroke="white" strokeWidth="2" fill="none" />
  </Svg>
);

const MinimalistDocument = React.memo(
  ({ data, expValid }: { data: FormData; expValid: boolean }) => {
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
      primaryReference,
      secundaryReference,
      personalTitle,
      personalRol,
      personalFrom,
      personalTo,
      personalInfo,
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

                {/* Teléfono */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 4,
                  }}
                >
                  <PhoneIcon />
                  <Text style={styles.asideText}>{phone || "Teléfono"}</Text>
                </View>

                {/* Email */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 4,
                  }}
                >
                  <MailIcon />
                  <Text style={styles.asideText}>
                    {email || "correo@ejemplo.com"}
                  </Text>
                </View>

                {/* Ubicación */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 4,
                  }}
                >
                  <MapPinIcon />
                  <Text style={styles.asideText}>
                    {location || "Localidad"}
                  </Text>
                </View>
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
                        {(edu.eduFrom || "") + " - " + (edu.eduTo || "")}
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.asideText}>
                    No hay educación añadida.
                  </Text>
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

              <View>
                <Text style={styles.asideSectionTitle}>Referencias</Text>
                <Text style={[styles.asideText, {paddingRight: 30, paddingTop: 5}]}>
                  - {primaryReference || "Referencia no especificada"}
                </Text>
                <Text style={[styles.asideText, {paddingRight: 30, paddingTop: 5}]}>
                  - {secundaryReference || "Referencia no especificada"}
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
                {(summary || "Resumen no proporcionado.")
                  .toString()
                  .replace(/\r?\n|\r/g, " ")}
              </Text>

              {expValid && experiences && experiences.length > 0 ? (
                <View>
                  <Text style={styles.sectionTitle}>Experiencia Laboral</Text>
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
                                •{" "}
                                {(details || "Detalle no proporcionado.")
                                  .toString()
                                  .replace(/\r?\n|\r/g, " ")}
                              </Text>
                            ) : null,
                          )}
                      </View>
                    ))
                  ) : (
                    <Text style={styles.paragraph}>No hay experiencia.</Text>
                  )}
                </View>
              ) : (
                <View>
                  <Text style={styles.sectionTitle}>Experiencia Personal</Text>

                  <View style={styles.entryWrap}>
                    <View style={styles.entryHeader}>
                      <Text style={styles.entryPosition}>
                        {personalTitle || "Posición no especificada"}
                      </Text>
                      <Text style={styles.entryDates}>
                        {personalFrom} - {personalTo ? "Presente" : personalTo}
                      </Text>
                    </View>

                    <Text style={styles.entryCompany}>{personalRol}</Text>

                    <Text style={styles.entryList}>
                      •{" "}
                      {(personalInfo || "Detalle no especificado")
                        .toString()
                        .replace(/\r?\n|\r/g, " ")}
                    </Text>
                  </View>
                </View>
              )}

              <View>
                <Text style={styles.sectionTitle}>
                  Tecnologías & Habilidades
                </Text>
                {skills && skills.length > 0 ? (
                  skills.map((skill, i) => (
                    <Text key={i} style={styles.skillsItemDetail}>
                      <Text style={{ fontWeight: "bold" }}>
                        {skill.skillTitle || "Habilidad no especificada"}:{" "}
                      </Text>
                      {skill.skillDetail || "Detalle no especificado"}
                    </Text>
                  ))
                ) : (
                  <Text style={styles.paragraph}>
                    No hay tecnologías o habilidades añadidas.
                  </Text>
                )}

                {!skills ||
                  (skills.length === 0 && (
                    <Text style={styles.paragraph}>
                      No hay tecnologías o habilidades añadidas.
                    </Text>
                  ))}
              </View>
            </View>
          </View>
        </Page>
      </Document>
    );
  },
);

const ClassicDocument = React.memo(
  ({ data, expValid }: { data: FormData; expValid: boolean }) => {
    const styles = ClassicStyles;

    const {
      fullName,
      title,
      summary,
      phone,
      email,
      location,
      webLink,
      educations,
      experiences,
      personalFrom,
      personalInfo,
      personalRol,
      personalTitle,
      personalTo,
      skills,
    } = data;

    return (
      <Document>
        <Page size="A4" style={styles.page}>
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.name}>
              {fullName?.toUpperCase() || "NOMBRE APELLIDO"}
            </Text>
            <Text style={styles.title}>{title || "Título Profesional"}</Text>
            <Text style={styles.contactRow}>
              {location || "Localidad  "} • {email || "correo@ejemplo.com  "} •{" "}
              {phone || "Teléfono"}
            </Text>
            {webLink && <Text style={styles.webLink}>{webLink}</Text>}
          </View>

          {/* PERFIL PROFESIONAL */}
          <View>
            <Text style={styles.sectionTitle}>Perfil Profesional</Text>
            <Text style={styles.content}>
              {" "}
              {(summary || "Resumen no proporcionado.")
                .toString()
                .replace(/\r?\n|\r/g, " ")}
            </Text>
          </View>

          {/* EXPERIENCIA LABORAL */}
          <View>
            <Text style={styles.sectionTitle}>Experiencia Laboral</Text>

            {expValid && experiences && experiences.length > 0 ? (
              experiences.map((exp) => (
                <View key={exp.id} style={styles.entryWrap}>
                  <View style={styles.entryHeader}>
                    <Text style={styles.jobTitle}>
                      {exp.position || "Posición no especificada"}
                    </Text>
                    <Text style={styles.jobDates}>
                      {(exp.expFrom || "") +
                        (exp.expTo ? ` - ${exp.expTo}` : "")}
                    </Text>
                  </View>

                  <Text style={styles.jobCompany}>
                    {exp.company || "Empresa no especificada"}
                  </Text>

                  {exp.details && (
                    <View>
                      {exp.details.map((detail, index) =>
                        detail ? (
                          <View key={index} style={styles.listItem}>
                            <Text style={styles.listText}>
                              •{" "}
                              {(detail || "Detalle no proporcionado.")
                                .toString()
                                .replace(/\r?\n|\r/g, " ")}
                            </Text>
                          </View>
                        ) : null,
                      )}
                    </View>
                  )}
                </View>
              ))
            ) : (
              <View style={styles.entryWrap}>
                <View style={styles.entryHeader}>
                  <Text style={styles.jobTitle}>
                    {personalTitle || "Posición no especificada"}
                  </Text>
                  <Text style={styles.jobDates}>
                    {(personalFrom || "") +
                      (personalTo ? ` - ${personalTo}` : "")}
                  </Text>
                </View>
                <Text style={styles.jobCompany}>{personalRol}</Text>
                <View style={styles.listItem}>
                  <Text style={styles.listText}>
                    •{" "}
                    {(personalInfo || "Información no proporcionada")
                      .toString()
                      .replace(/\r?\n|\r/g, " ")}
                  </Text>
                </View>
              </View>
            )}
          </View>

          {/* EDUCACIÓN */}
          <View>
            <Text style={styles.sectionTitle}>Estudios y Cursos</Text>
            {educations && educations.length > 0 ? (
              educations.map((edu) => (
                <View key={edu.id} style={{ marginBottom: 2 }}>
                  <View style={styles.entryHeader}>
                    <Text style={styles.eduDegree}>
                      {edu.degree || "Grado no especificado"}
                    </Text>
                    <Text style={styles.eduDates}>
                      {(edu.eduFrom || "") +
                        (edu.eduTo ? ` - ${edu.eduTo}` : "")}
                    </Text>
                  </View>
                  <Text style={styles.eduInstitution}>
                    {edu.institution || "Institución no especificada"}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={styles.content}>No hay educación añadida.</Text>
            )}
          </View>

          {/* INFORMACIÓN ADICIONAL */}
          <View style={{ marginTop: 4 }}>
            <Text style={styles.sectionTitle}>Información Adicional</Text>
            {skills && skills.length > 0 ? (
              skills.map((s, i) => (
                <Text key={i} style={styles.skillsItem}>
                  • <Text style={{ fontWeight: "bold" }}>{s.skillTitle}:</Text>{" "}
                  {s.skillDetail}
                </Text>
              ))
            ) : (
              <Text style={styles.content}>
                No hay tecnologías o habilidades añadidas.
              </Text>
            )}
          </View>
        </Page>
      </Document>
    );
  },
);

const TEMPLATE_DOCUMENTS = {
  modern: ModernDocument,
  minimalist: MinimalistDocument,
  classic: ClassicDocument,
};

// Extraemos los nombres válidos automáticamente para TypeScript
type TemplateName = keyof typeof TEMPLATE_DOCUMENTS;

export default function GenerateDocument() {
  const { templatePage } = useTemplateContext();
  const { dataForm, checked } = useFormContext();
  const { fullName } = dataForm;

  const data = useMemo(() => dataForm, [dataForm]); // si dataForm cambia de referencia con frecuencia

  //Dictionary Pattern
  const SelectedDocument = TEMPLATE_DOCUMENTS[templatePage as TemplateName];

  return (
    <div>
      <PDFDownloadLink
        document={<SelectedDocument data={data} expValid={checked.checked} />}
        fileName={`curriculum_${fullName}.pdf`}
      >
        <Button
          type="button"
          className="text-sm xl:text-lg font-normal border rounded-lg py-2.5 px-6 xl:px-10 text-white bg-teal-800 hover:border-teal-950 hover:text-teal-950 hover:bg-teal-100"
        >
          Descargar
        </Button>
      </PDFDownloadLink>

      {/* <PDFViewer style={{ width: "900px", height: "90vh" }}>
        <MinimalistDocument data={dataForm} expValid={checked.checked} />
      </PDFViewer> */}
    </div>
  );
}
