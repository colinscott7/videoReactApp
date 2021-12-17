type Resource = "video" | "image" | "pdf";

export interface StateDocument {
  resourceType: Resource;
  resourceUrl: string;
}
