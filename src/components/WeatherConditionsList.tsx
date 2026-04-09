import React, { useState } from 'react';
import { useDatabase } from '../hooks/useDatabase';
import { WeatherCondition } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  incidentId: string;
}

export default function WeatherConditionsList({ incidentId }: Props) {
  const { db, addWeatherCondition, deleteWeatherCondition } = useDatabase();
  const conditions = db.weatherConditions.filter(w => w.incidentId === incidentId);
  
  const [isAdding, setIsAdding] = useState(false);
  const [newCondition, setNewCondition] = useState<Partial<WeatherCondition>>({
    dateWeather: '',
    timeWeather: '',
    windSpeed: '',
    windDirection: '',
    airTemperature: 0,
    seaTemperature: 0,
    seaState: '',
    swellHeight: 0,
    seaIceConditions: '',
    cloudCover: '',
    cloudCeiling: '',
    visibility: '',
    precipitation: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let parsedValue: any = value;
    if (type === 'number') {
      parsedValue = value === '' ? 0 : Number(value);
    }
    setNewCondition(prev => ({ ...prev, [name]: parsedValue }));
  };

  const handleSave = () => {
    addWeatherCondition({
      ...newCondition,
      id: uuidv4(),
      incidentId,
    } as WeatherCondition);
    setIsAdding(false);
    setNewCondition({
      dateWeather: '', timeWeather: '', windSpeed: '', windDirection: '',
      airTemperature: 0, seaTemperature: 0, seaState: '', swellHeight: 0,
      seaIceConditions: '', cloudCover: '', cloudCeiling: '', visibility: '', precipitation: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-2 border-b border-slate-200">
        <h2 className="text-lg font-semibold text-slate-900">
          Weather Conditions (Fields 47-59)
        </h2>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors"
          >
            <Plus size={16} /> Add Observation
          </button>
        )}
      </div>

      {isAdding && (
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
          <h3 className="text-sm font-medium text-slate-800 mb-4">New Weather Observation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Date</label>
              <input type="date" name="dateWeather" value={newCondition.dateWeather} onChange={handleChange} className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Time (UTC)</label>
              <input type="time" name="timeWeather" value={newCondition.timeWeather} onChange={handleChange} className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Wind Speed</label>
              <input type="text" name="windSpeed" value={newCondition.windSpeed} onChange={handleChange} placeholder="e.g., 15kts" className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Wind Dir (WMO 0877)</label>
              <input type="text" name="windDirection" value={newCondition.windDirection} onChange={handleChange} placeholder="e.g., 36" className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Air Temp (°C)</label>
              <input type="number" name="airTemperature" value={newCondition.airTemperature || ''} onChange={handleChange} className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Sea Temp (°C)</label>
              <input type="number" name="seaTemperature" value={newCondition.seaTemperature || ''} onChange={handleChange} className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Sea State (WMO 3700)</label>
              <select name="seaState" value={newCondition.seaState} onChange={handleChange} className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded bg-white">
                <option value="">Select...</option>
                <option value="0">0 - Calm (glassy)</option>
                <option value="1">1 - Calm (rippled)</option>
                <option value="2">2 - Smooth (wavelets)</option>
                <option value="3">3 - Slight</option>
                <option value="4">4 - Moderate</option>
                <option value="5">5 - Rough</option>
                <option value="6">6 - Very rough</option>
                <option value="7">7 - High</option>
                <option value="8">8 - Very high</option>
                <option value="9">9 - Phenomenal</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Swell Height (m)</label>
              <input type="number" name="swellHeight" value={newCondition.swellHeight || ''} onChange={handleChange} className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Cloud Cover (Oktas)</label>
              <select name="cloudCover" value={newCondition.cloudCover} onChange={handleChange} className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded bg-white">
                <option value="">Select...</option>
                <option value="0">0 - Clear</option>
                <option value="1">1 - 1 Okta</option>
                <option value="4">4 - 4 Oktas</option>
                <option value="8">8 - Overcast</option>
                <option value="9">9 - Obscured</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Visibility (WMO 4377)</label>
              <select name="visibility" value={newCondition.visibility} onChange={handleChange} className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded bg-white">
                <option value="">Select...</option>
                <option value="00">00 - &lt; 0.1km</option>
                <option value="10">10 - 1km</option>
                <option value="50">50 - 5km</option>
                <option value="90">90 - 50km</option>
                <option value="99">99 - &gt;= 50km</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button onClick={() => setIsAdding(false)} className="px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-200 rounded">Cancel</button>
            <button onClick={handleSave} className="px-3 py-1.5 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded">Save Observation</button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
            <tr>
              <th className="px-4 py-2">Date/Time</th>
              <th className="px-4 py-2">Wind</th>
              <th className="px-4 py-2">Temp (Air/Sea)</th>
              <th className="px-4 py-2">Sea State</th>
              <th className="px-4 py-2">Visibility</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {conditions.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                  No weather observations recorded.
                </td>
              </tr>
            ) : (
              conditions.map(c => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="px-4 py-2">{c.dateWeather} {c.timeWeather}</td>
                  <td className="px-4 py-2">{c.windSpeed} / {c.windDirection}</td>
                  <td className="px-4 py-2">{c.airTemperature}°C / {c.seaTemperature}°C</td>
                  <td className="px-4 py-2">{c.seaState}</td>
                  <td className="px-4 py-2">{c.visibility}</td>
                  <td className="px-4 py-2 text-right">
                    <button onClick={() => deleteWeatherCondition(c.id)} className="text-red-500 hover:text-red-700 p-1">
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
