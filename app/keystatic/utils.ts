import keystaticConfig from "@/keystatic.config";
import { createReader } from "@keystatic/core/reader";

export const Reader = createReader(process.cwd(), keystaticConfig);
