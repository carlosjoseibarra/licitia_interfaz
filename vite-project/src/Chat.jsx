import { useState, useRef } from 'react';
import './Chat.css';

function Chat() {
    const [messages, setMessages] = useState([
        {
            id: 1,
            role: 'Licitia',
            text: '¡Bienvenido a Licitia!\n\nSoy tu asistente inteligente especializado en licitaciones públicas y procesos de contratación.\n\nPuedo ayudarte con:\n• Licitaciones\n• Búsquedas\n• Pliegos\n• Consultas\n\nSi tienes un pliego de condiciones en PDF, puedes adjuntarlo usando el botón de clip 📎.',
            time: '10:45 PM',
            type: 'bot',
            isFile: false
        }
    ]);

    const [inputValue, setInputValue] = useState('');
    const fileInputRef = useRef(null); // Referencia para el input oculto de archivos

    const getFormatedTime = () => {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // Función para manejar el envío de mensajes de texto
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMessage = {
            id: Date.now(),
            role: 'Usuario',
            text: inputValue,
            time: getFormatedTime(),
            type: 'user',
            isFile: false
        };

        setMessages((prev) => [...prev, userMessage]);
        const textSent = inputValue;
        setInputValue('');

        setTimeout(() => {
            const botMessage = {
                id: Date.now() + 1,
                role: 'Licitia',
                text: `Recibí tu consulta sobre: "${textSent}". Estoy revisando las bases de datos de contratación pública...`,
                time: getFormatedTime(),
                type: 'bot',
                isFile: false
            };
            setMessages((prev) => [...prev, botMessage]);
        }, 1000);
    };

    // Función que se activa cuando el usuario selecciona un archivo PDF
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validar que sea un archivo PDF
        if (file.type !== 'application/pdf') {
            alert('Por favor, selecciona únicamente archivos en formato PDF.');
            return;
        }

        // 1. Crear el mensaje con el archivo adjunto
        const fileMessage = {
            id: Date.now(),
            role: 'Usuario',
            text: file.name, // Mostramos el nombre del PDF
            time: getFormatedTime(),
            type: 'user',
            isFile: true // Bandera para saber que es un archivo
        };

        setMessages((prev) => [...prev, fileMessage]);

        // Resetear el input para que permita cargar el mismo archivo si se desea
        if (fileInputRef.current) fileInputRef.current.value = '';

        // 2. Simular respuesta del bot analizando el PDF
        setTimeout(() => {
            const botMessage = {
                id: Date.now() + 1,
                role: 'Licitia',
                text: `📄 He recibido el documento: "${file.name}".\n\nEstoy analizando el pliego de condiciones, los requisitos habilitantes, la experiencia requerida y el presupuesto estimado. Dame un momento...`,
                time: getFormatedTime(),
                type: 'bot',
                isFile: false
            };
            setMessages((prev) => [...prev, botMessage]);
        }, 1500);
    };

    // Simular el click en el input oculto al pulsar el botón de clip
    const triggerFileSelect = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="chat-container">
            {/* HEADER */}
            <div className="chat-header">
                <h1> Licitia </h1>
                <small>Asistente inteligente de licitaciones públicas</small>
            </div>

            {/* CONTENEDOR DE MENSAJES */}
            <div className="chat-messages">
                {messages.map((msg) => (
                    <div key={msg.id} className={`message ${msg.type} ${msg.isFile ? 'file-msg' : ''}`}>
                        <div className="role">{msg.role}</div>
                        
                        {/* Si es un archivo, renderiza con un diseño especial de documento */}
                        {msg.isFile ? (
                            <div className="pdf-attachment">
                                <span className="pdf-icon">📄</span>
                                <span className="pdf-name">{msg.text}</span>
                            </div>
                        ) : (
                            <div className="text-content">{msg.text}</div>
                        )}
                        
                        <div className="time">{msg.time}</div>
                    </div>
                ))}
            </div>

            {/* FORMULARIO DE ENTRADA */}
            <form onSubmit={handleSendMessage} className="chat-input">
                {/* Input de tipo file oculto */}
                <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf"
                    style={{ display: 'none' }} 
                />
                
                {/* Botón de clip para adjuntar */}
                <button type="button" className="attach-btn" onClick={triggerFileSelect} title="Adjuntar PDF">
                    📎
                </button>

                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Escribe un mensaje o adjunta un pliego..."
                />
                <button type="submit" className="send-btn">
                    Enviar
                </button>
            </form>
        </div>
    );
}

export default Chat;