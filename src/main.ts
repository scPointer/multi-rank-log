import * as core from "@actions/core";
import * as github from "@actions/github";
import { mkdir, readFile, writeFile } from "fs/promises";

async function run(): Promise<void> {
  // get core inputs
  let details = core.getInput("details");
  let pointsString = core.getInput("points");
  let points = pointsString.split("/");
  let stop_if_fail = core.getInput("stop-if-fail") == "true";
  let publicDir = core.getInput("public-dir") || "public";

  const score_per_test = 100;

  // read json file
  let latestJsonFile = (await readFile("latest.json").catch(() => "{}"))
    .toString()
    .trim();

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

  // crate public dir
  await mkdir(publicDir).catch(() => console.log("can't crate public dir"));

  latestJson[ref] = `${timed}.txt`;
  await writeFile(
    `${publicDir}/${latestJson[ref]}`,
    `${details}\n\nPoints: ${pointsString}`
  );
  await writeFile(
    `${publicDir}/latest.json`,
    JSON.stringify(latestJson, null, 2)
  );

  let passed_test: number = Array.isArray(latestJson) ? latestJson.length : Object.keys(latestJson).length;
  let score: number = passed_test * score_per_test;
  await writeFile(
    `${publicDir}/score.txt`,
    score.toString()
  );
  await writeFile(
    `score.txt`,
    score.toString()
  );

}

run();
