"use client";

import { useEffect } from "react";

export default function ClickSound() {
  useEffect(() => {
    // Create AudioContext once
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    let audioContext: AudioContext | null = null;

    try {
      audioContext = new AudioContextClass();
    } catch (e) {
      console.error("Web Audio API not supported", e);
    }

    const playClickSound = () => {
      if (!audioContext) return;

      // Resume context if suspended (browser policy)
      if (audioContext.state === "suspended") {
        audioContext.resume().catch(() => {});
      }

      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      // Create a pleasant "pop" / "tick" sound
      // Sine wave for clean tone
      oscillator.type = "sine";
      
      // Start at 800Hz and drop quickly to 300Hz (simulates a mechanical click)
      const now = audioContext.currentTime;
      oscillator.frequency.setValueAtTime(800, now);
      oscillator.frequency.exponentialRampToValueAtTime(300, now + 0.05);

      // Envelope: sharp attack, quick decay
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.15, now + 0.01); // Attack
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1); // Decay

      // Connect nodes
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Play
      oscillator.start(now);
      oscillator.stop(now + 0.1);
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if the clicked element is a button or inside a button
      const isButton = target.closest("button") || 
                       target.closest("[role='button']") || 
                       target.tagName === "BUTTON" ||
                       target.tagName === "A"; // Also sound for links

      if (isButton) {
        playClickSound();
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
      if (audioContext) {
        audioContext.close();
      }
    };
  }, []);

  return null;
}
