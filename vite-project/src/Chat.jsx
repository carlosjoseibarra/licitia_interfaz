import { useState, useRef } from "react";
import "./Chat.css";

function Chat() {

  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "LicitIA",
      text: "Hola. Soy tu asistente inteligente para licitaciones públicas.",
      time: getTime(),
      type: "bot",
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  function getTime() {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const sendMessage = (e) => {

    e.preventDefault();

    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: "Tú",
      text: inputValue,
      time: getTime(),
      type: "user",
    };

    setMessages((prev) => [...prev, userMessage]);

    const question = inputValue;

    setInputValue("");

    setIsTyping(true);

    setTimeout(() => {

      setIsTyping(false);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          role: "LicitIA",
          text: `Analizando tu consulta: "${question}"`,
          time: getTime(),
          type: "bot",
        },
      ]);

    }, 1500);
  };

  const handleMic = async () => {

    if (!isRecording) {

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;

      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {

        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });

        const audioUrl = URL.createObjectURL(audioBlob);

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            role: "Tú",
            audio: audioUrl,
            time: getTime(),
            type: "audio",
          },
        ]);

        const response =
          "Hola. Soy LicitIA, inteligencia artificial para análisis de licitaciones.";

        const speech =
          new SpeechSynthesisUtterance(response);

        speech.lang = "es-ES";

        window.speechSynthesis.speak(speech);

        setTimeout(() => {

          setMessages((prev) => [
            ...prev,
            {
              id: Date.now(),
              role: "LicitIA",
              text: response,
              time: getTime(),
              type: "bot",
            },
          ]);

        }, 1000);
      };

      mediaRecorder.start();

      setIsRecording(true);

    } else {

      mediaRecorderRef.current.stop();

      setIsRecording(false);

    }
  };

  return (

    <div className="chat-container">

      <div className="chat-header">

        <div>

          <h2>LicitIA</h2>

          <span>● Inteligencia activa</span>

        </div>

      </div>

      <div className="messages-container">

        {messages.map((msg) => (

          <div
            key={msg.id}
            className={`message ${
              msg.type === "user" ||
              msg.type === "audio"
                ? "user"
                : "bot"
            }`}
          >

            <strong>{msg.role}</strong>

            {msg.type === "audio" ? (

              <audio controls src={msg.audio}></audio>

            ) : (

              <p>{msg.text}</p>

            )}

            <small>{msg.time}</small>

          </div>

        ))}

        {isTyping && (
          <div className="typing">
            LicitIA escribiendo...
          </div>
        )}

      </div>

      <form
        className="input-container"
        onSubmit={sendMessage}
      >

        <button
          type="button"
          className="plus-btn"
        >
          +
        </button>

        <input
          type="text"
          placeholder="Escribe un mensaje..."
          value={inputValue}
          onChange={(e) =>
            setInputValue(e.target.value)
          }
        />

        <button
          type="button"
          className={`mic-btn ${
            isRecording ? "recording" : ""
          }`}
          onClick={handleMic}
        >

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8 12a3 3 0 0 0 3-3V3a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3z"/>
            <path d="M5 10a.5.5 0 0 1 .5.5 2.5 2.5 0 0 0 5 0 .5.5 0 0 1 1 0 3.5 3.5 0 0 1-3 3.465V15h2a.5.5 0 0 1 0 1H5.5a.5.5 0 0 1 0-1h2v-1.035A3.5 3.5 0 0 1 4.5 10.5a.5.5 0 0 1 .5-.5z"/>
          </svg>

        </button>

        <button
          type="submit"
          className="send-btn"
        >
          Enviar
        </button>

      </form>

    </div>
  );
}

export default Chat;