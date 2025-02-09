export interface IContext {
  query: any;
  params: any;
  headers: any;
  body: any;
  session: any;
}

export interface IContextMiddeware {
  headers: any;
}
