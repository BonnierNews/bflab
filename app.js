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
  const arr = [ ...program ];

  const size = 3000;
  const memory = new Uint8Array(size);
  let pointer = 0;

  for (const char of arr) {
    switch (char) {
      case ".":
        await output.write(intToUnicode(memory[pointer] || 0));
        break;
      case "+":
        memory[pointer] = Number(memory[pointer] || 0) + 1;
        break;
      case "-":
        memory[pointer] = Number(memory[pointer] || 0) - 1;
        break;
      case ">":
        if (pointer === size - 1) {
          pointer = 0;
          break;
        }
        pointer += 1;
        break;
      case "<":
        if (pointer === 0) {
          pointer = size - 1;
          break;
        }
        pointer -= 1;
        break;

      case "[":
        if (!memory[pointer]) {
          let openLoops = 1;
          while (openLoops) {
            const instruction = arr.shift();
            if (instruction === "[") {
              openLoops += 1;
            } else if (instruction === "]") {
              openLoops -= 1;
            }
          }
        }
        break;
    }
  }
}

/**
 * Converts an integer to a Unicode string.
 * @param {number} num - The integer number to convert.
 * @returns {string} The corresponding Unicode character.
 */
function intToUnicode(num) {
  return String.fromCharCode(num);
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
