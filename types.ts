export type Key = string;
export type TextResource = {
  key: Key;
  value: string;
  maxLength: number;
  isMultiline: boolean;
};
export type Page = {
  name: string;
  url: string;
  description?: string;
  resources: TextResource[];
};