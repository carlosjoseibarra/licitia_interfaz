import { useState } from "react";
import "./Analyzer.css";

function Analyzer() {

  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const analyzePliego = () => {

    if (!text.trim()) {
      alert("Debes pegar el pliego.");
      return;
    }

    setLoading(true);

    setTimeout(() => {

      setLoading(false);

      setAnalysis({
        compatibility: "87%",
        risks: [
          "Riesgo contractual medio",
          "Experiencia mínima exigida",
        ],
        requirements: [
          "RUP actualizado",
          "Estados financieros",
          "Capacidad organizacional",
        ],
        recommendation:
          "Tu empresa tiene alta probabilidad de aplicar.",
      });

    }, 3000);
  };

  const clearText = () => {
    setText("");
    setAnalysis(null);
  };

  return (

    <div className="analyzer-container">

      <div className="analyzer-left">

        <div className="card">

          <h2>Texto del pliego</h2>

          <p>
            Pega el contenido del pliego de condiciones
          </p>

          <textarea
            placeholder="Pega aquí el pliego..."
            value={text}
            onChange={(e) =>
              setText(e.target.value)
            }
          ></textarea>

          <div className="buttons">

            <button
              className="clear-btn"
              onClick={clearText}
            >
              Limpiar
            </button>

            <button
              className="analyze-btn"
              onClick={analyzePliego}
            >
              Analizar con IA
            </button>

          </div>

        </div>

      </div>

      <div className="analyzer-right">

        <div className="card">

          <h2>Análisis del pliego</h2>

          {!loading && !analysis && (

            <div className="empty-analysis">

              <div className="icon">
                📄
              </div>

              <p>
                Aquí aparecerá el análisis inteligente
                del pliego.
              </p>

            </div>

          )}

          {loading && (

            <div className="loading">

              <div className="loader"></div>

              <p>
                Analizando requisitos...
              </p>

            </div>

          )}

          {analysis && (

            <div className="analysis-results">

              <div className="compatibility-card">

                <h3>Compatibilidad</h3>

                <span>
                  {analysis.compatibility}
                </span>

              </div>

              <div className="section">

                <h4>
                  Documentos requeridos
                </h4>

                {analysis.requirements.map((item, i) => (
                  <div
                    key={i}
                    className="item"
                  >
                    ✔ {item}
                  </div>
                ))}

              </div>

              <div className="section">

                <h4>
                  Riesgos detectados
                </h4>

                {analysis.risks.map((item, i) => (
                  <div
                    key={i}
                    className="warning"
                  >
                    ⚠ {item}
                  </div>
                ))}

              </div>

              <div className="recommendation">

                💡 {analysis.recommendation}

              </div>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default Analyzer;