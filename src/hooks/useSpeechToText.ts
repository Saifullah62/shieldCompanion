import { useState, useEffect, useCallback } from 'react';

interface UseSpeechToTextProps {
  onResult?: (text: string) => void;
  onError?: (error: string) => void;
  language?: string;
}

export function useSpeechToText({
  onResult,
  onError,
  language = 'en-US'
}: UseSpeechToTextProps = {}) {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialize speech recognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = language;

        recognition.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');

          if (event.results[event.results.length - 1].isFinal) {
            onResult?.(transcript);
          }
        };

        recognition.onerror = (event) => {
          onError?.(event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        setRecognition(recognition);
      } else {
        onError?.('Speech recognition is not supported in this browser');
      }
    }
  }, [language, onError, onResult]);

  const startListening = useCallback(() => {
    if (recognition) {
      try {
        recognition.start();
        setIsListening(true);
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        onError?.('Failed to start speech recognition');
      }
    }
  }, [recognition, onError]);

  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  }, [recognition]);

  return {
    isListening,
    startListening,
    stopListening,
    isSupported: !!recognition
  };
}

// Add necessary type declarations for the Web Speech API
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}
