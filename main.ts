// Six Words, One Story — entry for u-deranalabs-six-words-one-story-f982e410
// SPDX-License-Identifier: MIT

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The story: one empty chair, one missing voice, one Christmas.
// Six words carry the whole scene — the absence is the story.
const STORY = "Grandma's chair stayed empty at Christmas.";

const MAX_CHARS = 60;

/** Count words by splitting on whitespace. */
function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/** Normalize the story: trim ends and collapse any run of whitespace to one space. */
function normalize(text: string): string {
  return text.trim().replace(/\s+/g, " ");
}

/** A six-word story must be exactly six words and fit in 60 characters. */
function validate(text: string): void {
  const words = wordCount(text);
  if (words !== 6) {
    throw new Error(
      `Invalid story: expected exactly 6 words but found ${words} ` +
        `in ${JSON.stringify(text)}. Remove or add words so the story is exactly six words.`,
    );
  }
  if (text.length > MAX_CHARS) {
    throw new Error(
      `Invalid story: ${text.length} characters exceeds the ${MAX_CHARS}-character limit ` +
        `by ${text.length - MAX_CHARS}. Shorten the story to fit.`,
    );
  }
}

/** Write the validated story to <outputDir>/entry.txt. */
function writeEntry(outputDir: string): void {
  const story = normalize(STORY);
  validate(story);
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, "entry.txt"), story, "utf8");
}

const outputDir = process.env.OUTPUT_DIR ?? "/output";
writeEntry(outputDir);
const story = normalize(STORY);
console.log(`Wrote ${wordCount(story)}-word story (${story.length} chars) to ${join(outputDir, "entry.txt")}`);
