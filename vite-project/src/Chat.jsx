import { useState, useRef } from 'react';
import './Chat.css';

// Componente SVG para el Robot Moderno y Tecnológico
const ModernRobotIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="modern-robot-svg">
        <path d="M12 2V4" />
        <path d="M12 17V22" />
        <path d="M5 17H19" />
        <rect x="4" y="6" width="16" height="11" rx="3" />
        <circle cx="8" cy="11" r="1" fill="currentColor" />
        <circle cx="16" cy="11" r="1" fill="currentColor" />
        <path d="M10 14h4" />
    </svg>
);

function Chat() {
    const [messages, setMessages] = useState([
        {
            id: 1,
            role: 'Licia',
            text: '¡Bienvenido a Licia! Soy tu asistente inteligente especializado en licitaciones públicas y procesos de contratación. Puedo ayudarte con pliegos, búsquedas y consultas. También puedes adjuntar un PDF o una foto usando el clip 📎.',
            time: '22:45',
            type: 'bot',
            attachmentType: null
        }
    ]);

    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    
    const fileInputRef = useRef(null);
    const imageInputRef = useRef(null);

    const getFormatedTime = () => {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMessage = {
            id: Date.now(),
            role: 'Usuario',
            text: inputValue,
            time: getFormatedTime(),
            type: 'user',
            attachmentType: null
        };

        setMessages((prev) => [...prev, userMessage]);
        const textSent = inputValue;
        setInputValue('');
        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);
            const botMessage = {
                id: Date.now() + 1,
                role: 'Licia',
                text: `¡Claro! He recibido tu consulta: "${textSent}". Estoy analizando las bases de datos de contratación pública y el SECOP...`,
                time: getFormatedTime(),
                type: 'bot',
                attachmentType: null
            };
            setMessages((prev) => [...prev, botMessage]);
        }, 1800);
    };

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (!file) return;

        setShowMenu(false);

        let userMessage = {
            id: Date.now(),
            role: 'Usuario',
            text: file.name,
            time: getFormatedTime(),
            type: 'user',
            attachmentType: type,
            fileUrl: type === 'image' ? URL.createObjectURL(file) : null
        };

        setMessages((prev) => [...prev, userMessage]);
        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);
            let botResponseText = type === 'pdf' 
                ? `📄 He recibido el documento: "${file.name}". Estoy extrayendo los requisitos habilitantes y el presupuesto estimado. Dame un momento...`
                : `✅ Recibida la imagen. Estoy extrayendo los puntos clave de la licitación mediante OCR. (Analizando: ${file.name}).`;

            const botMessage = {
                id: Date.now() + 1,
                role: 'Licia',
                text: botResponseText,
                time: getFormatedTime(),
                type: 'bot',
                attachmentType: null
            };
            setMessages((prev) => [...prev, botMessage]);
        }, 2200);

        if (fileInputRef.current) fileInputRef.current.value = '';
        if (imageInputRef.current) imageInputRef.current.value = '';
    };

    return (
        <div className="chat-container">
            {/* HEADER CON MASCOTA FLOTANTE MODERNA */}
            <div className="chat-header">
                <div className="header-info">
                    <h1>Licia <div className="header-robot-icon"><ModernRobotIcon /></div></h1>
                    <small>Asistente inteligente de licitaciones públicas, ahora con carga de medios.</small>
                </div>
                <div className="floating-robot-mascot">
                    <ModernRobotIcon />
                </div>
            </div>

            {/* CUERPO DE MENSAJES */}
            <div className="chat-messages">
                {messages.map((msg) => (
                    <div key={msg.id} className={`message ${msg.type} ${msg.attachmentType ? 'has-attachment' : ''}`}>
                        {msg.type === 'bot' && (
                            <div className="avatar bot-avatar animated-hello">
                                <ModernRobotIcon />
                            </div>
                        )}
                        {msg.type === 'user' && <div className="avatar user-avatar">👤</div>}

                        <div className="message-content">
                            <div className="role">{msg.role}</div>
                            
                            {msg.attachmentType === 'pdf' && (
                                <div className="attachment-box pdf-box">
                                    <span className="file-icon">📄</span>
                                    <span className="file-name">{msg.text}</span>
                                </div>
                            )}

                            {msg.attachmentType === 'image' && (
                                <div className="attachment-box image-box">
                                    <img src={msg.fileUrl} alt="Adjunto de usuario" className="chat-uploaded-img" />
                                    <div className="image-caption">Aquí tienes una foto del pliego.</div>
                                </div>
                            )}

                            {msg.attachmentType !== 'image' && <div className="text-content">{msg.text}</div>}
                            
                            <div className="time">{msg.time}</div>
                        </div>
                    </div>
                ))}

                {/* ANIMACIÓN DE CARGA / TYPING EFFECT */}
                {isTyping && (
                    <div className="message bot typing-bubble">
                        <div className="avatar bot-avatar">
                            <ModernRobotIcon />
                        </div>
                        <div className="message-content">
                            <div className="role">Licia</div>
                            <div className="typing-dots">
                                <span></span><span></span><span></span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* FORMULARIO DE ENTRADA */}
            <form onSubmit={handleSendMessage} className="chat-input-area">
                <input type="file" ref={fileInputRef} accept=".pdf" style={{ display: 'none' }} onChange={(e) => handleFileChange(e, 'pdf')} />
                <input type="file" ref={imageInputRef} accept="image/*" style={{ display: 'none' }} onChange={(e) => handleFileChange(e, 'image')} />

                <div className="attach-button-wrapper">
                    <button type="button" className="attach-btn" onClick={() => setShowMenu(!showMenu)}>📎</button>
                    {showMenu && (
                        <div className="attachments-popupMenu">
                            <div className="menu-item" onClick={() => imageInputRef.current.click()}>
                                <span className="icon item-camera">📷</span><small>Cámara</small>
                            </div>
                            <div className="menu-item" onClick={() => imageInputRef.current.click()}>
                                <span className="icon item-gallery">🖼️</span><small>Galería de Fotos</small>
                            </div>
                            <div className="menu-item" onClick={() => fileInputRef.current.click()}>
                                <span className="icon item-pdf">📄</span><small>PDF</small>
                            </div>
                        </div>
                    )}
                </div>

                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Escribe un mensaje o adjunta un pliego..."
                    className="main-text-input"
                />
                <button type="submit" className="send-btn">Enviar</button>
            </form>
        </div>
    );
}

export default Chat;