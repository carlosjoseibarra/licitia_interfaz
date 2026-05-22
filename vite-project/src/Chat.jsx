import { useState, useRef } from "react";
import "./Chat.css";

const RobotIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="robot-svg"
    width="36"
    height="36"
  >
    <rect x="4" y="6" width="16" height="11" rx="4" />
    <circle cx="9" cy="11" r="1" fill="currentColor" />
    <circle cx="15" cy="11" r="1" fill="currentColor" />
    <path d="M10 15h4" />
    <path d="M12 2v4" />
  </svg>
);

function Chat() {

  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "LicitIA",
      text: "Hola. Soy tu asistente inteligente para licitaciones públicas.",
      time: getFormatedTime(),
      type: "bot",
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  // NUEVO
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  function getFormatedTime() {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  const addBotMessage = (text) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        role: "LicitIA",
        text,
        time: getFormatedTime(),
        type: "bot",
      },
    ]);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: "Tú",
      text: inputValue,
      time: getFormatedTime(),
      type: "user",
    };

    setMessages((prev) => [...prev, userMessage]);

    const textSent = inputValue;

    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);

      addBotMessage(
        `Analizando tu consulta: "${textSent}".`
      );

    }, 1500);
  };

  // MICRÓFONO REAL

  const handleMicClick = async () => {

    if (!isRecording) {

      try {

        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        const mediaRecorder = new MediaRecorder(stream);

        mediaRecorderRef.current = mediaRecorder;

        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };

        mediaRecorder.onstop = () => {

          const audioBlob = new Blob(
            audioChunksRef.current,
            {
              type: "audio/webm",
            }
          );

          const audioUrl = URL.createObjectURL(audioBlob);

          // MENSAJE AUDIO USUARIO

          setMessages((prev) => [
            ...prev,
            {
              id: Date.now(),
              role: "Tú",
              audio: audioUrl,
              time: getFormatedTime(),
              type: "audio-user",
            },
          ]);

          // RESPUESTA IA

          setTimeout(() => {

            const responseText =
              "Hola. Soy LicitIA, tu asistente inteligente.";

            const speech =
              new SpeechSynthesisUtterance(responseText);

            speech.lang = "es-ES";

            window.speechSynthesis.speak(speech);

            setMessages((prev) => [
              ...prev,
              {
                id: Date.now() + 1,
                role: "LicitIA",
                text: responseText,
                time: getFormatedTime(),
                type: "bot",
              },
            ]);

          }, 1000);
        };

        mediaRecorder.start();

        setIsRecording(true);

      } catch (error) {

        alert("No se pudo acceder al micrófono");

      }

    } else {

      mediaRecorderRef.current.stop();

      setIsRecording(false);

    }
  };

  const handleFileChange = (e, type) => {

    const file = e.target.files[0];

    if (!file) return;

    setShowMenu(false);

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        role: "Tú",
        text: `Archivo enviado: ${file.name}`,
        time: getFormatedTime(),
        type: "user",
      },
    ]);

    setTimeout(() => {

      addBotMessage(
        `Documento "${file.name}" recibido.`
      );

    }, 1200);
  };

  return (
    <div className="chat-container">

      <div className="chat-box">

        <header className="chat-header">

          <div className="logo-container">

            <div className="robot-wrapper">

              <RobotIcon />

              <div className="robot-hand left-hand"></div>
              <div className="robot-hand right-hand"></div>

            </div>

            <div>

              <h3>LicitIA</h3>

              <span className="status-online">
                ● Inteligencia activa
              </span>

            </div>

          </div>

        </header>

        <div className="messages-container">

          {messages.map((msg) => (

            <div
              key={msg.id}
              className={`message ${msg.role === "Tú"
                ? "user"
                : "bot"
              }`}
            >

              <span className="message-role">
                <b>{msg.role}</b>
              </span>

              {msg.type === "audio-user" ? (

                <audio controls src={msg.audio}></audio>

              ) : (

                <p className="message-text">
                  {msg.text}
                </p>

              )}

              <span className="message-time">
                {msg.time}
              </span>

            </div>

          ))}

          {isTyping && (
            <div className="typing-indicator">
              LicitIA está escribiendo...
            </div>
          )}

        </div>

        <form
          onSubmit={handleSendMessage}
          className="input-container"
        >

          <button
            type="button"
            className="plus-button"
            onClick={() => setShowMenu(!showMenu)}
          >
            +
          </button>

          {showMenu && (

            <div className="attachment-menu">

              <button
                type="button"
                onClick={() =>
                  fileInputRef.current.click()
                }
              >
                Documento
              </button>

              <button
                type="button"
                onClick={() =>
                  imageInputRef.current.click()
                }
              >
                Imagen
              </button>

            </div>

          )}

          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={(e) =>
              handleFileChange(e, "document")
            }
          />

          <input
            type="file"
            accept="image/*"
            ref={imageInputRef}
            style={{ display: "none" }}
            onChange={(e) =>
              handleFileChange(e, "image")
            }
          />

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
            onClick={handleMicClick}
            className={`mic-button ${
              isRecording ? "recording" : ""
            }`}
          >
            🎙️
          </button>

          <button
            type="submit"
            className="send-button"
          >
            Enviar
          </button>

        </form>

      </div>

    </div>
  );
}

export default Chat;