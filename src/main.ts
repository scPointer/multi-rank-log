import * as core from '@actions/core'

async function run(): Promise<void> {
  let details = core.getInput('details');
  let pointsString = core.getInput('points');
  let stop_if_fail = core.getInput('stop-if-fail');

  console.log(`details: ${details}`);
  console.log(`points: ${pointsString}`);
  console.log(`stop-if-fail: ${stop_if_fail}`);
  console.log(`\n`);
}

run()
