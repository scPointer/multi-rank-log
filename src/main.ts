import * as core from "@actions/core";
import * as github from "@actions/github";
import { readFile, writeFile } from "fs/promises";

async function run(): Promise<void> {
  // get core inputs
  let details = core.getInput("details");
  let pointsString = core.getInput("points");
  let points = pointsString.split("/");
  let stop_if_fail = core.getInput("stop-if-fail") == "true";

  console.log("start read file");

  // read json file
  let latestJsonFile = (await readFile("latest.json").catch(()=>"{}")).toString().trim();

  console.log("read file success");

  // parse the json file.
  let latestJson: any = JSON.parse(latestJsonFile);

  // generate the time data
  let timed = new Date()
    .toISOString()
    .replace(/T/, "_")
    .substring(0, 19)
    .replace(/-/g, "_")
    .replace(/:/g, "_");

  // get the current ref.
  let ref = github.context.ref.split("/").pop()!;

  if (stop_if_fail && points.length >= 2 && points[0] != points[1]) {
    core.setFailed("not get the all points.");
  }

  latestJson[ref] = `${timed}.txt`;
  await writeFile(latestJson[ref], `${details}\n\nPoints: ${pointsString}`);
  await writeFile("latest.json", JSON.stringify(latestJson, null, 2));
}

run();
