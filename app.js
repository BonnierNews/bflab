/* eslint-disable n/no-process-exit */
/* eslint-disable no-console */
import { fileURLToPath } from "url";
import { readFileSync } from "fs";

/**
 * @param {string} program
 * @param {import("stream").Readable} input
 * @param {impo:zrt("stream").Writable} output
 * @returns {Promise<void>}
 */
export async function run(program, input, output) {
  const memory = Array(30000).fill(0);
  let ptr = 0;

  for (let i = 0; i < program.length; i++) {
    let command = program[i];
    switch (command) {
      case ">":
        ptr++;
        break;
      case "<":
        ptr--;
        break;
      case "+":
        memory[ptr] = (memory[ptr] + 1) % 256;
        break;
      case "-":
        memory[ptr] = (memory[ptr] - 1 + 256) % 256;
        break;
      case ".":
        output.write(String.fromCharCode(memory[ptr]));
        break;
      case ",":
        {
          const data = await input.read(1);
          if (data) {
            memory[ptr] = data[0];
          } else {
            memory[ptr] = 0;
          }
        }
        break;
      case "[":
        if (memory[ptr] === 0) {
          let depth = 1;
          while (depth !== 0) {
            command = program[++i];
            if (command === "[") {
              depth++;
            } else if (command === "]") {
              depth--;
            }
          }
        }
        break;
      case "]":
        if (memory[ptr] !== 0) {
          let depth = 1;
          while (depth !== 0) {
            command = program[--i];
            if (command === "]") {
              depth++;
            } else if (command === "[") {
              depth--;
            }
          }
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
