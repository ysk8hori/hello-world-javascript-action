import * as core from "@actions/core";
import * as github from "@actions/github";
import { Octokit } from "@octokit/rest";

try {
  // `who-to-greet` import defined in action metadata file
  const nameToGreet = core.getInput("who-to-greet");
  console.log(`Hello ${nameToGreet}!`);
  const time = new Date().toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
  const octokit = new Octokit({
    auth: core.getInput("access-token"),
    userAgent: "@ysk8hori/hello-world-javascript-action",
  });
  await octokit.issues.createComment({
    ...github.context.repo,
    issue_number: 1,
    body: "Hello World!",
  });
} catch (error) {
  core.setFailed(error.message);
}
