export type SiteSetting = {
  url: string;
  timeout?: number;
  expectedStatusCode?: number;
  maxResponseTime?: number;
  priority?: number;
  interval?:number;
  name?: string;
};
