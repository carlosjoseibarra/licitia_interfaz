import  { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const AnalizarLicitacion = () => {
  const [formData, setFormData] = useState({
    entidad: '',
    cuantia: '',
    tipoContrato: '',
    modalidad: '',
    municipio: ''
  });
  const [resultado, setResultado] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAnalizar = () => {
    if (!formData.entidad || !formData.cuantia || !formData.tipoContrato) {
      alert('Por favor completa los campos obligatorios (*)');
      return;
    }

    const cuantiaNum = parseFloat(formData.cuantia);
    let probabilidad = 50;
    
    if (cuantiaNum > 500000000) probabilidad += 15;
    if (cuantiaNum > 1000000000) probabilidad += 10;
    if (cuantiaNum < 100000000) probabilidad -= 10;
    if (formData.modalidad === 'menor') probabilidad += 15;
    if (formData.modalidad === 'licitacion') probabilidad -= 5;
    if (formData.municipio) probabilidad += 5;
    
    probabilidad = Math.min(100, Math.max(0, probabilidad));
    
    // eslint-disable-next-line no-useless-assignment
    let mensaje = '';
    // eslint-disable-next-line no-useless-assignment
    let colorGrafica = '';
    if (probabilidad >= 70) {
      mensaje = '✅ Alta probabilidad - ¡Adelante con la propuesta!';
      colorGrafica = '#27AE60';
    } else if (probabilidad >= 30 && probabilidad < 70) {
      mensaje = '⚠️ Probabilidad media - Analiza más detalles y mejora tu oferta';
      colorGrafica = '#F39C12';
    } else {
      mensaje = '❌ Baja probabilidad - Considera asociarte o mejorar tu perfil';
      colorGrafica = '#E74C3C';
    }
    
    setResultado({
      probabilidad: probabilidad,
      mensaje: mensaje,
      colorGrafica: colorGrafica
    });
  };

  const handleLimpiar = () => {
    setFormData({
      entidad: '',
      cuantia: '',
      tipoContrato: '',
      modalidad: '',
      municipio: ''
    });
    setResultado(null);
  };

  const getDatosGrafica = () => {
    if (!resultado) return [];
    return [
      { name: 'Éxito', value: resultado.probabilidad, color: resultado.colorGrafica },
      { name: 'Riesgo', value: 100 - resultado.probabilidad, color: '#E2E8F0' }
    ];
  };

  return (
    <div className="analizar-container">
      <h1>Analizar Licitación</h1>
      <p>Ingresa los datos de la licitación para predecir tu probabilidad de éxito</p>

      <div className="contenedor-dos-columnas">
        {/* Columna Izquierda - Formulario */}
        <div className="form-card">
          <h2>Datos de la licitación</h2>
          
          <div className="form-group">
            <label>Entidad contratante *</label>
            <input
              type="text"
              name="entidad"
              value={formData.entidad}
              onChange={handleChange}
              placeholder="Ej: Alcaldía de Medellín"
            />
          </div>

          <div className="form-group">
            <label>Cuantía (COP) *</label>
            <input
              type="number"
              name="cuantia"
              value={formData.cuantia}
              onChange={handleChange}
              placeholder="Ej: 150000000"
            />
          </div>

          <div className="form-group">
            <label>Tipo de contrato *</label>
            <select name="tipoContrato" value={formData.tipoContrato} onChange={handleChange}>
              <option value="">Seleccionar</option>
              <option value="prestacion">Prestación de servicios</option>
              <option value="obra">Obra pública</option>
              <option value="suministro">Suministro</option>
              <option value="consultoria">Consultoría</option>
            </select>
          </div>

          <div className="form-group">
            <label>Modalidad de contratación</label>
            <select name="modalidad" value={formData.modalidad} onChange={handleChange}>
              <option value="">-- Ninguna --</option>
              <option value="licitacion">Licitación pública</option>
              <option value="seleccion">Selección abreviada</option>
              <option value="menor">Mínima cuantía</option>
              <option value="concurso">Concurso de méritos</option>
            </select>
          </div>

          <div className="form-group">
            <label>Municipio</label>
            <input
              type="text"
              name="municipio"
              value={formData.municipio}
              onChange={handleChange}
              placeholder="Ej: Bogotá"
            />
          </div>

          <div className="button-group">
            <button className="btn-secondary" onClick={handleLimpiar}>
              Limpiar
            </button>
            <button className="btn-primary" onClick={handleAnalizar}>
              Analizar
            </button>
          </div>
        </div>

        {/* Columna Derecha - Resultado */}
        <div className="resultado-side">
          {resultado ? (
            <div className="result-card">
              <h3>Resultado del análisis</h3>
              
              <div className="grafica-container" style={{ margin: '0 auto' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={getDatosGrafica()}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={55}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="none"
                    >
                      {getDatosGrafica().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="porcentaje-central">
                  <span className="porcentaje-numero">{resultado.probabilidad}%</span>
                  <span className="porcentaje-label">éxito</span>
                </div>
              </div>

              <div className="probabilidad-info">
                <span>🎯 Probabilidad de éxito:</span>
                <strong>{resultado.probabilidad}%</strong>
              </div>
              
              <div className="recomendacion">
                {resultado.mensaje}
              </div>
            </div>
          ) : (
            <div className="resultado-placeholder">
              <div className="placeholder-icon">🔮</div>
              <h3>Esperando análisis</h3>
              <p>Completa el formulario</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalizarLicitacion;