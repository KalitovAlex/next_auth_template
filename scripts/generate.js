import fs from "fs";
import path from "path";
import readline from "readline";
import chalk from "chalk";
import ora from "ora";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const defaultFileNames = {
  ui: {
    component: "component",
    styles: "styles",
  },
  model: {
    store: "store",
    types: "types",
    hook: "use",
  },
  api: {
    service: "api",
  },
};

const baseTemplates = {
  feature: {
    base: {
      "index.ts": () => `export * from './ui';
export * from './model';`,
    },
    ui: {
      "ui/index.ts": (name, fileNames) =>
        `export * from './${fileNames?.component || name.toLowerCase()}';`,
      "ui/{{fileName}}.tsx": (name) => `"use client";

import { cn } from "@/shared/utils/lib/cn";

interface ${name}Props {
  className?: string;
}

export const ${name} = ({ className }: ${name}Props) => {
  return (
    <div className={cn("", className)}>
      ${name} Component
    </div>
  );
};`,
    },
    model: {
      "model/index.ts": (name, fileNames) => {
        const exports = [`export * from './types';`];
        if (fileNames?.store) {
          exports.push(`export * from './${name.toLowerCase()}-store';`);
        }
        if (fileNames?.hook) {
          exports.push(`export * from './use-${name.toLowerCase()}';`);
        }
        return exports.join("\n");
      },
      "model/types/index.ts": () => `export * from './types';`,
      "model/types/types.ts": (name) => `export interface ${name}Props {
  // Define your props here
}

export interface ${name}State {
  // Define your state here
}`,
      "model/{{name}}-store.ts": (name) => `import { create } from 'zustand';
import { ${name}State } from './types/types';

export const use${name}Store = create<${name}State>((set) => ({
  // Define your store methods here
}));`,
      "model/use-{{name}}.ts": (
        name
      ) => `import { use${name}Store } from './${name.toLowerCase()}-store';

export const use${name} = () => {
  // Define your hook logic here
  return {};
};`,
    },
    api: {
      "api/index.ts": (fileNames) =>
        `export * from './${fileNames?.service || "api"}';`,
      "api/{{name}}-api.ts": (
        name
      ) => `import { ${name}Props } from '../model/types/types';
import { apiRequest } from '@/shared/api';

export const ${name.toLowerCase()}Api = {
  getAll: async () => {
    const response = await apiRequest.get<${name}Props[]>('/${name.toLowerCase()}');
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await apiRequest.get<${name}Props>(\`/${name.toLowerCase()}/\${id}\`);
    return response.data;
  },
  
  create: async (data: ${name}Props) => {
    const response = await apiRequest.post<${name}Props>('/${name.toLowerCase()}', data);
    return response.data;
  },
  
  update: async (id: string, data: Partial<${name}Props>) => {
    const response = await apiRequest.patch<${name}Props>(\`/${name.toLowerCase()}/\${id}\`, data);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await apiRequest.delete(\`/${name.toLowerCase()}/\${id}\`);
    return response.data;
  },
};`,
    },
  },
  entity: {
    base: {
      "index.ts": () => `export * from './model';
export * from './api';`,
    },
    model: {
      "model/index.ts": (name) => `export * from './types';
export * from './${name.toLowerCase()}-store';`,
      "model/types.ts": (name) => `export interface ${name} {
  id: string;
  // Define your entity interface here
}

export interface ${name}State {
  // Define your state here
}`,
      "model/{{name}}-store.ts": (name) => `import { create } from 'zustand';
import { ${name}State } from './types';

export const use${name}Store = create<${name}State>((set) => ({
  // Define your store methods here
}));`,
    },
    api: {
      "api/index.ts": () => `export * from './api';`,
      "api/api.ts": (name) => `import { ${name} } from '../model/types';
import { apiRequest } from '@/shared/api';

export const ${name}Api = {
  getAll: async () => {
    const response = await apiRequest.get<${name}[]>('/${name.toLowerCase()}');
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await apiRequest.get<${name}>(\`/${name.toLowerCase()}/\${id}\`);
    return response.data;
  },
  
  create: async (data: ${name}) => {
    const response = await apiRequest.post<${name}>('/${name.toLowerCase()}', data);
    return response.data;
  },
  
  update: async (id: string, data: Partial<${name}>) => {
    const response = await apiRequest.patch<${name}>(\`/${name.toLowerCase()}/\${id}\`, data);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await apiRequest.delete(\`/${name.toLowerCase()}/\${id}\`);
    return response.data;
  },
};`,
    },
  },
};

const askQuestion = (question) => {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
};

const askConfirmation = async (message) => {
  const answer = await askQuestion(
    chalk.blue(`${message} `) + chalk.gray("(y/n): ")
  );
  return answer.toLowerCase() === "y";
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const askFileName = async (defaultName, type) => {
  const options = await askQuestion(
    chalk.blue(`Choose option for ${type} file name:\n`) +
      chalk.gray("1) Use default name: ") +
      chalk.cyan(`${defaultName}\n`) +
      chalk.gray("2) Enter custom name\n") +
      chalk.gray("3) Auto-generate name\n") +
      chalk.blue("Enter option (1-3): ")
  );

  switch (options.trim()) {
    case "1":
      return defaultName;
    case "2":
      const customName = await askQuestion(
        chalk.blue(`Enter custom name for ${type} file: `)
      );
      return customName || defaultName;
    case "3":
      return `${type}-${Math.random().toString(36).substring(2, 7)}`;
    default:
      return defaultName;
  }
};

const getFileNames = async (type, includeUI, includeModel, includeAPI) => {
  const fileNames = {};

  if (includeUI && type === "feature") {
    console.log(chalk.yellow("\n📝 UI Layer file names:"));
    fileNames.ui = {
      component: await askFileName(defaultFileNames.ui.component, "component"),
    };
  }

  if (includeModel) {
    console.log(chalk.yellow("\n📝 Model Layer file names:"));
    fileNames.model = {
      types: await askFileName(defaultFileNames.model.types, "types"),
    };

    // Спрашиваем про store отдельно
    const includeStore = await askConfirmation("Include store?");
    if (includeStore) {
      fileNames.model.store = await askFileName(
        defaultFileNames.model.store,
        "store"
      );
    }

    // Спрашиваем про hook отдельно
    const includeHook = await askConfirmation("Include hook?");
    if (includeHook) {
      fileNames.model.hook = await askFileName(
        defaultFileNames.model.hook,
        "hook"
      );
    }
  }

  if (includeAPI) {
    console.log(chalk.yellow("\n📝 API Layer file names:"));
    fileNames.api = {
      service: await askFileName(defaultFileNames.api.service, "service"),
    };
  }

  return fileNames;
};

async function generateStructure() {
  console.log("\n" + chalk.green.bold("🚀 Feature & Entity Generator") + "\n");

  // Выбор типа структуры
  const type = await askQuestion(
    chalk.blue("What would you like to create?") +
      chalk.gray("\n(feature/entity): ")
  );

  if (!["feature", "entity"].includes(type)) {
    console.log(chalk.red('❌ Invalid type. Please use "feature" or "entity"'));
    rl.close();
    return;
  }

  // Ввод имени
  const name = await askQuestion(chalk.blue("Enter name: "));

  // Выбор компонентов структуры
  console.log(chalk.yellow("\n📁 Select components to generate:"));
  const includeUI =
    type === "feature" ? await askConfirmation("Include UI layer?") : false;
  const includeModel = await askConfirmation("Include Model layer?");
  const includeAPI = await askConfirmation("Include API layer?");

  if (!includeUI && !includeModel && !includeAPI) {
    console.log(chalk.red("❌ Error: At least one layer must be selected"));
    rl.close();
    return;
  }

  // Получаем все имена файлов до начала генерации
  const fileNames = await getFileNames(
    type,
    includeUI,
    includeModel,
    includeAPI
  );

  const basePath = type === "feature" ? "./src/features" : "./src/entities";
  const fullPath = path.join(basePath, name.toLowerCase());

  // Запускаем спиннер только после сбора всех имён
  const spinner = ora({
    text: chalk.blue(`Creating ${type} structure...`),
    color: "blue",
  }).start();

  try {
    await sleep(1000);

    // Создаем структуру
    createStructure(fullPath, baseTemplates[type].base, name, fileNames);

    if (includeUI && baseTemplates[type].ui) {
      createStructure(fullPath, baseTemplates[type].ui, name, fileNames);
    }
    if (includeModel) {
      createStructure(fullPath, baseTemplates[type].model, name, fileNames);
    }
    if (includeAPI) {
      createStructure(fullPath, baseTemplates[type].api, name, fileNames);
    }

    spinner.succeed(
      chalk.green(
        `✨ ${type} "${name}" successfully created at ${chalk.blue(fullPath)}`
      )
    );

    console.log("\n" + chalk.yellow("📂 Created files structure:"));
    printDirectoryStructure(fullPath);

    console.log("\n" + chalk.green("✅ Generation completed successfully!"));
  } catch (error) {
    spinner.fail(chalk.red(`❌ Failed to create ${type}: ${error.message}`));
  }

  rl.close();
}

function createStructure(basePath, template, name, fileNames) {
  Object.entries(template).forEach(([filePath, contentFn]) => {
    const layer = filePath.split("/")[0];

    // Пропускаем создание store файла если он не выбр��н
    if (filePath.includes("store") && !fileNames?.model?.store) {
      return;
    }

    // Пропускаем создание hook файла если он не выбран
    if (filePath.includes("use-") && !fileNames?.model?.hook) {
      return;
    }

    let fileName;
    if (filePath.includes("{{fileName}}")) {
      fileName = fileNames?.[layer]?.component || name.toLowerCase();
    } else {
      fileName = name.toLowerCase();
    }

    const finalPath = path.join(
      basePath,
      filePath
        .replace("{{fileName}}", fileName)
        .replace("{{name}}", name.toLowerCase())
    );

    const directory = path.dirname(finalPath);

    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    const content = contentFn(name, fileNames?.[layer]);
    fs.writeFileSync(finalPath, content);
  });
}

function printDirectoryStructure(dir, prefix = "") {
  const files = fs.readdirSync(dir);

  files.forEach((file, index) => {
    const filePath = path.join(dir, file);
    const isLast = index === files.length - 1;
    const stats = fs.statSync(filePath);
    const isDirectory = stats.isDirectory();

    const fileIcon = isDirectory ? "📁" : "📄";
    const fileName = isDirectory ? chalk.magenta(file) : chalk.cyan(file);

    console.log(
      prefix + (isLast ? "└── " : "├── ") + `${fileIcon} ${fileName}`
    );

    if (isDirectory) {
      printDirectoryStructure(filePath, prefix + (isLast ? "    " : "│   "));
    }
  });
}

generateStructure();
