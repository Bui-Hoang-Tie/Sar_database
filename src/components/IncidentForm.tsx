import React, { useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { useDatabase } from '../hooks/useDatabase';
import { v4 as uuidv4 } from 'uuid';
import IncidentCoreForm from './IncidentCoreForm';
import CollectiveFacilitiesForm from './CollectiveFacilitiesForm';
import WeatherConditionsList from './WeatherConditionsList';
import SpecificFacilitiesList from './SpecificFacilitiesList';
import { IncidentCore } from '../types';

interface IncidentFormProps {
  incidentId: string | null;
  onBack: () => void;
}

const TABS = [
  { id: 'core', label: 'General & Object' },
  { id: 'collective', label: 'Collective Facilities' },
  { id: 'weather', label: 'Weather Conditions' },
  { id: 'specific', label: 'Specific Facilities' },
];

export default function IncidentForm({ incidentId, onBack }: IncidentFormProps) {
  const { db, saveIncident } = useDatabase();
  const [activeTab, setActiveTab] = useState('core');
  
  // Initialize or load incident
  const [incident, setIncident] = useState<IncidentCore>(() => {
    if (incidentId) {
      const existing = db.incidents.find(i => i.id === incidentId);
      if (existing) return existing;
    }
    return {
      id: incidentId || uuidv4(),
      incidentNumber: 0,
      year: new Date().getFullYear(),
      sarCase: true,
      rcc: '',
      startDate: '',
      startTime: '',
      incidentDate: '',
      incidentTime: '',
      smc: false,
      smcStartDate: '',
      smcStartTime: '',
      smcEndDate: '',
      smcEndTime: '',
      searchObjectLatitude: '',
      searchObjectLongitude: '',
      objectFoundLatitude: '',
      objectFoundLongitude: '',
      distanceOffshore: 0,
      whoAlerted: '',
      incidentType: '',
      searchObjectName: '',
      searchObjectOfficialNumber: '',
      searchObjectRadioCallsign: '',
      nationalityOfSearchObject: '',
      typeOfSearchObject: '',
      pob: 1,
      livesLostBeforeNotification: 0,
      livesLostAfterNotification: 0,
      livesSaved: 0,
      valueOfPropertySaved: 0,
    };
  });

  const handleSave = () => {
    saveIncident(incident);
    alert('Incident saved successfully!');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 -ml-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-slate-900">
                {incidentId ? `Edit Incident #${incident.incidentNumber || '...'}` : 'New Incident'}
              </h1>
            </div>
          </div>
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors text-sm font-medium"
          >
            <Save size={16} />
            <span>Save Incident</span>
          </button>
        </div>
        
        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8" aria-label="Tabs">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                  ${activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          {activeTab === 'core' && (
            <IncidentCoreForm incident={incident} setIncident={setIncident} />
          )}
          {activeTab === 'collective' && (
            <CollectiveFacilitiesForm incidentId={incident.id} />
          )}
          {activeTab === 'weather' && (
            <WeatherConditionsList incidentId={incident.id} />
          )}
          {activeTab === 'specific' && (
            <SpecificFacilitiesList incidentId={incident.id} />
          )}
        </div>
      </main>
    </div>
  );
}
