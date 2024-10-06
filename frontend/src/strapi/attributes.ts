export type StrapiAttributes<T extends { attributes: any }> = {
  [K in keyof T["attributes"]]: T["attributes"][K];
};
