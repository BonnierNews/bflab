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
export async function run(program, input, output) {
  const cells = new Uint8Array(1000);
  let cellPointer = 0;

  const chunks = [];
  for await (const chunk of input) {
    chunks.push(chunk);
  }
  let unprocessedInput = Buffer.concat(chunks).toString();

  for (let i = 0; i < program.length; i++) {
    switch (program[i]) {
      case "+":
        cells[cellPointer]++;
        break;
      case "-":
        cells[cellPointer]--;
        break;
      case ".":
        output.write(String.fromCharCode(cells[cellPointer]));
        break;
      case ",":
        cells[cellPointer] = unprocessedInput.charCodeAt(0);
        unprocessedInput = unprocessedInput.slice(1);
        break;
      case ">":
        cellPointer++;
        break;
      case "<":
        cellPointer--;
        break;
      case "[": {
        if (cells[cellPointer] !== 0) {
          continue;
        }
        let bracketCount = 1;
        while (bracketCount !== 0) {
          i++;
          if (program[i] === "[") {
            bracketCount++;
          } else if (program[i] === "]") {
            bracketCount--;
          }
        }
        break;
      }
      case "]": {
        if (cells[cellPointer] === 0) {
          continue;
        }
        let bracketCountBack = 1;
        while (bracketCountBack !== 0) {
          i--;
          if (program[i] === "[") {
            bracketCountBack--;
          } else if (program[i] === "]") {
            bracketCountBack++;
          }
        }
        break;
      }
    }
  }
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
