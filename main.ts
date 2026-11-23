// Six Words, One Story — make.fun entry
// Writes one original six-word story to /output/entry.txt.
//
// The story: "Grandma's chair stayed empty at Christmas."
// Six words, one complete story: a family Christmas marked by an
// absence. The empty chair is the turn — someone who should be
// there is not — and the rest of the life (whose chair, why it is
// empty, who notices) is left for the reader to fill in.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const STORY = "Grandma's chair stayed empty at Christmas.";

const outputDir = process.env.OUTPUT_DIR ?? "/output";
const words = STORY.trim().split(/\s+/);

if (words.length !== 6) {
  throw new Error(`Expected exactly 6 words, got ${words.length}: ${STORY}`);
}
if (STORY.length > 60) {
  throw new Error(`Story exceeds 60 characters (${STORY.length}): ${STORY}`);
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), STORY, "utf8");
console.log(`Wrote ${words.length}-word story (${STORY.length} chars) to ${join(outputDir, "entry.txt")}`);
