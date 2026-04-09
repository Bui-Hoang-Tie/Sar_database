import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Database, IncidentCore, CollectiveFacilities, WeatherCondition, SpecificSARFacility } from '../types';

const DB_KEY = 'sar_database_v1';

const initialDB: Database = {
  incidents: [],
  collectiveFacilities: {},
  weatherConditions: [],
  specificFacilities: [],
};

interface DatabaseContextType {
  db: Database;
  saveIncident: (incident: IncidentCore) => void;
  deleteIncident: (id: string) => void;
  saveCollectiveFacilities: (facilities: CollectiveFacilities) => void;
  addWeatherCondition: (condition: WeatherCondition) => void;
  deleteWeatherCondition: (id: string) => void;
  addSpecificFacility: (facility: SpecificSARFacility) => void;
  deleteSpecificFacility: (id: string) => void;
}

const DatabaseContext = createContext<DatabaseContextType | null>(null);

export function DatabaseProvider({ children }: { children: React.ReactNode }) {
  const [db, setDb] = useState<Database>(() => {
    const stored = localStorage.getItem(DB_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse database', e);
        return initialDB;
      }
    }
    return initialDB;
  });

  useEffect(() => {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
  }, [db]);

  const saveIncident = useCallback((incident: IncidentCore) => {
    setDb(prev => {
      const exists = prev.incidents.find(i => i.id === incident.id);
      if (exists) {
        return {
          ...prev,
          incidents: prev.incidents.map(i => i.id === incident.id ? incident : i)
        };
      }
      return {
        ...prev,
        incidents: [...prev.incidents, incident]
      };
    });
  }, []);

  const deleteIncident = useCallback((id: string) => {
    setDb(prev => {
      const newCollective = { ...prev.collectiveFacilities };
      delete newCollective[id];
      
      return {
        ...prev,
        incidents: prev.incidents.filter(i => i.id !== id),
        collectiveFacilities: newCollective,
        weatherConditions: prev.weatherConditions.filter(w => w.incidentId !== id),
        specificFacilities: prev.specificFacilities.filter(f => f.incidentId !== id),
      };
    });
  }, []);

  const saveCollectiveFacilities = useCallback((facilities: CollectiveFacilities) => {
    setDb(prev => ({
      ...prev,
      collectiveFacilities: {
        ...prev.collectiveFacilities,
        [facilities.incidentId]: facilities
      }
    }));
  }, []);

  const addWeatherCondition = useCallback((condition: WeatherCondition) => {
    setDb(prev => ({
      ...prev,
      weatherConditions: [...prev.weatherConditions, condition]
    }));
  }, []);

  const deleteWeatherCondition = useCallback((id: string) => {
    setDb(prev => ({
      ...prev,
      weatherConditions: prev.weatherConditions.filter(w => w.id !== id)
    }));
  }, []);

  const addSpecificFacility = useCallback((facility: SpecificSARFacility) => {
    setDb(prev => ({
      ...prev,
      specificFacilities: [...prev.specificFacilities, facility]
    }));
  }, []);

  const deleteSpecificFacility = useCallback((id: string) => {
    setDb(prev => ({
      ...prev,
      specificFacilities: prev.specificFacilities.filter(f => f.id !== id)
    }));
  }, []);

  return (
    <DatabaseContext.Provider value={{
      db,
      saveIncident,
      deleteIncident,
      saveCollectiveFacilities,
      addWeatherCondition,
      deleteWeatherCondition,
      addSpecificFacility,
      deleteSpecificFacility,
    }}>
      {children}
    </DatabaseContext.Provider>
  );
}

export function useDatabase() {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
}
