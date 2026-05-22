import 'react';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <p>Bienvenido a LicitIA - Tu panel de control de licitaciones</p>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Licitaciones analizadas</h3>
          <p className="stat-number">0</p>
        </div>
        <div className="stat-card">
          <h3>Tasa de éxito promedio</h3>
          <p className="stat-number">0%</p>
        </div>
        <div className="stat-card">
          <h3>Próximas licitaciones</h3>
          <p className="stat-number">0</p>
        </div>
      </div>

      <div className="dashboard-info">
        <p>💡 Comienza analizando una licitación en el módulo <strong>Analizar</strong></p>
      </div>
    </div>
  );
};

export default Dashboard;