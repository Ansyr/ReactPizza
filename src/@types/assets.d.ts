declare module "*.svg" {
  const content: any;
  export default content;
}

declare module "*.png" {
  const content: any;
  export default content;
}
declare module "*.scss" {
  const content: any;
  export default content;
}

type OptionalRecord<K extends keyof any, T> = {
  [P in K]?: T;
};
