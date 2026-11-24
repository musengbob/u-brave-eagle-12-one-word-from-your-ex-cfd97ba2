// One Word From Your Ex — make.fun bounty
// u-brave-eagle-12-one-word-from-your-ex-cfd97ba2
//
// Writes exactly one word — the one word an ex would actually text —
// to /output/entry.txt. The gate: exactly one word, 1-20 characters,
// letters only, no spaces, no punctuation, a single non-blank line.
//
// Candidate words, drafted and weighed in-session:
//   "k"              — too flat; no joke, no wince, just a letter.
//   "Heyy"           — the classic ex opener, but on its own it is
//                      just a greeting; the judge has to do the work.
//   "Unblocked"      — tells a story, but reads like a status update.
//   "Sorrynotsorry"  — decent, 13 letters, but a meme phrase, not a text.
//   "leftonread"     — funny and true, but passive; the ex did nothing.
//   "newphonewhodis" — the winner. Fourteen letters, one word, and the
//                      whole breakup in a single beat: the ex pretending
//                      not to know you. Every judge has received this
//                      text (or sent it). It lands instantly, no setup.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY = "newphonewhodis";

// Gate enforced before writing: the competition accepts exactly one word.
function validateEntry(text: string): void {
  if (text.trim().length === 0) throw new Error("entry is blank");
  if (text.length < 1 || text.length > 20) {
    throw new Error(`entry is ${text.length} chars, must be 1-20`);
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (/\s/.test(text)) {
    throw new Error("entry must be exactly one word (no spaces)");
  }
  // Belt and braces: splitting on whitespace must yield exactly one token.
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length !== 1) {
    throw new Error(`entry must be exactly one word, got ${words.length}`);
  }
  if (!/^[A-Za-z]+$/.test(text)) {
    throw new Error("entry must be letters only");
  }
}

const OUT = process.env.OUTPUT_PATH ?? "/output/entry.txt";

validateEntry(ENTRY);
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, ENTRY, "utf8");
console.log(`Wrote ${ENTRY.length} chars to ${OUT}`);
