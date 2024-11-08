import { fakeStdin, fakeStdout } from "../helpers/fake-process.js";
import { run } from "../../app.js";

Feature("Move", () => {
  Scenario("Moving and storing", () => {
    let stdout, stdin;
    Given("we have a fake stdout and stdin", () => {
      stdout = fakeStdout();
      stdin = fakeStdin();
    });

    When("we store something in cell #0 and cell #1, then move back and print their contents", async () => {
      const program = `
+  make cell 0 = 1
>  move to cell 1
++ make cell 1 = 2
<  move back to cell 0
.  print cell 0
>  move to cell 1
.  print cell 1
      `;
      await run(program, stdin, stdout);
    });

    Then("The output should be 1 and 2", () => {
      expect(stdout.getData()).to.eql("\u0001\u0002");
    });
  });
});
