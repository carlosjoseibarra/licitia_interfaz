import  { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AnalizarLicitacion from './components/AnalizarLicitacion';
import './App.css';

function App() {
  const [activeView, setActiveView] = useState('analizar');

  return (
    <div className="app">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="main-content">
        {activeView === 'dashboard' && <Dashboard />}
        {activeView === 'licitaciones' && (
          <div className="coming-soon">
            <h1>📋 Licitaciones</h1>
            <p>Próximamente podrás gestionar todas tus licitaciones</p>
          </div>
        )}
        {activeView === 'analizar' && <AnalizarLicitacion />}
        {activeView === 'miEmpresa' && (
          <div className="coming-soon">
            <h1>🏢 Mi Empresa</h1>
            <p>Próximamente podrás configurar el perfil de tu empresa</p>
          </div>
        )}
        {activeView === 'asistente' && (
          <div className="coming-soon">
            <h1>🤖 Asistente IA</h1>
            <p>Próximamente tendrás un asistente inteligente</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;