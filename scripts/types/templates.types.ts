import type { FileNames } from "./files.types";

export interface CustomInterfacesConfig {
  props: boolean;
  state: boolean;
  hook: boolean;
}

export interface TemplateFunction {
  (
    name: string,
    fileNames?: FileNames,
    customInterfaces?: CustomInterfacesConfig
  ): string;
}

export interface Template {
  base: Record<string, TemplateFunction>;
  ui?: Record<string, TemplateFunction>;
  model?: Record<string, TemplateFunction>;
  api?: Record<string, TemplateFunction>;
}

export interface BaseTemplates {
  feature: Template;
  entity?: Template;
}
