export type ResourceType = "video" | "article" | "tool" | "website" | "interactive" | "podcast";

export interface Resource {
  id: string;
  type: ResourceType;
  title: string;
  url?: string;
  whatIsThis: string;
  setupSteps: string[];
}