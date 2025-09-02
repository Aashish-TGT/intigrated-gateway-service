import fs from "fs";
import path from "path";
import { config } from "../config.js";

export const registry = {};

export async function initRegistry() {
  const dirs = await fs.promises.readdir(config.paths.templatesDir, { withFileTypes: true });
  for (const dir of dirs) {
    if (dir.isDirectory()) {
      const name = dir.name;
      registry[name] = { versions: {}, current: null };
    }
  }
}

export async function ensureTemplate(name, version, file) {
  if (!registry[name]) registry[name] = { versions: {}, current: null };
  registry[name].versions[version] = { path: file };
  if (!registry[name].current) registry[name].current = registry[name].versions[version];
}

export function listTemplates() {
  return Object.keys(registry).map(name => ({
    name,
    versions: Object.keys(registry[name].versions),
    current: registry[name].current
      ? Object.entries(registry[name].versions).find(([v, obj]) => obj === registry[name].current)[0]
      : null
  }));
}

export function setCurrent(name, version) {
  if (!registry[name] || !registry[name].versions[version]) {
    throw new Error(`Template ${name} version ${version} not found`);
  }
  registry[name].current = registry[name].versions[version];
}

export function rollback(name, toVersion) {
  setCurrent(name, toVersion);
}
