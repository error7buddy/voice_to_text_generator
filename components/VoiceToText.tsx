'use client';  // Ensure this file is a client component

import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

const VoiceToText = () => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);

  let recognition: any;

  // Ensure this code only runs on the client-side
  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event: any) => {
        let finalTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setTranscript((prevTranscript) => prevTranscript + " " + finalTranscript);
        }
      };

      recognition.onerror = (event: any) => {
        setError(`Error occurred: ${event.error}`);
        setListening(false);
      };
    } else {
      setError("Speech recognition is not supported in this browser. Please use Google Chrome.");
    }
  }, []); // Empty dependency array ensures this runs only once after mount

  const startStopListening = () => {
    if (!recognition) {
      setError("Speech recognition not supported in this browser.");
      return;
    }

    if (listening) {
      // Stop listening
      recognition.stop();
      setListening(false);
    } else {
      // Start listening
      recognition.start();
      setListening(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-xl shadow-lg p-6">
        <CardContent>
          <h1 className="text-2xl font-bold mb-4 text-center">Voice to Text Generator</h1>
          <div className="flex justify-center gap-4 mb-4">
            <Button onClick={startStopListening} disabled={error !== null}>
              {listening ? "Stop" : "Start"}
            </Button>
          </div>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <div className="bg-white border rounded-lg p-4 min-h-[150px]">
            <p>{transcript || "Start speaking to see the transcription here..."}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceToText;
