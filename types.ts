export type SiteSetting = {
  url: string;
  timeout?: number;
  expectedStatusCode?: number;
  maxResponseTime?: number;
  interval?:number;
  name?: string;
};
