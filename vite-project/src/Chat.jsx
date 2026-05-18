import './Chat.css'

function Chat(){

    return(

        <div className="chat-container">

            {/* HEADER */}

            <div className="chat-header">

                <h1> Licitia </h1>

                <small>
                    Asistente inteligente de licitaciones publicas
                </small>

            </div>

            {/* MENSAJES */}

            <div className="chat-messages">

                {/* MENSAJE BOT */}

                <div className="message bot">

                    <div className="role">
                         Licitia
                    </div>

                    <div>

                         ¡Bienvenido a Licitia!

                        <br /><br />

                        Soy tu asistente inteligente especializado
                        en licitaciones públicas y procesos de contratación.

                        <br /><br />

                        Puedo ayudarte con:
                        <br />
                        •  Licitaciones
                        <br />
                        •  Búsquedas
                        <br />
                        •  Pliegos
                        <br />
                        •  Consultas

                    </div>

                    <div className="time">
                        10:45 PM
                    </div>

                </div>

            </div>

            {/* INPUT */}

            <div className="chat-input">

                <input
                    type="text"
                    placeholder="Escribe un mensaje..."
                />

                <button>
                    Enviar
                </button>

            </div>

        </div>
    )
}

export default Chat