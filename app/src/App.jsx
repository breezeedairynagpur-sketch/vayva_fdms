
import { useEffect, useState } from "react";
import { RefreshCw, Search } from "lucide-react";

export default function App() {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const getSettings = async () => {
    try {
      setLoading(true);
      setError("");

      // Calls your existing backend through Vite proxy
      const response = await fetch("/api/settings");
      

      if (!response.ok) {
        throw new Error("Failed to fetch settings");
      }

      const result = await response.json();

      setSettings(result.data || []);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSettings();
  }, []);

  const filteredSettings = settings.filter((item) =>
    [
      item.setting_group,
      item.setting_key,
      item.setting_value,
      item.setting_label,
      item.description
    ]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">

      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Application Settings
            </h1>
            <p className="text-slate-500 mt-2">
              Manage your application settings.
            </p>
          </div>

          <button
            onClick={getSettings}
            className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-xl"
          >
            <RefreshCw size={18} />
            Refresh
          </button>
        </div>

        <div className="grid grid-cols-2 gap-5 mb-6">
          <div className="bg-white p-6 rounded-xl border">
            <p className="text-slate-500 text-sm">Total Settings</p>
            <h2 className="text-3xl font-bold mt-2">
              {settings.length}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-xl border">
            <p className="text-slate-500 text-sm">Filtered Settings</p>
            <h2 className="text-3xl font-bold mt-2">
              {filteredSettings.length}
            </h2>
          </div>
        </div>

        <div className="bg-white rounded-xl border overflow-hidden">

          <div className="p-5 border-b">
            <div className="flex items-center gap-3 border rounded-lg px-4 max-w-md">
              <Search size={18} className="text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search settings..."
                className="w-full py-3 outline-none text-sm"
              />
            </div>
          </div>

          {loading && (
            <p className="text-center p-10 text-slate-500">
              Loading settings...
            </p>
          )}

          {error && (
            <div className="p-6 text-red-600">
              {error}
            </div>
          )}

          {!loading && !error && (
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[1100px]">

                <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="p-4">ID</th>
                    <th className="p-4">Group</th>
                    <th className="p-4">Setting Key</th>
                    <th className="p-4">Setting Value</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">Label</th>
                    <th className="p-4">Description</th>
                    <th className="p-4">Public</th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {filteredSettings.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50">

                      <td className="p-4">#{item.id}</td>

                      <td className="p-4">
                        {item.setting_group}
                      </td>

                      <td className="p-4 font-semibold">
                        {item.setting_key}
                      </td>

                      <td className="p-4 break-all max-w-xs">
                        {item.setting_value ?? "-"}
                      </td>

                      <td className="p-4">
                        {item.value_type}
                      </td>

                      <td className="p-4">
                        {item.setting_label || "-"}
                      </td>

                      <td className="p-4">
                        {item.description || "-"}
                      </td>

                      <td className="p-4">
                        {Number(item.is_public) === 1 ? "Public" : "Private"}
                      </td>

                    </tr>
                  ))}

                  {filteredSettings.length === 0 && (
                    <tr>
                      <td colSpan="8" className="text-center p-10 text-slate-400">
                        No settings found.
                      </td>
                    </tr>
                  )}
                </tbody>

              </table>
            </div>
          )}

          <div className="p-4 border-t text-sm text-slate-400">
            Total: {filteredSettings.length} settings
          </div>

        </div>
      </div>
    </div>
  );
}
