import { fakeStdin, fakeStdout } from "../helpers/fake-process.js";
import { run } from "../../app.js";

Feature("Arithmetic", () => {
  Scenario("Start counting at zero", () => {
    let stdout, stdin;
    Given("we have a fake stdout and stdin", () => {
      stdout = fakeStdout();
      stdin = fakeStdin();
    });

    When("we print an empty cell", async () => {
      const program = ".";
      await run(program, stdin, stdout);
    });

    Then("The output should be null (0)", () => {
      expect(stdout.getData()).to.eql("\u0000");
    });
  });

  Scenario("1+1 equals 2", () => {
    let stdout, stdin;
    Given("we have a fake stdout and stdin", () => {
      stdout = fakeStdout();
      stdin = fakeStdin();
    });

    When("we run 1+1 and print", async () => {
      const program = "++.";
      await run(program, stdin, stdout);
    });

    Then("The output should be 2", () => {
      expect(stdout.getData()).to.eql("\u0002");
    });
  });

  Scenario("1+1-1 equals 1", () => {
    let stdout, stdin;
    Given("we have a fake stdout and stdin", () => {
      stdout = fakeStdout();
      stdin = fakeStdin();
    });

    When("we run 1+1-1 and print", async () => {
      const program = "++-.";
      await run(program, stdin, stdout);
    });

    Then("The output should be 1", () => {
      expect(stdout.getData()).to.eql("\u0001");
    });
  });

  Scenario("Addition wraps", () => {
    let stdout, stdin;
    Given("we have a fake stdout and stdin", () => {
      stdout = fakeStdout();
      stdin = fakeStdin();
    });

    When("we are adding 256 and end up back at null", async () => {
      const program = "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.";
      await run(program, stdin, stdout);
    });

    Then("The output should be null", () => {
      expect(stdout.getData()).to.eql("\u0000");
    });
  });

  Scenario("Subtraction wraps", () => {
    let stdout, stdin;
    Given("we have a fake stdout and stdin", () => {
      stdout = fakeStdout();
      stdin = fakeStdin();
    });

    When("we are subtracting 1 and wrap", async () => {
      const program = "-.";
      await run(program, stdin, stdout);
    });

    Then("The output should be ÿ", () => {
      expect(stdout.getData()).to.eql("ÿ");
    });
  });

});
