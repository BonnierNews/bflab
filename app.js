/* eslint-disable n/no-process-exit */
/* eslint-disable no-console */
import { fileURLToPath } from "url";
import { readFileSync } from "fs";

/**
 * @param {string} program
 * @param {import("stream").Readable} input
 * @param {import("stream").Writable} output
 * @returns {Promise<void>}
 */
export function run(program, input, output) {
  throw new Error("Not implemented");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const fname = process.argv[2];
  if (!fname) {
    console.error("Usage: node app.js <filename>");
    process.exit(1);
  }

  try {
    await run(readFileSync(process.argv[2]).toString(), process.stdin, process.stdout);
    process.exit(0);
  } catch (e) {
    if (e.code === "ENOENT") {
      console.error(`File not found: ${fname}`);
      process.exit(1);
    }
    console.error(e);
    process.exit(1);
  }
}
