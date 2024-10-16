import { fakeStdin, fakeStdout } from "../helpers/fake-process.js";
import { run } from "../../app.js";

Feature("Echo", () => {
  Scenario("Simple echo one character", () => {
    let stdout, stdin;
    Given("we have a fake stdout and stdin", () => {
      stdout = fakeStdout();
      stdin = fakeStdin();
    });

    When("we are running the simple echo program and input '!'", async () => {
      const program = ",.";
      stdin.write("!");
      await run(program, stdin, stdout);
    });

    Then("The output should be '!'", () => {
      expect(stdout.getData()).to.eql("!");
    });
  });

  Scenario("Echo user input line", () => {
    let stdout, stdin;

    Given("we have a fake stdout and stdin", () => {
      stdout = fakeStdout();
      stdin = fakeStdin();
    });

    When("we are running the echo program and input 'foo'", async () => {
      const program = `
Echos whatever is typed until newline is entered
,
----------
[
  ++++++++++
  .
  ,
  ----------
]
`;
      stdin.write("foo\n");
      await run(program, stdin, stdout);
    });

    Then("The output should be 'foo'", () => {
      expect(stdout.getData()).to.eql("foo");
    });
  });
});
