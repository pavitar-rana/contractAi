# 🚀 **contractAi**

---

## 🎯 **Overview**
**Description:** An open-source project built with modern tooling to help developers get started quickly.

---

## ✨ **Features**
*   **AI-Powered Document Processing:** Utilizes `langchain` and `@xenova/transformers` for intelligent contract analysis and understanding.
*   **PDF Parsing:** Extracts content from PDF documents using `pdf-parse` for further processing.
*   **User Authentication:** Secure user management with `next-auth`.
*   **Modern User Interface:** Built with Next.js, Tailwind CSS, Headless UI, and Radix UI for a responsive and intuitive experience.
*   **Database Integration:** Seamless data management with Prisma ORM and PostgreSQL.
*   **Cloud Storage:** Integration with Azure Storage Blob for efficient document storage.
*   **Developer-Friendly:** Designed for quick setup and development with a robust modern tech stack.

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
-   **Framework:** `@headlessui/react`, `@heroicons/react`, `@radix-ui/react-avatar`, `@radix-ui/react-separator`, `@radix-ui/react-slot`, `lucide-react`, `next`, `next-auth`, `next-themes`, `react`, `react-dom`, `@types/react`, `@types/react-dom`, `eslint-config-next`
-   **UI:** `tailwind-merge`, `@tailwindcss/postcss`, `tailwindcss`
-   **BuildTools:** `@eslint/eslintrc`, `eslint`
-   **Testing:** `@langchain/community`, `@langchain/core`, `langchain`
-   **Others:** `@auth/prisma-adapter`, `@azure/storage-blob`, `@prisma/client`, `@xenova/transformers`, `class-variance-authority`, `clsx`, `framer-motion`, `lru-cache`, `pdf-parse`, `pg`, `radix-ui`, `uuid`, `@types/node`, `@types/pg`, `prisma`, `tw-animate-css`, `typescript`

---

## 🛠️ **Usage**
Run the project:

```bash
npm start
```

Example usage in code:

```js
// Example usage (this will vary based on the specific API/components exposed)
import { processContract } from "contractAi/lib/api"; // Hypothetical example

async function analyzeDocument(filePath) {
  const result = await processContract(filePath);
  console.log("Analysis Result:", result);
}

// You might interact with the UI or specific API endpoints
// after running the application.
```

---

## 🤝 **Contributing**
1.  **Fork** the repo 🍴  
2.  **Create** a new branch 🌱  
3.  **Commit** your changes 💡  
4.  **Push** to the branch 🚀  
5.  **Open** a Pull Request 🎯  

👉 See issues here: https://github.com/pavitar-rana/contractAi/issues

---

## 📜 **License**
**MIT**

---

## 🔗 **Links**
-   🌐 **GitHub:** https://github.com/pavitar-rana/contractAi
-   🏠 **Homepage:** Not provided