# Implement an interpreter in less than 120 minutes

In this hands-on workshop we will do a crash-course in what an interpreter is and how to implement one.

## What is an interpreter

An interpreter is a type of program that reads and executes code line-by-line or statement-by-statement. Unlike a compiler, which translates the entire source code into machine code (or bytecode) before execution, an interpreter processes the code in real-time, translating and executing it on the fly. This makes interpreted languages easier to test and debug, as you can see the effects of code immediately.

Here’s how an interpreter typically works:

1. Reads the source code: The interpreter reads the high-level programming language code.
2. Translates: It converts each statement or expression into machine-understandable actions.
3. Executes: Once translated, the interpreter executes the instruction immediately.

Examples of languages that are usually interpreted are Python, JavaScript (more or less).

## Where do we start when implementing an interpreter?

To start implementing an interpreter we need a language to implement an interpreter for. Picking a mainstream programming language would be much too complicated for a 120 minutes session.
Instead we will implement a complete interpreter for the turing-complete esoteric language [brainfuck](https://esolangs.org/wiki/Brainfuck).

## brainfuck!?

The brainfuck language is small, consisting of only 8 instructions but yet powerful enough to implement somewhat useful programs in. Included in this repository
is a [language specification](SPECIFICATION.md). Read it carefully when implementing an instruction.

## Let's get started!

Included in this repo is an incomplete brainfuck interpreter along with a test suite. You will implement the interpreter by filling out the missing code in the `run` function in [app.js](app.js).

To install the necessary deps and run the failing test suites:

```bash
nvm use
npm install
npm test
```

To run the interpreter on an actual file do:

```bash
node app.js examples/hello.b
```

## Implementation hints

- Use the test cases as guidance, there are test cases that only uses a subset of the instructions, make those work first!
- Start with the simple instructions: No loops and no user input!
- Then do loops!
- And finally do user input!
- `run` should be async as we can deal with user input!
- Remember the brainfuck specification!
