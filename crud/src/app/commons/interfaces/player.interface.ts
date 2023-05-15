export interface Players {
  id: string;
  name: string;
  decks: Deck[];
}

interface Deck {
  name: string;
  cards: number;
}
