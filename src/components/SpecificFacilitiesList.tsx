import React, { useState } from 'react';
import { useDatabase } from '../hooks/useDatabase';
import { SpecificSARFacility } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  incidentId: string;
}

export default function SpecificFacilitiesList({ incidentId }: Props) {
  const { db, addSpecificFacility, deleteSpecificFacility } = useDatabase();
  const facilities = db.specificFacilities.filter(f => f.incidentId === incidentId);
  
  const [isAdding, setIsAdding] = useState(false);
  const [newFacility, setNewFacility] = useState<Partial<SpecificSARFacility>>({
    sarFacilityType: '',
    sarFacilityName: '',
    sarFacilityRadioCallsign: '',
    sarFacilityNationality: '',
    sarFacilityDateTasked: '',
    sarFacilityTimeTasked: '',
    sarFacilityDateResponded: '',
    sarFacilityTimeResponded: '',
    sarFacilityDateOnScene: '',
    sarFacilityTimeOnScene: '',
    sarFacilitySorties: 0,
    sarFacilityDownTime: '',
    numberLivesRescued: 0,
    numberDeceasedRecovered: 0,
    sarFacilityDateReleased: '',
    sarFacilityTimeReleased: '',
    sarFacilityDateNormal: '',
    sarFacilityTimeNormal: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let parsedValue: any = value;
    if (type === 'number') {
      parsedValue = value === '' ? 0 : Number(value);
    }
    setNewFacility(prev => ({ ...prev, [name]: parsedValue }));
  };

  const handleSave = () => {
    addSpecificFacility({
      ...newFacility,
      id: uuidv4(),
      incidentId,
    } as SpecificSARFacility);
    setIsAdding(false);
    setNewFacility({
      sarFacilityType: '', sarFacilityName: '', sarFacilityRadioCallsign: '', sarFacilityNationality: '',
      sarFacilityDateTasked: '', sarFacilityTimeTasked: '', sarFacilityDateResponded: '', sarFacilityTimeResponded: '',
      sarFacilityDateOnScene: '', sarFacilityTimeOnScene: '', sarFacilitySorties: 0, sarFacilityDownTime: '',
      numberLivesRescued: 0, numberDeceasedRecovered: 0, sarFacilityDateReleased: '', sarFacilityTimeReleased: '',
      sarFacilityDateNormal: '', sarFacilityTimeNormal: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-2 border-b border-slate-200">
        <h2 className="text-lg font-semibold text-slate-900">
          Specific SAR Facilities (Fields 60-77)
        </h2>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors"
          >
            <Plus size={16} /> Add Facility
          </button>
        )}
      </div>

      {isAdding && (
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <h3 className="text-sm font-medium text-slate-800 mb-4">New Facility Deployment</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Type (A/G/M)</label>
              <select name="sarFacilityType" value={newFacility.sarFacilityType} onChange={handleChange} className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded bg-white">
                <option value="">Select...</option>
                <option value="A">A - Aeronautical</option>
                <option value="G">G - Ground</option>
                <option value="M">M - Maritime</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Name</label>
              <input type="text" name="sarFacilityName" value={newFacility.sarFacilityName} onChange={handleChange} placeholder="e.g., CSB 8001" className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Callsign</label>
              <input type="text" name="sarFacilityRadioCallsign" value={newFacility.sarFacilityRadioCallsign} onChange={handleChange} className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Nationality</label>
              <input type="text" name="sarFacilityNationality" value={newFacility.sarFacilityNationality} onChange={handleChange} className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Date Tasked</label>
              <input type="date" name="sarFacilityDateTasked" value={newFacility.sarFacilityDateTasked} onChange={handleChange} className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Time Tasked (UTC)</label>
              <input type="time" name="sarFacilityTimeTasked" value={newFacility.sarFacilityTimeTasked} onChange={handleChange} className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Date On-Scene</label>
              <input type="date" name="sarFacilityDateOnScene" value={newFacility.sarFacilityDateOnScene} onChange={handleChange} className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Time On-Scene (UTC)</label>
              <input type="time" name="sarFacilityTimeOnScene" value={newFacility.sarFacilityTimeOnScene} onChange={handleChange} className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Lives Rescued</label>
              <input type="number" name="numberLivesRescued" value={newFacility.numberLivesRescued || ''} onChange={handleChange} className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Deceased Recovered</label>
              <input type="number" name="numberDeceasedRecovered" value={newFacility.numberDeceasedRecovered || ''} onChange={handleChange} className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Down-Time (DDHHMM)</label>
              <input type="text" name="sarFacilityDownTime" value={newFacility.sarFacilityDownTime} onChange={handleChange} placeholder="e.g., 011230" className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded" />
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button onClick={() => setIsAdding(false)} className="px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-200 rounded">Cancel</button>
            <button onClick={handleSave} className="px-3 py-1.5 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded">Save Facility</button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
            <tr>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Name / Callsign</th>
              <th className="px-4 py-2">Tasked</th>
              <th className="px-4 py-2">On-Scene</th>
              <th className="px-4 py-2">Rescued</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {facilities.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                  No specific facilities recorded.
                </td>
              </tr>
            ) : (
              facilities.map(f => (
                <tr key={f.id} className="hover:bg-slate-50">
                  <td className="px-4 py-2 font-medium">{f.sarFacilityType}</td>
                  <td className="px-4 py-2">{f.sarFacilityName}<br/><span className="text-xs text-slate-500">{f.sarFacilityRadioCallsign}</span></td>
                  <td className="px-4 py-2">{f.sarFacilityDateTasked} {f.sarFacilityTimeTasked}</td>
                  <td className="px-4 py-2">{f.sarFacilityDateOnScene} {f.sarFacilityTimeOnScene}</td>
                  <td className="px-4 py-2 text-green-600 font-medium">{f.numberLivesRescued}</td>
                  <td className="px-4 py-2 text-right">
                    <button onClick={() => deleteSpecificFacility(f.id)} className="text-red-500 hover:text-red-700 p-1">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
