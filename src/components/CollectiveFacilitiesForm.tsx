import React, { useState, useEffect } from 'react';
import { useDatabase } from '../hooks/useDatabase';
import { CollectiveFacilities } from '../types';

interface Props {
  incidentId: string;
}

export default function CollectiveFacilitiesForm({ incidentId }: Props) {
  const { db, saveCollectiveFacilities } = useDatabase();
  
  const [facilities, setFacilities] = useState<CollectiveFacilities>(() => {
    const existing = db.collectiveFacilities[incidentId];
    if (existing) return existing;
    return {
      incidentId,
      numberOfAeronauticalUnits: 0,
      numberOfGroundUnits: 0,
      numberOfMaritimeUnits: 0,
      sorties: 0,
      dateTasked: '',
      timeTasked: '',
      dateOnScene: '',
      timeOnScene: '',
      dateSearchObjectFound: '',
      timeSearchObjectFound: '',
      dateSearchEnded: '',
      timeSearchEnded: '',
      dateNormal: '',
      timeNormal: '',
      formalSearchPlan: false,
      amountOfAreaSearched: 0,
    };
  });

  // Auto-save when changed
  useEffect(() => {
    saveCollectiveFacilities(facilities);
  }, [facilities, saveCollectiveFacilities]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    let parsedValue: any = value;
    if (type === 'checkbox') {
      parsedValue = (e.target as HTMLInputElement).checked;
    } else if (type === 'number') {
      parsedValue = value === '' ? 0 : Number(value);
    }

    setFacilities(prev => ({ ...prev, [name]: parsedValue }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-200">
          Collective SAR Facilities (Fields 31-46)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Aeronautical Units</label>
            <input
              type="number"
              name="numberOfAeronauticalUnits"
              value={facilities.numberOfAeronauticalUnits || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Ground Units</label>
            <input
              type="number"
              name="numberOfGroundUnits"
              value={facilities.numberOfGroundUnits || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Maritime Units</label>
            <input
              type="number"
              name="numberOfMaritimeUnits"
              value={facilities.numberOfMaritimeUnits || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Total Sorties</label>
            <input
              type="number"
              name="sorties"
              value={facilities.sorties || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Date Tasked</label>
            <input
              type="date"
              name="dateTasked"
              value={facilities.dateTasked}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Time Tasked (UTC)</label>
            <input
              type="time"
              name="timeTasked"
              value={facilities.timeTasked}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Date On-Scene</label>
            <input
              type="date"
              name="dateOnScene"
              value={facilities.dateOnScene}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Time On-Scene (UTC)</label>
            <input
              type="time"
              name="timeOnScene"
              value={facilities.timeOnScene}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Date Object Found</label>
            <input
              type="date"
              name="dateSearchObjectFound"
              value={facilities.dateSearchObjectFound}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Time Object Found (UTC)</label>
            <input
              type="time"
              name="timeSearchObjectFound"
              value={facilities.timeSearchObjectFound}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Date Search Ended</label>
            <input
              type="date"
              name="dateSearchEnded"
              value={facilities.dateSearchEnded}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Time Search Ended (UTC)</label>
            <input
              type="time"
              name="timeSearchEnded"
              value={facilities.timeSearchEnded}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Date Normal</label>
            <input
              type="date"
              name="dateNormal"
              value={facilities.dateNormal}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Time Normal (UTC)</label>
            <input
              type="time"
              name="timeNormal"
              value={facilities.timeNormal}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center h-full pt-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="formalSearchPlan"
                checked={facilities.formalSearchPlan}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-slate-700">Formal Search Plan Used</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Area Searched (sq NM)</label>
            <input
              type="number"
              name="amountOfAreaSearched"
              value={facilities.amountOfAreaSearched || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

        </div>
      </div>
    </div>
  );
}
