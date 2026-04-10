export interface ActionScriptTemplate {
  title?: string;
  text: string;
  buttonLabel?: string;
}

export interface ActionInsightData {
  title?: string;
  tips: string[];
  scriptTemplate?: ActionScriptTemplate;
}

export type CalculatorActionData = Record<string, ActionInsightData>;
