import { useState, useEffect } from 'react';

const prompts = [
  "What call stood out today?",
  "How did today's shift make you feel?",
  "What's one thing you're proud of today?",
  "What did you learn today?",
  "How did you help someone today?",
];

export function usePrompts() {
  const [todaysPrompt, setTodaysPrompt] = useState('');

  useEffect(() => {
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    setTodaysPrompt(randomPrompt);
  }, []);

  return { todaysPrompt };
}