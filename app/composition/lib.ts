import { staticFile as remotionStaticFile } from "remotion";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function staticFile(path: string): string {
  return BASE + remotionStaticFile(path);
}
