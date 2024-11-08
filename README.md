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

A basic interpreter implementation is basically a loop that goes through the program code and immediately executing the instruction.

## brainfuck!?

The brainfuck language is small, consisting of only 8 instructions but yet powerful enough to implement somewhat useful programs in. Since each instruction is only
one character long it makes it really easy to parse the language. Included in this repository
is a [language specification](SPECIFICATION.md). Skim through it to get an overview and then read it carefully when implementing the actual instructions.

## Let's get started!

Included in this repo is an incomplete brainfuck interpreter along with a test suite. You will implement the interpreter by filling out the missing code in the `run` function in [app.js](app.js).

Clone this repo and create a branch:

```bash
git clone git@github.com:BonnierNews/bflab.git
cd bflab
git checkout -b my-epic-interpreter
git push origin my-epic-interpreter
```

To install the necessary deps and run the failing test suites:

```bash
nvm use
npm install
npm test -- -b # bail on failure to make it easy to spot errors!
```

To run the interpreter on an actual file do:

```bash
node app.js examples/hello.b
```

## Implementation hints

Implement instructions by the simplest first moving on to harder targets using the test cases as guidance.

1. Start by making the tests in [0-arithmetic-feature.js](test/feature/0-arithmetic-feature.js) work first by implementing the instructions `.`, `+` and `-`
2. Then make the tests in [1-move-feature.js](test/feature/1-move-feature.js) work by implementing the move instructions `>` and `<`.
3. Then make the tests in [2-hello-world-feature.js](test/feature/2-hello-world-feature.js) work by implementing loops `[` and `]`
4. Then make the tests in [3-echo-feature.js](test/feature/3-echo-feature.js) work by implementing user input `,`
5. Finally ensure it all works togheter by making the tests in [4-rot13-feature](test/feature/4-rot13-feature.js) work.

## Implementation done? Have fun with brainfuck!

If you are done with your brainfuck interpreter there are a number of things you can try implementing on your own in brainfuck.

1. Modify `examples/echo.b` to exit on something else than newline
2. Print `brainfuck rocks!` using as few instructions as possible
3. Make a program that exits when the user inputs `quit\n`
