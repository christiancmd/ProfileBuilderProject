# ProfileBuilder

> Crea, previsualiza y exporta tu curriculum vitae (CV) desde una interfaz moderna.

[![Vite](https://img.shields.io/badge/Vite-%5E7.2.2-brightgreen)](https://vitejs.dev/) [![React](https://img.shields.io/badge/React-%5E18.2.0-61dafb)](https://reactjs.org/) [![TypeScript](https://img.shields.io/badge/TypeScript-~5.9.3-blue)](https://www.typescriptlang.org/) [![react-pdf](https://img.shields.io/badge/react--pdf-%5E4.3.1-red)](https://react-pdf.org/)

---

Descripción
-----------

ProfileBuilder es una solución eficiente diseñada para transformar la creación de CVs en una experiencia ágil e intuitiva. Desarrollada con el ecosistema moderno de React + TypeScript, la aplicación garantiza una gestión de estado robusta y una interfaz tipada que elimina errores en tiempo real. Gracias a Vite, la experiencia de desarrollo y carga es instantánea, permitiendo a los usuarios alternar entre plantillas disponibles y exportar documentos PDF con fidelidad de impresión en segundos. 

Hace algunas semanas tuve la necesidad de actualizar mi currículum para postularme a varias ofertas de trabajo. Aunque actualmente el mercado ofrece varias aplicaciones que proporcionan plantillas y diseños para la elaboración de un currículum vitae, decidí hacer algo diferente y opté por crear una solución propia: ¡crear mi propia app para la generación de currículums en minutos!

Principales objetivos
- Permitir edición guiada de los campos de un CV.
- Generar una versión visual (HTML) y una versión PDF que refleje fielmente la previsualización.
- Mantener los datos en un estado central (`FormContext`) para facilitar la reutilización entre vistas.
- Mejorar Mis habilides como desarrollador y futuro Ingeniero en Sistemas.

Proyecto — ¿qué incluye?
- Formulario dinámico con múltiples entradas (experiencia, educación, skills).
- Previsualización en tres plantillas (`Minimalista` , `Moderno` y `Clasico`).
- Generación de PDF con `@react-pdf/renderer`.

Tecnologías y versiones
-----------------------

| Área | Paquete | Versión |
|---|---:|:---:|
| Bundler / Dev server | `vite` | ^7.2.2 |
| Frontend | `react`, `react-dom` | ^18.2.0 |
| Tipado | `typescript` | ~5.9.3 |
| PDF | `@react-pdf/renderer` | ^4.3.1 |
| Styling | `tailwindcss` | ^4.1.17 |
| Notifications | `react-hot-toast` | ^2.6.0 |
| Icons | `lucide-react` | ^0.562.0 |

Nota: la lista completa y versiones están en `package.json`.

Instalación rápida
------------------

Requisitos:
- Node.js v16+ (recomendado)
- `pnpm` (recomendado) o `npm`

Pasos:

```bash
# clonar
git clone <repo-url>
cd ProfileBuilder

# instalar dependencias
pnpm install

# arrancar en modo desarrollo
pnpm dev

```

La app quedará disponible en `http://localhost:5173`.

Estructura relevante
---------------------

- `src/context/FormContext.tsx` — estado global del formulario (`dataForm`) y handler `DataHandleChange`.
- `src/components/PersonalAside.tsx` — formulario lateral (inputs: nombre, contacto, educación, experiencia, skills, imagen de perfil).
- `src/templates/` — vistas HTML de previsualización (Minimalist / Modern).
- `src/components/pdf/` — generadores y estilos para PDF (`GenerateDocument.tsx`, `DocStyles.ts`).

Buenas prácticas & recomendaciones
---------------------------------

- Revocar `URL.createObjectURL` cuando se genere un preview de imagen para evitar fugas de memoria.
- Evitar sincronizaciones redundantes entre estado local y `FormContext` (comprobar igualdad antes de `setDataForm`) para reducir re-renders.
- Generar el PDF bajo demanda (p. ej. con `pdf(...).toBlob()` al pulsar "Descargar") en lugar de renderizar el `Document` continuamente.

Contribuir
----------

1. Crea una rama: `git checkout -b feature/mi-cambio`
2. Haz tus cambios y test localmente
3. Envía un PR hacia `main`


Contacto
----------

-Email: pariscachristian@gmail.com