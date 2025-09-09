// frontend/src/components/TTSApp.js
import React, { useState, useRef } from "react";
import axios from "axios";
import "./TTSApp.css";

const TTSApp = () => {
  const [text, setText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioData, setAudioData] = useState(null);
  const [error, setError] = useState("");

  const [voiceSettings, setVoiceSettings] = useState({
    voiceId: "en-US-ryan",
    rate: 0,
    pitch: 0,
  });

  const audioRef = useRef(null);

  // Available voices
  const voices = [
    { id: "en-US-ryan", name: "Ryan (Male)" },
    { id: "en-US-sarah", name: "Sarah (Female)" },
    { id: "en-US-cooper", name: "Cooper (Male)" },
    { id: "en-US-luna", name: "Luna (Female)" },
  ];

  // Generate speech from text
  const generateSpeech = async () => {
    if (!text.trim()) {
      setError("Please enter some text");
      return;
    }
    
    // Auth func

    setIsGenerating(true);
    setError("");

    //Api call
    try {
      const response = await axios.post("http://localhost:5000/api/tts/tts", {
        text: text,
        voiceId: voiceSettings.voiceId,
        rate: voiceSettings.rate,
        pitch: voiceSettings.pitch,
      });

      // Parse the new response format
      const audioInfo = response.data;
      setAudioData(audioInfo);

      console.log("Audio generated:", audioInfo);
    } catch (error) {
      console.error("TTS Error:", error);
      setError(error.response?.data?.message || "Failed to generate speech");
    } finally {
      setIsGenerating(false);
    }
  };

  // Play the generated audio
  const playAudio = () => {
    if (!audioData?.audioUrl || !audioRef.current) return;

    // Set the audio source to the Murf.ai URL
    audioRef.current.src = audioData.audioUrl;
    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch((error) => {
        console.error("Audio play error:", error);
        setError("Failed to play audio");
      });
  };

  // Pause audio
  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Download audio file
  const downloadAudio = async () => {
    if (!audioData?.audioUrl) return;

    try {
      // Fetch the audio file from Murf.ai URL
      const response = await fetch(audioData.audioUrl);
      const blob = await response.blob();

      // Create download link
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `speech-${Date.now()}.mp3`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
      setError("Failed to download audio");
    }
  };

  // Format duration for display
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Clear all
  const clearAll = () => {
    setText("");
    setError("");
    setAudioData(null);
    setIsPlaying(false);
  };

  return (
    <div className="tts-container">
      {/* Voice Settings */}
      <div className="voice-settings">
        <h3>Voice Settings</h3>

        <div className="voice-setting-row">
          <label>Voice: </label>
          <select
            className="voice-select"
            value={voiceSettings.voiceId}
            onChange={(e) =>
              setVoiceSettings({ ...voiceSettings, voiceId: e.target.value })
            }
          >
            {voices.map((voice) => (
              <option key={voice.id} value={voice.id}>
                {voice.name}
              </option>
            ))}
          </select>
        </div>

        <div className="voice-setting-row">
          <div className="range-container">
            <label className="range-label">Speech Rate:</label>
            <input
              type="range"
              className="range-input"
              min="-50"
              max="50"
              value={voiceSettings.rate}
              onChange={(e) =>
                setVoiceSettings({
                  ...voiceSettings,
                  rate: parseInt(e.target.value),
                })
              }
            />
            <span className="range-value">{voiceSettings.rate}</span>
          </div>
        </div>

        <div className="voice-setting-row">
          <div className="range-container">
            <label className="range-label">Pitch:</label>
            <input
              type="range"
              className="range-input"
              min="-50"
              max="50"
              value={voiceSettings.pitch}
              onChange={(e) =>
                setVoiceSettings({
                  ...voiceSettings,
                  pitch: parseInt(e.target.value),
                })
              }
            />
            <span className="range-value">{voiceSettings.pitch}</span>
          </div>
        </div>
      </div>

      {/* Text Input */}
      <div className="text-input-section">
        <h3>Enter Text</h3>
        <textarea
          className="text-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to convert to speech..."
          maxLength={3000}
        />
        <div className="character-count">
          <span>{text.length}/3000 characters</span>
          {audioData && (
            <span className="remaining-chars">
              Remaining: {audioData.remainingCharacterCount}
            </span>
          )}
        </div>
      </div>

      {/* Error Display */}
      {error && <div className="error-message">{error}</div>}

      {/* Audio Info Display */}
      {audioData && (
        <div className="audio-info">
          <h4>Generated Audio Info:</h4>
          <div className="audio-info-item">
            <span className="audio-info-label">Duration:</span>{" "}
            <span className="audio-info-value">
              {formatDuration(audioData.audioLengthInSeconds)}
            </span>
          </div>
          <div className="audio-info-item">
            <span className="audio-info-label">Word Count:</span>{" "}
            <span className="audio-info-value">
              {audioData.wordDurations?.length || 0} words
            </span>
          </div>
          <div className="audio-info-item">
            <span className="audio-info-label">Characters Remaining:</span>{" "}
            <span className="audio-info-value">
              {audioData.remainingCharacterCount}
            </span>
          </div>
          {audioData.warning && (
            <div className="audio-info-item">
              <span className="audio-info-label">Warning:</span>{" "}
              <span className="warning-text">{audioData.warning}</span>
            </div>
          )}
        </div>
      )}

      {/* Control Buttons */}
      <div className="control-buttons">
        <button
          className={`btn btn-primary ${isGenerating ? "loading" : ""}`}
          onClick={generateSpeech}
          disabled={isGenerating || !text.trim()}
        >
          {isGenerating ? "Generating..." : "Generate Speech"}
        </button>

        {audioData && (
          <>
            <button
              className="btn btn-success"
              onClick={playAudio}
              disabled={isPlaying}
            >
              Play
            </button>

            <button
              className="btn btn-warning"
              onClick={pauseAudio}
              disabled={!isPlaying}
            >
              Pause
            </button>

            <button className="btn btn-info" onClick={downloadAudio}>
              Download
            </button>
          </>
        )}

        <button className="btn btn-danger" onClick={clearAll}>
          Clear All
        </button>
      </div>

      {/* Audio Player */}
      {audioData && (
        <div className="audio-player-section">
          <h3>Generated Audio</h3>
          <audio
            ref={audioRef}
            className="audio-player"
            controls
            onEnded={() => setIsPlaying(false)}
            onPause={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
          >
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};

export default TTSApp;
