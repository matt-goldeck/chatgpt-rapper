"use client";

import {
  createRapTextFromCriteria,
  generateRapAudioURLFromText,
} from "@/lib/api/internal";
import { RapMood, RapStyle } from "@/lib/types/rap";
import * as React from "react";

interface GenerateRapContext {
  rap: string;
  isLoadingRap: boolean;
  hasLoadedRap: boolean;
  isSpeakingRap: boolean;
  hasSpokenRap: boolean;
  generateRap: (
    topic: string,
    style: RapStyle,
    mood: RapMood
  ) => Promise<string>;
  speakRap: (rap: string, style: RapStyle, mood: RapMood) => Promise<void>;
  generateAndSpeakRap: (
    topic: string,
    style: RapStyle,
    mood: RapMood
  ) => Promise<void>;
}

const GenerateRapContext = React.createContext<GenerateRapContext | undefined>(
  undefined
);

export function useGenerateRap() {
  const context = React.useContext(GenerateRapContext);
  if (!context) {
    throw new Error("useGenerateRap must be used within a GenerateRapProvider");
  }
  return context;
}

interface GenerateRapProviderProps {
  children: React.ReactNode;
}

export function GenerateRapProvider({ children }: GenerateRapProviderProps) {
  const [rap, setRap] = React.useState("");
  const [isLoadingRap, setIsLoadingRap] = React.useState(false);
  const [hasLoadedRap, setHasLoadedRap] = React.useState(false);
  const [isSpeakingRap, setIsSpeakingRap] = React.useState(false);
  const [hasSpokenRap, setHasSpokenRap] = React.useState(false);

  const generateRap = async (topic: string, style: RapStyle, mood: RapMood) => {
    setIsLoadingRap(true);
    let newRap = "";
    try {
      newRap = await createRapTextFromCriteria(topic, style, mood);
      setRap(newRap);
      setHasLoadedRap(true);
    } catch (error) {
      console.error("Error generating rap:", error);
    } finally {
      setIsLoadingRap(false);
      return newRap;
    }
  };

  const speakRap = async (rap: string, style: RapStyle, mood: RapMood) => {
    setIsSpeakingRap(true);
    try {
      const url = await generateRapAudioURLFromText(rap, style, mood);
      const audio = new Audio(url);
      await audio.play();

      audio.onended = () => {
        URL.revokeObjectURL(url);
        setHasSpokenRap(true);
      };
    } catch (error) {
      console.error("Error speaking rap:", error);
    } finally {
      setIsSpeakingRap(false);
    }
  };

  const generateAndSpeakRap = async (
    topic: string,
    style: RapStyle,
    mood: RapMood
  ) => {
    const rap = await generateRap(topic, style, mood);
    console.log(rap);
    if (rap) {
      await speakRap(rap, style, mood);
    }
  };

  return (
    <GenerateRapContext.Provider
      value={{
        rap,
        isLoadingRap,
        hasLoadedRap,
        isSpeakingRap,
        hasSpokenRap,
        generateRap,
        speakRap,
        generateAndSpeakRap,
      }}>
      {children}
    </GenerateRapContext.Provider>
  );
}
