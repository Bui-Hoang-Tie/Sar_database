import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import IncidentForm from './components/IncidentForm';
import { Ship } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'form'>('dashboard');
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(null);

  const handleOpenIncident = (id: string) => {
    setSelectedIncidentId(id);
    setCurrentView('form');
  };

  const handleCreateIncident = () => {
    setSelectedIncidentId(null);
    setCurrentView('form');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedIncidentId(null);
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900">
      {currentView === 'dashboard' && (
        <>
          <header className="bg-slate-900 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-3">
              <Ship className="text-blue-400" size={28} />
              <h1 className="text-xl font-bold tracking-tight">SAR Database System</h1>
              <span className="ml-2 px-2 py-0.5 rounded text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
                COMSAR/Circ.22
              </span>
            </div>
          </header>
          <main>
            <Dashboard 
              onOpenIncident={handleOpenIncident} 
              onCreateIncident={handleCreateIncident} 
            />
          </main>
        </>
      )}
      
      {currentView === 'form' && (
        <IncidentForm 
          incidentId={selectedIncidentId} 
          onBack={handleBackToDashboard} 
        />
      )}
    </div>
  );
}
