import { run } from "../../app.js";
import { fakeStdin, fakeStdout } from "../helpers/fake-process.js";

Feature("Hello World", () => {
  Scenario("Hello World without loops and without changing the data pointer", () => {
    let stdout, stdin;

    Given("we have a fake stdout and stdin", () => {
      stdout = fakeStdout();
      stdin = fakeStdin();
    });

    When("Running the hello world program without a loop", async () => {
      const program = `
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.        set (cell #0) to 72 (H) and print it
+++++++++++++++++++++++++++++.                                                   set (cell #0) to 101 (e) and print it
+++++++..                                                                        set (cell #0) to 108 (l) and print it twice
+++.                                                                             set (cell #0) to 111 (o) and print it
-------------------------------------------------------------------------------. set (cell #0) to 32 (space) and print it
+++++++++++++++++++++++++++++++++++++++++++++++++++++++.                         set (cell #0) to 87 (W) and print it
++++++++++++++++++++++++.                                                        set (cell #0) to 111 (o) and print it
+++.                                                                             set (cell #0) to 114 (r) and print it
------.                                                                          set (cell #0) to 108 (l) and print it
--------.                                                                        set (cell #0) to 100 (d) and print it
-------------------------------------------------------------------.             set (cell #0) to 33 (!) and print it
-----------------------.                                                         set (cell #0) to 10 (newline) and print it
`;
      await run(program, stdin, stdout);
    });

    Then("The output should be 'Hello World!' with a newline", () => {
      expect(stdout.getData()).to.eql("Hello World!\n");
    });
  });

  Scenario("Hello World without loops but with a changing data pointer", () => {
    let stdout, stdin;

    Given("we have a fake stdout and stdin", () => {
      stdout = fakeStdout();
      stdin = fakeStdin();
    });

    When("Running the hello world program without a loop but with a changing data pointer", async () => {
      const program = `
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++                                           set (cell #0) to 72 (H)
>                                                                                                                  move to cell #1
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++              set (cell #1) to 101 (e)
>                                                                                                                  move to cell #2
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++       set (cell #2) to 108 (l)
>                                                                                                                  move to cell #3
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++    set (cell #3) to 111 (o)
>                                                                                                                  move to cell #4
++++++++++++++++++++++++++++++++                                                                                   set (cell #4) to 32 (space)
>                                                                                                                  move to cell #5
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++                            set (cell #5) to 87 (W)
>                                                                                                                  move to cell #6
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++    set (cell #6) to 111 (o)
>                                                                                                                  move to cell #7
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ set (cell #7) to 114 (r)
>                                                                                                                  move to cell #8
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++       set (cell #8) to 108 (l)
>                                                                                                                  move to cell #9
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++               set (cell #9) to 100 (d)
>                                                                                                                  move to cell #10
+++++++++++++++++++++++++++++++++                                                                                  set (cell #10) to 33 (!)
>                                                                                                                  move to cell #11
++++++++++                                                                                                         set (cell #11) to 10 (newline)
<<<<<<<<<<<                                                                                                        move back to cell #0
.                                                                                                                  print cell #0
>                                                                                                                  move to cell #1
.                                                                                                                  print cell #1
>                                                                                                                  move to cell #2
..                                                                                                                 print cell #2 twice
>                                                                                                                  move to cell #3
.                                                                                                                  print cell #3
>                                                                                                                  move to cell #4
.                                                                                                                  print cell #4
>                                                                                                                  move to cell #5
.                                                                                                                  print cell #5
>                                                                                                                  move to cell #6
.                                                                                                                  print cell #6
>                                                                                                                  move to cell #7
.                                                                                                                  print cell #7
>                                                                                                                  move to cell #8
.                                                                                                                  print cell #8
>                                                                                                                  move to cell #9
.                                                                                                                  print cell #9
>                                                                                                                  move to cell #10
.                                                                                                                  print cell #10
>                                                                                                                  move to cell #11
.                                                                                                                  print cell #11
`;
      await run(program, stdin, stdout);
    });

    Then("The output should be 'Hello World!' with a newline", () => {
      expect(stdout.getData()).to.eql("Hello World!\n");
    });
  });

  Scenario("Hello World with a loop", () => {
    let stdout, stdin;

    Given("we have a fake stdout and stdin", () => {
      stdout = fakeStdout();
      stdin = fakeStdin();
    });

    When("Running the hello world program with a loop", async () => {
      const program = `
+++++ +++++             initialize counter (cell #0) to 10
[                       use loop to set the next four cells to 70/100/30/10
> +++++ ++              add  7 to cell #1
> +++++ +++++           add 10 to cell #2
> +++                   add  3 to cell #3
> +                     add  1 to cell #4
<<<< -                  decrement counter (cell #0)
]
> ++ .                  print 'H'
> + .                   print 'e'
+++++ ++ .              print 'l'
.                       print 'l'
+++ .                   print 'o'
> ++ .                  print ' '
<< +++++ +++++ +++++ .  print 'W'
> .                     print 'o'
+++ .                   print 'r'
----- - .               print 'l'
----- --- .             print 'd'
> + .                   print '!'
> .                     print '\n'`;
      await run(program, stdin, stdout);
    });

    Then("The output should be 'Hello World!' with a newline", () => {
      expect(stdout.getData()).to.eql("Hello World!\n");
    });
  });

  Scenario("Hello World with nested loops", () => {
    let stdout, stdin;

    Given("we have a fake stdout and stdin", () => {
      stdout = fakeStdout();
      stdin = fakeStdin();
    });

    When("Running the hello world program with nested loops", async () => {
      const program = "++++++++**[**>++++**[**>++>+++>+++>+<<<<-**]**>+>+>->>+**[**<**]**<-**]**>>**.**>---**.**+++++++**..**+++**.**>>**.**<-**.**<**.**+++**.**------**.**--------**.**>>+**.**>++**.**";
      await run(program, stdin, stdout);
    });

    Then("The output should be 'Hello World!' with a newline", () => {
      expect(stdout.getData()).to.eql("Hello World!\n");
    });
  });
});
