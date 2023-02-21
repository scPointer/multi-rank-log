import * as core from "@actions/core";
import * as github from "@actions/github";
import { readFile } from "fs/promises";

async function run(): Promise<void> {
  let details = core.getInput("details");
  let pointsString = core.getInput("points");
  let stop_if_fail = core.getInput("stop-if-fail") == "true";

  console.log(`details: ${details}`);
  console.log(`points: ${pointsString}`);
  console.log(`stop-if-fail: ${stop_if_fail}`);
  console.log(`\n`);

  let latestJsonFile = await readFile("latest.json");
  let timed = new Date()
    .toISOString()
    .replace(/T/, "_")
    .substring(0, 19)
    .replace("-", "_")
    .replace(":", "_");
  let ref = github.context.ref;
  console.log(`timed ${timed}`);
  console.log(`ref ${ref}`);
  console.log(`latestJSONFile: ${latestJsonFile}`);
  console.log(timed);

  if (stop_if_fail) core.error("not get the all points.");
}

run();
