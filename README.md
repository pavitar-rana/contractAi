# 🚀 **contractAi**

---

## 🎯 **Overview**
**Description:** An open-source project built with modern tooling to help developers get started quickly, focusing on AI-powered contract analysis and processing.

---

## ✨ **Features**
*   **AI-Powered Contract Analysis:** Leverage `langchain` and `@xenova/transformers` for intelligent document processing.
*   **PDF Parsing:** Extract and process information from PDF documents using `pdf-parse`.
*   **Azure Blob Storage Integration:** Store and manage documents securely with `@azure/storage-blob`.
*   **Modern Web UI:** Built with `Next.js`, `React`, `Tailwind CSS`, and `Radix UI` for a responsive and intuitive user experience.
*   **Authentication & Authorization:** Secure application with `next-auth` and `prisma` for database management.
*   **Database Integration:** Utilize `Prisma` with `PostgreSQL` (`pg`) for robust data persistence.
*   **Theming:** Dynamic theme switching with `next-themes`.
*   **Animations:** Enhanced user interface with `framer-motion` and `tw-animate-css`.

---

## ⚡ **Installation**
Clone the repository and install dependencies:

```bash
git clone https://github.com/pavitar-rana/contractAi.git
cd contractAi
npm install
```

### 🛠️ **Available Scripts**
```bash
npm run dev   # next dev --turbopack
npm run build   # next build --turbopack
npm run start   # next start
npm run lint   # eslint
```

---

## 🔥 **Tech Stack**
-   **Framework:** `next`, `react`, `react-dom`
-   **UI:** `@headlessui/react`, `@heroicons/react`, `@radix-ui/react-avatar`, `@radix-ui/react-separator`, `@radix-ui/react-slot`, `lucide-react`, `tailwind-merge`, `@tailwindcss/postcss`, `tailwindcss`, `class-variance-authority`, `clsx`, `radix-ui`, `tw-animate-css`, `framer-motion`
-   **Authentication:** `next-auth`, `@auth/prisma-adapter`
-   **AI/ML:** `@langchain/community`, `@langchain/core`, `langchain`, `@xenova/transformers`
-   **Data Persistence:** `@prisma/client`, `prisma`, `pg`
-   **Storage:** `@azure/storage-blob`
-   **Document Processing:** `pdf-parse`
-   **Utilities:** `next-themes`, `uuid`, `lru-cache`
-   **Development Tools:** `@types/react`, `@types/react-dom`, `@types/node`, `@types/pg`, `eslint-config-next`, `@eslint/eslintrc`, `eslint`, `typescript`

---

## 🛠️ **Usage**
Run the project:

```bash
npm start
```

Example usage in code:

```js
// Example of importing a component or utility from contractAi
import { Button } from "@/components/ui/