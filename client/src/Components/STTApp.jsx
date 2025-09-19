import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useState } from "react";
import './STTApp.css'

const STTApp = () => {
  const [isCopied, setIsCopied] = useState(false);

  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    resetTranscript,
  } = useSpeechRecognition();

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  const handleCopyClick = async () => {
    if (transcript.trim()) {
      try {
        // Try modern clipboard API first
        await navigator.clipboard.writeText(transcript);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 1000);
      } catch (error) {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = transcript;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 1000);
      }
    }
  };

  const clearTranscript = () => {
    resetTranscript();
  };

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="stt-container">
        <h2>Speech to Text Converter</h2>
        <p className="stt-error">
          Browser doesn't support speech recognition. Please use Chrome or Edge.
        </p>
      </div>
    );
  }

  return (
    <div className="stt-container">
      <h2>Speak whatever you want <br /> we don't judge!</h2>
      {/* <p className="stt-description">A React hook...</p> */}

      <div className="stt-main">
        <p className="stt-mic-status">
          Microphone: {listening ? "🔴 ON" : "⚫ OFF"}
        </p>
        <div className="stt-transcript">
          {transcript || "Click 'Start Listening' and speak..."}
        </div>
      </div>

      <div className="stt-buttons">
        <button className="stt-btn stt-btn-copy" onClick={handleCopyClick}>
          📋 Copy
        </button>
        <button className="stt-btn stt-btn-start" onClick={startListening}>
          🎤 Start
        </button>
        <button className="stt-btn stt-btn-stop" onClick={stopListening}>
          ⏹️ Stop
        </button>
        <button className="stt-btn stt-btn-clear" onClick={clearTranscript}>
          🗑️ Clear
        </button>
      </div>
    </div>
  );
};

export default STTApp;
