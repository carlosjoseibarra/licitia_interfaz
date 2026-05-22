import 'react';

const Sidebar = ({ activeView, setActiveView }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'licitaciones', label: 'Licitaciones', icon: '📄' },
    { id: 'analizar', label: 'Analizar', icon: '🔍' },
    { id: 'miEmpresa', label: 'Mi Empresa', icon: '🏢' },
    { id: 'asistente', label: 'Asistente IA', icon: '🤖' }
  ];

  return (
    <aside className="sidebar">
      <div className="logo">
        <h2>LicitIA</h2>
        <p>Inteligencia para licitar</p>
      </div>
      <nav>
        {menuItems.map(item => (
          <button
            key={item.id}
            className={`menu-item ${activeView === item.id ? 'active' : ''}`}
            onClick={() => setActiveView(item.id)}
          >
            <span className="icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;