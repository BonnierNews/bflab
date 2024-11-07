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
  const memory = new Uint8Array(30000);
  let pointer = 0;

  const data = [];
  for await (const chunk of input) {
    data.push(chunk);
  }
  const inputStr = Buffer.concat(data).toString();
  let inputIndex = 0;

  for (let instructionIndex = 0; instructionIndex < program.length; instructionIndex++) {
    switch (program[instructionIndex]) {
      case ".":
        output.write(String.fromCharCode(memory[pointer]));
        break;
      case "+":
        memory[pointer]++;
        break;
      case "-":
        memory[pointer]--;
        break;
      case ",":
        memory[pointer] = inputStr.charCodeAt(inputIndex);
        inputIndex++;
        break;
      case ">":
        pointer++;
        break;
      case "<":
        pointer--;
        break;
      case "[":
        if (memory[pointer] === 0) {
          let i = instructionIndex;
          while (program[instructionIndex] !== "]") {
            i++;
          }
          instructionIndex = i--; // subtract 1 because the loop will increment it
        }
        break;
      case "]":
        if (memory[pointer] !== 0) {
          let j = instructionIndex;
          while (program[j] !== "[") {
            j--;
          }
          instructionIndex = j--; // subtract 1 because the loop will increment it
        }
        break;
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
