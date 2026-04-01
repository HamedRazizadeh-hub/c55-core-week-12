import Database from "better-sqlite3";
import { readFileSync } from "fs";

const db = new Database("./data/flashcards.db");

const raw = readFileSync("./data/data.json", "utf-8");
const data = JSON.parse(raw);

// insert decks
const insertDeck = db.prepare(
  "INSERT INTO decks (id, name, description) VALUES (?, ?, ?)",
);

for (const deck of data.decks) {
  insertDeck.run(deck.id, deck.name, deck.description);
}

// insert cards
const insertCard = db.prepare(
  "INSERT INTO cards (id, question, answer, learned, deck_id) VALUES (?, ?, ?, ?, ?)",
);

for (const card of data.cards) {
  insertCard.run(
    card.id,
    card.question,
    card.answer,
    card.learned ? 1 : 0,
    card.deckId,
  );
}

console.log("Migration complete!");
