import { text, number, flag, list, object, hash, report, unique, safePath, type Lesson, type Input } from "./core";

// A focused local experiment derived from this lesson’s reviewed presentation.
export const lesson: Lesson = {
  number: 49,
  title: "Agent Teams and Evidence Messages",
  description: "Imagine a developer tells a reviewer that a bug is fixed and all tests passed. The reviewer needs more than a convincing sentence, but a JSON object saying passed is still only a structured claim.",
  concepts: ["Authenticate evidence producers", "Bind proof to artifact and task", "Failed tests are valid evidence"],
  scope: "Routes a local tester evidence message using a server-owned role binding. It does not deliver a provider message. Each run starts from a fresh local seed. The run journal stores results, not production workflow state.",
  cases: [{"id": "0", "label": "Route genuine test evidence", "input": {"claimedRole": "tester", "testCount": 5, "testExit": 0, "artifact": "candidate-v1"}, "expected": "passed", "checks": {"queued": true}}, {"id": "1", "label": "Reject a forged sender role", "input": {"claimedRole": "developer", "testCount": 5, "testExit": 0, "artifact": "candidate-v1"}, "expected": "rejected", "checks": {"queued": false}}, {"id": "2", "label": "Reject a zero-test success claim", "input": {"claimedRole": "tester", "testCount": 0, "testExit": 0, "artifact": "candidate-v1"}, "expected": "rejected", "checks": {"queued": false}}],
  async run(input) {

const role=text(input,"claimedRole"),tests=number(input,"testCount"),artifact=text(input,"artifact"),exit=number(input,"testExit");
const verified=role==="tester"&&Number.isInteger(tests)&&tests>0&&artifact==="candidate-v1";
return report(verified?"passed":"rejected",verified?"Queued verified tester evidence; the test outcome remains explicit":"Producer binding or proof scope failed",{queued:verified,testOutcome:exit===0?"passed":"failed",testCount:tests,artifactHash:hash(artifact),recipient:"reviewer-demo",delivered:false},["Resolve the producer role from host state","Match task, run, and artifact bytes","Do not accept zero tests as a pass","Queue a separate delivery record"]);

  }
};
