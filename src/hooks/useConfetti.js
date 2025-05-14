import JSConfetti from "js-confetti";
import { useMemo } from "react";

export function useConfetti() {
const jsConfetti = useMemo(() => new JSConfetti(), []);

  const triggerConfetti = (emojis = []) => {
    jsConfetti.addConfetti({
      emojis: emojis.length > 0 ? emojis :   [
          "🥕",
          "🌽",
          "🍅",
          "💫",
          "🥬",
          "🌸",
          "🌶️",
          "🧀",
          "🥑",
          "🫐",
          "🥩",
          "🧅",
          "🍆",
          "🍖",
        ],
      emojiSize: 50,
      confettiNumber: 150,
      confettiRadius: 6,
    });
  };

  return { triggerConfetti };
}