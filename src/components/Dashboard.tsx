import React from 'react';
import { useDatabase } from '../hooks/useDatabase';
import { Plus, Search, Trash2, FileText, Download } from 'lucide-react';

interface DashboardProps {
  onOpenIncident: (id: string) => void;
  onCreateIncident: () => void;
}

export default function Dashboard({ onOpenIncident, onCreateIncident }: DashboardProps) {
  const { db, deleteIncident } = useDatabase();

  const handleExportData = () => {
    const dataStr = JSON.stringify(db, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sar_database_export_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 tracking-tight">SAR Incidents</h1>
          <p className="text-slate-500 mt-1">Manage Search and Rescue operations database.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExportData}
            className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
          >
            <Download size={20} />
            <span>Export Data</span>
          </button>
          <button
            onClick={onCreateIncident}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
          >
            <Plus size={20} />
            <span>New Incident</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center gap-4 bg-slate-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search incidents..."
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-3">Incident No.</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">RCC</th>
                <th className="px-6 py-3">Search Object</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {db.incidents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <FileText className="text-slate-300 mb-2" size={32} />
                      <p>No incidents found. Create a new one to get started.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                db.incidents.map((incident) => (
                  <tr key={incident.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {incident.incidentNumber || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {incident.startDate || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {incident.rcc || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {incident.searchObjectName || 'Unknown'}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {incident.incidentType || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => onOpenIncident(incident.id)}
                          className="text-blue-600 hover:text-blue-800 px-3 py-1 rounded hover:bg-blue-50 transition-colors"
                        >
                          View / Edit
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete this incident?')) {
                              deleteIncident(incident.id);
                            }
                          }}
                          className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
