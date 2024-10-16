import { fakeStdin, fakeStdout } from "../helpers/fake-process.js";
import { run } from "../../app.js";

Feature("Echo", () => {
  Scenario("Simple echo one character", () => {
    let stdout, stdin;
    Given("we have a fake stdout and stdin", () => {
      stdout = fakeStdout();
      stdin = fakeStdin();
    });

    When("we are running the simple echo program and input '!'", () => {
      const program = ",.";
      stdin.write("!");
      run(program, stdin, stdout);
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

    When("we are running the echo program and input 'foo'", () => {
      const program = `
Echos whatever is typed until Alt 255 NBSP is reached
,+[-.,+]`;
      stdin.write("foo");
      run(program, stdin, stdout);
    });

    Then("The output should be 'foo'", () => {
      expect(stdout.getData()).to.eql("foo");
    });
  });
});
