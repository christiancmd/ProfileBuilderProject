import { StyleSheet } from "@react-pdf/renderer";

import { Font } from "@react-pdf/renderer";

// Esto desactiva el corte de palabras en todo el documento
Font.registerHyphenationCallback((word) => [word]);

export const MinimalistStyles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    fontFamily: "Helvetica",
  },
  // --- COLUMNA IZQUIERDA (OSCURA) ---
  aside: {
    width: "30%",
    backgroundColor: "#111827",
    color: "#FFFFFF",
    padding: 30,
    height: "100%",
  },
  asideProfileImageWrap: {
    width: 140,
    height: 140,
    borderRadius: 80,
    marginBottom: 10,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "#4B5563",
  },
  asideSectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    borderBottomWidth: 1,
    borderBottomColor: "#FFFFFF",
    paddingBottom: 3,
    marginTop: 25,
    marginBottom: 10,
  },

  asideDegreeText: {
    color: "#FFFFFF",
    fontSize: 11,
    marginBottom: 5,
    lineHeight: 1.4,
    fontWeight: "bold",
  },
  asideText: {
    fontSize: 11,
    marginBottom: 3,
    lineHeight: 1.4,
    color: "#ced0d3",
  },
  asideEducationTitle: {
    fontSize: 9,
    fontWeight: "bold",
    marginTop: 5,
  },

  // --- COLUMNA DERECHA (BLANCA) ---
  main: {
    width: "70%",
    paddingHorizontal: 40,
    paddingVertical: 30,
    paddingTop: 30,
  },
  name: {
    fontSize: 19,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    color: "#111827",
  },
  paragraph: {
    fontSize: 9,
    lineHeight: 1.6,
    color: "#374151",
    marginBottom: 5,
  },
  title: {
    fontSize: 14,
    color: "#4B5563",
    marginTop: 4,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    color: "#111827",
    borderBottomWidth: 1,
    borderBottomColor: "#D1D5DB",
    paddingBottom: 3,
    marginTop: 15,
    marginBottom: 10,
  },
  summary: {
    fontSize: 11,
    color: "#374151",
    lineHeight: 1.6,
    marginBottom: 6,
    textAlign: "left",
  },
  // Experiencia
  entryWrap: {
    marginBottom: 8,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  entryPosition: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#111827",
  },
  entryDates: {
    fontSize: 8,
    color: "#6B7280",
  },
  entryCompany: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 8,
    marginTop: 5,
  },
  entryList: {
    fontSize: 10,
    color: "#4B5563",
    marginLeft: 10,
    marginBottom: 2,
    lineHeight: 1.4,
  },
  // Habilidades
  skillsItemDetail: {
    fontSize: 10,
    color: "#374151",
    marginBottom: 6,
    lineHeight: 1.4,
  },
  bold: {
    fontWeight: "bold",
  },
});

export const ModernStyles = StyleSheet.create({
  page: {
    padding: 48,
    backgroundColor: "#FFFFFF",
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: 800,
    color: "#0f172a",
    letterSpacing: 1.4,
  },
  title: {
    fontSize: 16,
    color: "#4b5563",
    marginTop: 2,
  },
  contactRow: {
    fontSize: 10,
    color: "#454f5d",
    marginTop: 4,
  },
  horizontalRule: {
    borderBottomWidth: 1,
    borderBottomColor: "#E6E9EE",
    marginBottom: 18,
  },
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 12.5,
    fontWeight: 700,
    color: "#2a2f35",
    textTransform: "uppercase",
    letterSpacing: 1.1,
  },
  titleUnderline: {
    borderBottomWidth: 1,
    borderBottomColor: "#E6E9EE",
    marginTop: 6,
    marginBottom: 8,
  },
  twoColumn: {
    flexDirection: "row",
    gap: 32,
  },
  mainCol: {
    flex: 2,
    paddingRight: 8,
  },
  sideCol: {
    flex: 1,
    paddingLeft: 8,
  },
  paragraph: {
    fontSize: 11,
    color: "#374151",
    lineHeight: 1.6,
    marginBottom: 6,
    textAlign: "justify",
  },
  listParagraph: {
    fontSize: 11,
    color: "#374151",
    lineHeight: 1.6,
    marginBottom: 2,
  },
  entryWrap: {
    marginBottom: 2,
    gap: 2,
    paddingBottom: 6,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 600,
    color: "#2f3742",
  },
  jobCompany: {
    fontSize: 10,
    color: "#374151",
    marginBottom: 6,
    lineHeight: 1.4,
    fontWeight: 600,
  },
  instEducation: {
    fontSize: 10,
    marginTop: 4,
    color: "#232831",
    lineHeight: 1.4,
    fontWeight: 500,
  },
  jobDates: {
    fontSize: 9,
    fontWeight: 700,
    color: "#6b7280",
    paddingLeft: 45,
    paddingBottom: 4,
  },
  eduDates: {
    fontSize: 9,
    fontWeight: 700,
    color: "#6b7280",
    paddingBottom: 4,
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 2,
    paddingLeft: 6,
  },
  bullet: {
    width: 10,
    fontSize: 10,
  },
  listText: {
    flex: 1,
    fontSize: 10,
    color: "#3a414b",
    lineHeight: 1.3,
    textAlign: "justify",
  },
  expListText: {
    flex: 1,
    fontSize: 11,
    color: "#3a414b",
    lineHeight: 1.4,
    textAlign: "justify",
  },

  skillsContainer: {
    marginTop: 2,
  },
  sectionBottom: {
    position: "relative",
    marginTop: 20,
  },
});

export const ClassicStyles= StyleSheet.create({
  page: {
    padding: 36,
    backgroundColor: "#FFFFFF",
  },
  header: {
    textAlign: "center",
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 800,
    color: "#0f172a",
    letterSpacing: 1.2,
  },
  title: {
    fontSize: 14,
    color: "#4b5563",
    marginTop: 1,
    marginBottom: 2,
  },
  contactRow: {
    fontSize: 11,
    color: "#6b7280",
    marginTop: 0,
  },
  contactInfo: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },webLink:{
    fontSize: 10,
     color: "#4b5563",
     marginTop: 4 
  },
  horizontalRule: {
    borderBottomWidth: 1,
    borderBottomColor: "#E6E9EE",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: "#2a2f35",
    textTransform: "uppercase",
    letterSpacing: 1.1,
    borderBottomWidth: 1,
    borderBottomColor: "#cdcfd2",
    paddingBottom: 6,
    marginTop: 4,
    marginBottom: 8,
  },
  content: {
    fontSize: 11,
    color: "#374151",
    lineHeight: 1.4,
    marginBottom: 4,
    textAlign: "justify",
  },
  // Experience
  entryWrap: {
    marginBottom: 2,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 600,
    color: "#2f3742",
  },
  jobCompany: {
    fontSize: 10,
    color: "#374151",
    marginBottom: 6,
    lineHeight: 1.4,
    fontWeight: 600,
    marginTop: 4
  },
  jobDates: {
    fontSize: 9,
    color: "#6b7280",
    fontWeight: 700,
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 4,
    paddingLeft: 6,
    paddingRight: 26,
  },
  listText: {
    flex: 1,
    fontSize: 10.5,
    color: "#374151",
    lineHeight: 1.4,
    textAlign: "justify",
  },
  // Education
  eduDegree: {
    fontSize: 11,
    color: "#374151",
    fontWeight: 600,
    marginBottom: 2,
  },
  eduInstitution: {
    fontSize: 10,
    color: "#374151",
    marginBottom: 4,
  },
  eduDates: {
    fontSize: 9,
    color: "#6b7280",
    fontWeight: 700,
  },
  // Skills
  skillsItem: {
    fontSize: 10,
    color: "#374151",
    marginBottom: 4,
    lineHeight: 1.4,
  },
});