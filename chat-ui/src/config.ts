const rawSlug = window.__TENANT_SLUG__ ?? "";
const rawName = window.__TENANT_NAME__ ?? "";

export const TENANT_SLUG =
  rawSlug && !rawSlug.includes("{{") ? rawSlug : "preview";

export const TENANT_NAME =
  rawName && !rawName.includes("{{") ? rawName : "Saber Preview";

export const IS_PREVIEW = TENANT_SLUG === "preview";
export const BASE_PATH = `/t/${TENANT_SLUG}`;
