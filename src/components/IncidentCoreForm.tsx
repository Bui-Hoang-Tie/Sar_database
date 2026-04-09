import React from 'react';
import { IncidentCore } from '../types';

interface Props {
  incident: IncidentCore;
  setIncident: React.Dispatch<React.SetStateAction<IncidentCore>>;
}

export default function IncidentCoreForm({ incident, setIncident }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    let parsedValue: any = value;
    if (type === 'checkbox') {
      parsedValue = (e.target as HTMLInputElement).checked;
    } else if (type === 'number') {
      parsedValue = value === '' ? 0 : Number(value);
    }

    setIncident(prev => ({ ...prev, [name]: parsedValue }));
  };

  return (
    <div className="space-y-8">
      {/* Section 1: Incident Overview */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-200">
          Incident Overview (Fields 1-20)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex items-center h-full pt-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="sarCase"
                checked={incident.sarCase}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-slate-700">SAR Case (Pure SAR Data)</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">RCC Name</label>
            <input
              type="text"
              name="rcc"
              value={incident.rcc}
              onChange={handleChange}
              placeholder="e.g., Victoria"
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Incident Number</label>
            <input
              type="number"
              name="incidentNumber"
              value={incident.incidentNumber || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Year</label>
            <input
              type="number"
              name="year"
              value={incident.year || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={incident.startDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Start Time (UTC)</label>
            <input
              type="time"
              name="startTime"
              value={incident.startTime}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Incident Date</label>
            <input
              type="date"
              name="incidentDate"
              value={incident.incidentDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Incident Time (UTC)</label>
            <input
              type="time"
              name="incidentTime"
              value={incident.incidentTime}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center h-full pt-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="smc"
                checked={incident.smc}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-slate-700">RCC is SMC</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">SMC Start Date</label>
            <input
              type="date"
              name="smcStartDate"
              value={incident.smcStartDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">SMC Start Time (UTC)</label>
            <input
              type="time"
              name="smcStartTime"
              value={incident.smcStartTime}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">SMC End Date</label>
            <input
              type="date"
              name="smcEndDate"
              value={incident.smcEndDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">SMC End Time (UTC)</label>
            <input
              type="time"
              name="smcEndTime"
              value={incident.smcEndTime}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Datum Latitude</label>
            <input
              type="text"
              name="searchObjectLatitude"
              value={incident.searchObjectLatitude}
              onChange={handleChange}
              placeholder="DDMM.MX"
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Datum Longitude</label>
            <input
              type="text"
              name="searchObjectLongitude"
              value={incident.searchObjectLongitude}
              onChange={handleChange}
              placeholder="DDDMM.MY"
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Found Latitude</label>
            <input
              type="text"
              name="objectFoundLatitude"
              value={incident.objectFoundLatitude}
              onChange={handleChange}
              placeholder="DDMM.MX"
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Found Longitude</label>
            <input
              type="text"
              name="objectFoundLongitude"
              value={incident.objectFoundLongitude}
              onChange={handleChange}
              placeholder="DDDMM.MY"
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Distance Offshore (NM)</label>
            <input
              type="number"
              name="distanceOffshore"
              value={incident.distanceOffshore || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Who Alerted</label>
            <select
              name="whoAlerted"
              value={incident.whoAlerted}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">Select...</option>
              <option value="1">1 - Object in distress</option>
              <option value="2">2 - Relay</option>
              <option value="3">3 - Other RCC</option>
              <option value="4">4 - MCC (COSPAS-SARSAT)</option>
              <option value="5">5 - Independent observer</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Incident Type</label>
            <select
              name="incidentType"
              value={incident.incidentType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">Select...</option>
              <option value="1">1 - Distress</option>
              <option value="2">2 - Precautionary</option>
              <option value="3">3 - Hoax</option>
              <option value="4">4 - False Alert</option>
              <option value="5">5 - Not Found</option>
              <option value="6">6 - MEDICO</option>
            </select>
          </div>
        </div>
      </div>

      {/* Section 2: Search Object */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-200">
          Search Object (Fields 21-30)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Object Name</label>
            <input
              type="text"
              name="searchObjectName"
              value={incident.searchObjectName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Official Number (IMO)</label>
            <input
              type="text"
              name="searchObjectOfficialNumber"
              value={incident.searchObjectOfficialNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Radio Callsign</label>
            <input
              type="text"
              name="searchObjectRadioCallsign"
              value={incident.searchObjectRadioCallsign}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nationality</label>
            <input
              type="text"
              name="nationalityOfSearchObject"
              value={incident.nationalityOfSearchObject}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Type of Object</label>
            <select
              name="typeOfSearchObject"
              value={incident.typeOfSearchObject}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">Select (01-25)...</option>
              <option value="01">01 - SOLAS Passenger Ship</option>
              <option value="02">02 - SOLAS Cargo Ship</option>
              <option value="03">03 - Non-SOLAS Passenger Ship</option>
              <option value="04">04 - Non-SOLAS Cargo Ship</option>
              <option value="05">05 - Non-SOLAS Fishing Vessel</option>
              <option value="06">06 - Pleasure Craft (Motor)</option>
              <option value="07">07 - Pleasure Craft (Sail)</option>
              <option value="08">08 - Pleasure Craft (Unpowered)</option>
              <option value="09">09 - Offshore Installation/Rig</option>
              <option value="10">10 - Tug / Tow</option>
              <option value="11">11 - Barge / Pontoon</option>
              <option value="12">12 - Hovercraft / WIG</option>
              <option value="13">13 - Submarine</option>
              <option value="14">14 - Military Vessel</option>
              <option value="15">15 - Other / Unknown Vessel</option>
              <option value="16">16 - Commercial Aircraft (Rotary Wing)</option>
              <option value="17">17 - General Aviation (Fixed Wing)</option>
              <option value="18">18 - General Aviation (Rotary Wing)</option>
              <option value="19">19 - Commercial Aircraft (Fixed Wing)</option>
              <option value="20">20 - Military Aircraft</option>
              <option value="21">21 - Other / Unknown Aircraft</option>
              <option value="22">22 - Person in Water (Swimmer/Diver)</option>
              <option value="23">23 - Person (Surfer/Boarder)</option>
              <option value="24">24 - Person (Parachutist/Skydiver)</option>
              <option value="25">25 - Person (Other/Unknown)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Persons on Board (POB)</label>
            <input
              type="number"
              name="pob"
              value={incident.pob || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Lives Lost Before Notification</label>
            <input
              type="number"
              name="livesLostBeforeNotification"
              value={incident.livesLostBeforeNotification || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Lives Lost After Notification</label>
            <input
              type="number"
              name="livesLostAfterNotification"
              value={incident.livesLostAfterNotification || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Lives Saved</label>
            <input
              type="number"
              name="livesSaved"
              value={incident.livesSaved || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Value of Property Saved</label>
            <input
              type="number"
              name="valueOfPropertySaved"
              value={incident.valueOfPropertySaved || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
