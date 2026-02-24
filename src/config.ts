const rawSlug = window.__TENANT_SLUG__ ?? "";
const rawName = window.__TENANT_NAME__ ?? "";

export const TENANT_SLUG: string =
  (rawSlug && !rawSlug.includes("{{") ? rawSlug : "") ||
  (window.location.pathname.match(/^\/t\/([^/]+)/) || [])[1] ||
  "preview";

export let TENANT_NAME =
  rawName && !rawName.includes("{{") ? rawName : "";

export function setTenantName(name: string) {
  TENANT_NAME = name;
}

export const IS_PREVIEW = TENANT_SLUG === "preview";
export const BASE_PATH = `/t/${TENANT_SLUG}`;
