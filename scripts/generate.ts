import * as path from "path";
import * as readline from "readline";
import chalk from "chalk";
import ora from "ora";
import * as fs from "fs";
import type {
  StructureType,
  StructureTypes,
  Layers,
  FileNames,
  LayersConfig,
  BaseTemplates,
  TemplateFunction,
  FileOperationType,
  CrudOperations,
  CustomInterfacesConfig,
} from "./types/index";
import gradient from "gradient-string";

const STRUCTURE_TYPES: StructureTypes = {
  FEATURE: "feature",
  ENTITY: "entity",
} as const;

const LAYERS: Layers = {
  UI: "ui",
  MODEL: "model",
  API: "api",
};

const baseTemplates: BaseTemplates = {
  feature: {
    base: {
      "index.ts": (name: string): string => {
        const componentName = `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
        return (
          `export { ${componentName} } from "./ui/${name}";\n` +
          `export { use${componentName} } from "./model/use-${name}";\n` +
          `export type { ${componentName}Props } from "./types";`
        );
      },
      "types/index.ts": (
        name: string,
        fileNames?: FileNames,
        customInterfaces?: CustomInterfacesConfig
      ): string => {
        const componentName = `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
        let types = "";

        const ops = fileNames?.api?.selectedOperations;
        const needsPayload = ops?.create || ops?.update;
        const needsResponse = ops?.read || ops?.create || ops?.update;

        if (customInterfaces?.props) {
          types +=
            `export interface ${componentName}Props {\n` +
            `  className?: string;\n` +
            `}\n\n`;
        }

        if (customInterfaces?.state) {
          types +=
            `export interface ${componentName}State {\n` +
            `  // Define your state here\n` +
            `}\n\n`;
        }

        if (customInterfaces?.hook) {
          types +=
            `export interface ${componentName}Hook {\n` +
            `  // Define your hook return type here\n` +
            `  data?: unknown;\n` +
            `  isLoading?: boolean;\n` +
            `  error?: Error | null;\n` +
            `}\n\n`;
        }

        if (needsPayload) {
          if (ops?.create) {
            types +=
              `export interface Create${componentName}Payload {\n` +
              `  // Define create payload here\n` +
              `}\n\n`;
          }
          if (ops?.update) {
            types +=
              `export interface Update${componentName}Payload {\n` +
              `  // Define update payload here\n` +
              `}\n\n`;
          }
        }

        if (needsResponse) {
          types +=
            `export interface ${componentName}Response {\n` +
            `  // Define API response here\n` +
            `}\n\n`;

          if (ops?.read) {
            types +=
              `export interface ${componentName}ListResponse {\n` +
              `  items: ${componentName}Response[];\n` +
              `  total: number;\n` +
              `}\n`;
          }
        }

        return types;
      },
    },
    [LAYERS.UI]: {
      "ui/index.ts": (name: string): string => {
        const componentName = `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
        return `export { ${componentName} } from "./${name}-ui";`;
      },
      "ui/{{fileName}}-ui.tsx": (
        name: string,
        fileNames?: FileNames,
        customInterfaces?: CustomInterfacesConfig
      ): string => {
        const componentName = `${name.charAt(0).toUpperCase()}${name.slice(1)}`;

        const imports = [
          `"use client";\n`,
          `import { cn } from "@/shared/utils/lib/cn";`,
        ];

        if (customInterfaces?.props) {
          imports.push(
            `import type { ${componentName}Props } from "../types";`
          );
        }

        return (
          `${imports.join("\n")}\n\n` +
          `export const ${componentName} = (${
            customInterfaces?.props
              ? `{ className }: ${componentName}Props`
              : "()"
          }) => {\n` +
          `  return (\n` +
          `    <div className={${
            customInterfaces?.props ? 'cn("", className)' : '""'
          }}>\n` +
          `      ${componentName} Component\n` +
          `    </div>\n` +
          `  );\n` +
          `};`
        );
      },
    },
    [LAYERS.MODEL]: {
      "model/index.ts": (name: string, fileNames?: FileNames): string => {
        const componentName = `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
        const exports = [];
        if (fileNames?.model?.store) {
          exports.push(
            `export { use${componentName}Store } from "./${name}-store";`
          );
        }
        if (fileNames?.model?.hook) {
          exports.push(`export { use${componentName} } from "./use-${name}";`);
        }
        return exports.join("\n");
      },
      "model/{{name}}-store.ts": (
        name: string,
        fileNames?: FileNames,
        customInterfaces?: CustomInterfacesConfig
      ): string => {
        const componentName = `${name.charAt(0).toUpperCase()}${name.slice(1)}`;

        const stateImport = customInterfaces?.state
          ? `import type { ${componentName}State } from "../types";\n\n`
          : "\n";

        return (
          `import { create } from "zustand";\n` +
          stateImport +
          `export const use${componentName}Store = create${
            customInterfaces?.state ? `<${componentName}State>` : ""
          }((set) => ({\n` +
          `  // Define your store methods here\n` +
          `}));`
        );
      },
      "model/use-{{name}}.ts": (
        name: string,
        fileNames?: FileNames,
        customInterfaces?: CustomInterfacesConfig
      ): string => {
        const componentName = `${name.charAt(0).toUpperCase()}${name.slice(1)}`;

        const imports = [
          `import { use${componentName}Store } from "./${name}-store";`,
        ];

        if (customInterfaces?.state) {
          imports.push(
            `import type { ${componentName}State } from "../types";`
          );
        }

        if (customInterfaces?.hook) {
          imports.push(`import type { ${componentName}Hook } from "../types";`);
        }

        return (
          `${imports.join("\n")}\n\n` +
          `export const use${componentName} = (): ${
            customInterfaces?.hook ? `${componentName}Hook` : "void"
          } => {\n` +
          `  // Define your hook logic here\n` +
          `  return ${
            customInterfaces?.hook
              ? "{\n    // Return hook data here\n  }"
              : "undefined"
          };\n` +
          `};`
        );
      },
    },
    [LAYERS.API]: {
      "api/index.ts": (name: string): string => {
        const componentName = `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
        return `export { ${componentName}Api } from "./${name}-api";`;
      },
      "api/{{name}}-api.ts": (name: string, fileNames?: FileNames): string => {
        const componentName = `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
        const route = fileNames?.api?.route || name.toLowerCase();
        const ops = fileNames?.api?.selectedOperations;

        if (!fileNames?.api?.includeCrud || !ops) {
          return (
            `import type { ${componentName}Props } from "../types";\n` +
            `import { apiRequest } from "@/shared/api";\n\n` +
            `export const ${componentName}Api = {\n` +
            `  // Add your custom API methods here\n` +
            `};`
          );
        }

        const needsPayload = ops.create || ops.update;
        const needsResponse = ops.read || ops.create || ops.update;

        let methods = `export const ${componentName}Api = {\n`;

        if (ops.read) {
          methods +=
            `  getAll: async () => {\n` +
            `    const response = await apiRequest.get<${componentName}ListResponse>("/${route}");\n` +
            `    return response.data;\n` +
            `  },\n\n` +
            `  getById: async (id: string) => {\n` +
            `    const response = await apiRequest.get<${componentName}Response>(\`/${route}/\${id}\`);\n` +
            `    return response.data;\n` +
            `  },\n\n`;
        }

        if (ops.create) {
          methods +=
            `  create: async (data: Create${componentName}Payload) => {\n` +
            `    const response = await apiRequest.post<${componentName}Response>("/${route}", data);\n` +
            `    return response.data;\n` +
            `  },\n\n`;
        }

        if (ops.update) {
          methods +=
            `  update: async (id: string, data: Update${componentName}Payload) => {\n` +
            `    const response = await apiRequest.patch<${componentName}Response>(\`/${route}/\${id}\`, data);\n` +
            `    return response.data;\n` +
            `  },\n\n`;
        }

        if (ops.delete) {
          methods +=
            `  delete: async (id: string) => {\n` +
            `    const response = await apiRequest.delete(\`/${route}/\${id}\`);\n` +
            `    return response.data;\n` +
            `  },\n`;
        }

        methods = methods.replace(/,\n$/, "\n");
        methods += `};`;

        let imports = `import type {`;
        const types: string[] = [];

        if (needsPayload) {
          if (ops.create) types.push(`Create${componentName}Payload`);
          if (ops.update) types.push(`Update${componentName}Payload`);
        }

        if (needsResponse) {
          types.push(`${componentName}Response`);
          if (ops.read) types.push(`${componentName}ListResponse`);
        }

        imports += `\n  ${types.join(",\n  ")}\n`;
        imports += `} from "../types";\n`;
        imports += `import { apiRequest } from "@/shared/api";\n\n`;

        return imports + methods;
      },
    },
  },
};

const createReadlineInterface = (): readline.Interface =>
  readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

const askQuestion = (
  rl: readline.Interface,
  question: string,
  defaultValue?: string
): Promise<string> =>
  new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer || defaultValue || "");
    });
  });

const askNumberInRange = async (
  rl: readline.Interface,
  question: string,
  min: number,
  max: number
): Promise<number> => {
  while (true) {
    const answer = await askQuestion(rl, question);
    const num = parseInt(answer);

    if (!isNaN(num) && num >= min && num <= max) {
      return num;
    }

    console.log(
      chalk.red(`❌ Please enter a number between ${min} and ${max}`)
    );
  }
};

const askYesNo = async (
  rl: readline.Interface,
  message: string
): Promise<boolean> => {
  while (true) {
    const answer = await askQuestion(
      rl,
      chalk.blue(`${message} `) + chalk.gray("(y/n): "),
      "n"
    );
    const normalized = answer.toLowerCase();

    if (normalized === "y" || normalized === "n") {
      return normalized === "y";
    }

    console.log(chalk.red("❌ Please enter 'y' or 'n'"));
  }
};

const askConfirmation = async (
  rl: readline.Interface,
  message: string
): Promise<boolean> => {
  return askYesNo(rl, message);
};

const validateName = (name: string): string => {
  if (!name || name.trim().length === 0) {
    throw new Error("Name cannot be empty");
  }
  return name.trim();
};

const checkFeatureExists = (type: StructureType, name: string): boolean => {
  const basePath = path.join(
    type === "feature" ? "./src/features" : "./src/entities",
    name.toLowerCase()
  );
  return fs.existsSync(basePath);
};

const parseCrudOperations = (input: string): CrudOperations => {
  const operations: CrudOperations = {
    create: false,
    read: false,
    update: false,
    delete: false,
  };

  input
    .toLowerCase()
    .split("")
    .forEach((char) => {
      switch (char) {
        case "c":
          operations.create = true;
          break;
        case "r":
          operations.read = true;
          break;
        case "u":
          operations.update = true;
          break;
        case "d":
          operations.delete = true;
          break;
      }
    });

  return operations;
};

const askStructureType = async (
  rl: readline.Interface
): Promise<StructureType> => {
  console.log(chalk.blue("📦 Select structure type:"));
  console.log(chalk.dim("\nAvailable options:"));
  Object.values(STRUCTURE_TYPES).forEach((type, index) => {
    console.log(
      chalk.gray(`  ${index + 1}) ${type} ${type === "feature" ? "🔥" : "📦"}`)
    );
  });

  const answer = await askNumberInRange(
    rl,
    chalk.blue("\n↪ Enter number (1-2): "),
    1,
    2
  );

  const selectedType = Object.values(STRUCTURE_TYPES)[answer - 1];
  return selectedType as StructureType;
};

const getLayersConfig = async (
  rl: readline.Interface,
  type: StructureType,
  name: string
): Promise<LayersConfig> => {
  const layers = {
    ui: false,
    model: false,
    api: false,
  };

  console.log(chalk.yellow("\n🗂  Select layers to generate:"));
  console.log(chalk.dim("Choose which layers you want to include\n"));

  if (type === "feature") {
    layers.ui = await askConfirmation(rl, "🎨 Include UI layer?");
  }
  layers.model = await askConfirmation(rl, "📊 Include Model layer?");
  layers.api = await askConfirmation(rl, "🔌 Include API layer?");

  if (!layers.ui && !layers.model && !layers.api) {
    throw new Error("At least one layer must be selected");
  }

  const fileNames = await getFileNames(rl, type, layers, name);
  return { layers, fileNames };
};

const getFileNames = async (
  rl: readline.Interface,
  type: StructureType,
  layers: LayersConfig["layers"],
  name: string
): Promise<FileNames> => {
  const fileNames: FileNames = {};

  if (layers.ui && type === "feature") {
    console.log(chalk.yellow("\n📝 UI Layer file names:"));
    fileNames.ui = {
      component: await askFileName(rl, name, "ui"),
    };
  }

  if (layers.model) {
    console.log(chalk.yellow("\n📝 Model Layer file names:"));
    fileNames.model = {
      types: await askFileName(rl, name, "types"),
    };

    const includeStore = await askConfirmation(rl, "Include store?");
    if (includeStore) {
      fileNames.model.store = await askFileName(rl, name, "store");
    }

    const includeHook = await askConfirmation(rl, "Include hook?");
    if (includeHook) {
      fileNames.model.hook = await askFileName(rl, name, "hook");
    }
  }

  if (layers.api) {
    console.log(chalk.yellow("\n📝 API Layer configuration:"));

    const includeCrud = await askConfirmation(
      rl,
      "🔧 Include CRUD operations?"
    );

    let route: string | undefined;
    let selectedOperations: CrudOperations | undefined;

    if (includeCrud) {
      console.log(chalk.blue("\n🛠  Select CRUD operations:"));
      console.log(chalk.dim("Available operations:"));
      console.log(chalk.gray("  c - Create 📝"));
      console.log(chalk.gray("  r - Read   📖"));
      console.log(chalk.gray("  u - Update 📤"));
      console.log(chalk.gray("  d - Delete 🗑️ "));

      const crudInput = await askQuestion(
        rl,
        chalk.blue(
          "\n↪ Enter letters for desired operations (e.g., 'crud' or 'cr'): "
        )
      );

      selectedOperations = parseCrudOperations(crudInput);

      const useCustomRoute = await askConfirmation(
        rl,
        "🛣️  Use custom API route?"
      );
      if (useCustomRoute) {
        route = await askQuestion(
          rl,
          chalk.blue("↪ Enter custom route (without leading slash): ")
        );
      }
    }

    fileNames.api = {
      service: await askFileName(rl, name, "api"),
      route: route || name.toLowerCase(),
      includeCrud,
      selectedOperations,
    };
  }

  return fileNames;
};

const askFileName = async (
  rl: readline.Interface,
  name: string,
  type: FileOperationType
): Promise<string> => {
  const defaultName =
    type === "ui"
      ? name
      : type === "store"
      ? `${name}-store`
      : type === "hook"
      ? `use-${name}`
      : type === "api"
      ? `${name}-api`
      : type === "types"
      ? "types"
      : name;

  const option = await askNumberInRange(
    rl,
    chalk.blue(`Choose option for ${type} file name:\n`) +
      chalk.gray(`1) Default name: ${defaultName}\n`) +
      chalk.gray("2) Enter custom name\n") +
      chalk.blue("Enter option (1-2): "),
    1,
    2
  );

  if (option === 1) {
    return defaultName;
  }

  while (true) {
    const customName = await askQuestion(
      rl,
      chalk.blue(`Enter custom name for ${type} file: `)
    );

    if (customName.trim()) {
      return customName;
    }

    console.log(chalk.red("❌ Name cannot be empty"));
  }
};

const generateFiles = async (
  type: StructureType,
  name: string,
  config: LayersConfig,
  customInterfaces: CustomInterfacesConfig
): Promise<void> => {
  const basePath = path.join(
    type === "feature" ? "./src/features" : "./src/entities",
    name.toLowerCase()
  );

  const template = baseTemplates[type];
  if (!template) {
    throw new Error(`Template for type ${type} not found`);
  }

  createStructure(
    basePath,
    template.base,
    name,
    config.fileNames,
    customInterfaces
  );

  if (config.layers.ui && template.ui) {
    createStructure(
      basePath,
      template.ui,
      name,
      config.fileNames,
      customInterfaces
    );
  }
  if (config.layers.model && template.model) {
    createStructure(
      basePath,
      template.model,
      name,
      config.fileNames,
      customInterfaces
    );
  }
  if (config.layers.api && template.api) {
    createStructure(
      basePath,
      template.api,
      name,
      config.fileNames,
      customInterfaces
    );
  }
};

const createStructure = (
  basePath: string,
  template: Record<string, TemplateFunction>,
  name: string,
  fileNames: FileNames,
  customInterfaces: CustomInterfacesConfig
): void => {
  Object.entries(template).forEach(([filePath, contentFn]) => {
    const layer = filePath.split("/")[0] as keyof FileNames;

    if (filePath.includes("store") && !fileNames?.model?.store) return;

    if (filePath.includes("use-") && !fileNames?.model?.hook) return;

    const fileName = filePath.includes("{{fileName}}")
      ? (layer === "ui" && fileNames.ui?.component) ||
        (layer === "model" && fileNames.model?.types) ||
        (layer === "api" && fileNames.api?.service) ||
        name.toLowerCase()
      : name.toLowerCase();

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

    fs.writeFileSync(finalPath, contentFn(name, fileNames, customInterfaces));
  });
};

const printDirectoryStructure = async (
  dir: string,
  prefix: string = ""
): Promise<void> => {
  const files = fs.readdirSync(dir);

  for (const [index, file] of files.entries()) {
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
      await printDirectoryStructure(
        filePath,
        prefix + (isLast ? "    " : "│   ")
      );
    }
  }
};

async function generateStructure(): Promise<void> {
  const rl = createReadlineInterface();
  const spinner = ora();

  try {
    console.log(
      "\n" + gradient.pastel.multiline("🚀 Feature & Entity Generator") + "\n"
    );
    console.log(chalk.dim("✨ Create new features and entities with ease\n"));

    const type = await askStructureType(rl);

    const name = validateName(
      await askQuestion(rl, chalk.blue(" Enter name: "))
    );

    if (checkFeatureExists(type, name)) {
      spinner.fail(
        chalk.red(`❌ ${type} "${name}" already exists! Operation cancelled.`)
      );
      rl.close();
      return;
    }

    const layers = await getLayersConfig(rl, type, name);

    const customInterfaces = await askCustomInterfaces(
      rl,
      layers.layers,
      layers.fileNames
    );

    spinner.start(chalk.blue(`🔨 Creating ${type} structure...`));
    await generateFiles(type, name, layers, customInterfaces);

    spinner.succeed(chalk.green(`✅ ${type} "${name}" successfully created`));

    console.log("\n" + chalk.yellow("📂 Created files structure:"));
    await printDirectoryStructure(
      path.join(
        type === "feature" ? "./src/features" : "./src/entities",
        name.toLowerCase()
      )
    );

    console.log(
      "\n" + gradient.cristal("✨ Generation completed successfully!")
    );
    console.log(chalk.dim("\nHappy coding! 🚀\n"));
  } catch (error: unknown) {
    if (error instanceof Error) {
      spinner.fail(chalk.red(`❌ Error: ${error.message}`));
    } else {
      spinner.fail(chalk.red(`❌ An unknown error occurred`));
    }
  } finally {
    rl.close();
  }
}

generateStructure().catch(console.error);

const askCustomInterfaces = async (
  rl: readline.Interface,
  layers: LayersConfig["layers"],
  fileNames?: FileNames
): Promise<CustomInterfacesConfig> => {
  console.log(chalk.yellow("\n📘 Interface Configuration:"));
  console.log(chalk.dim("Select which interfaces you want to generate\n"));

  const config: CustomInterfacesConfig = {
    props: false,
    state: false,
    hook: false,
  };

  if (layers.ui) {
    config.props = await askConfirmation(
      rl,
      "🎨 Generate Props interface for UI?"
    );
  }

  if (layers.model) {
    if (fileNames?.model?.store) {
      config.state = await askConfirmation(
        rl,
        "📊 Generate State interface for Store?"
      );
    }
    if (fileNames?.model?.hook) {
      config.hook = await askConfirmation(rl, "🎣 Generate Hook interface?");
    }
  }

  return config;
};
