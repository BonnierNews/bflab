/* eslint-disable n/no-process-exit */
/* eslint-disable no-console */
import { fileURLToPath } from "url";
import { readFileSync } from "fs";

/**
 * @param {string} program
 * @param {import("stream").Readable} input
 * @param {import("stream").Writable} output
 * @returns {void}
 */
export function run(program, input, output) {
  const cells = [ "\u0000" ];
  let currentCell = 0;

  for (let i = 0; i < program.length; i++) {
    if (program[i] === "+") {
      cells[currentCell] = String.fromCharCode((cells[currentCell].charCodeAt(0) + 1) % 256);
    } else if (program[i] === "-") {
      cells[currentCell] = String.fromCharCode((256 + cells[currentCell].charCodeAt(0) - 1) % 256);
    } else if (program[i] === ".") {
      output.write(cells[currentCell]);
    } else if (program[i] === ",") {
      const char = input.read(1)?.toString();
      cells[currentCell] = char;
    } else if (program[i] === ">") {
      currentCell++;

      if (currentCell === cells.length) {
        cells.push("\u0000");
      }
    } else if (program[i] === "<") {
      if (currentCell === 0) {
        throw new Error("Cannot move to a negative cell");
      }

      currentCell--;
    } else if (program[i] === "[") {
      if (cells[currentCell] !== "\u0000") {
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
    } else if (program[i] === "]") {
      if (cells[currentCell] === "\u0000") {
        continue;
      }

      let bracketCount = 1;
      while (bracketCount !== 0) {
        i--;
        if (program[i] === "[") {
          bracketCount--;
        } else if (program[i] === "]") {
          bracketCount++;
        }
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
    run(readFileSync(process.argv[2]).toString(), process.stdin, process.stdout);
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
