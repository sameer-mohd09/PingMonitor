export type SiteSetting = {
  url: string;
  method: string;
  timeout?: number;
  expectedStatusCode?: number;
  maxResponseTime?: number;
  priority?: number;
  outputFileName?: string;
};
