import React, { useState } from "react";
import { Terminal, Loader2, CheckCircle2, XCircle } from "lucide-react";

function GenerateForm() {
  const [platform, setPlatform] = useState("bmq");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [licenseName, setLicenseName] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Dropdown options
  const platformOptions = ["dev", "test", "preprod"];
  const usernameOptions = ["user1", "user2", "user3", "admin", "testuser"];
  const passwordOptions = ["password123", "test123", "secure456", "demo789"];
  const licenseOptions = ["Exploration type C", "Exploration for Mining", "Exploration for Small Mining", "Exploration for BMQ", "BMQ", "Mining", "Small Mining"];

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    const payload = { platform, username, password, licenseName };

    try {
      const response = await fetch("https://test-data-backend.onrender.com/generate-test-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Error connecting to backend. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-2xl mb-4 backdrop-blur-sm border border-purple-500/30">
            <Terminal className="w-8 h-8 text-purple-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Test Data Generator</h1>
          <p className="text-purple-300/80">Generate test data for your platform</p>
          <div className="inline-block mt-2 px-3 py-1 bg-purple-500/20 rounded-full border border-purple-500/30">
            <span className="text-xs text-purple-300">v0.0</span>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="p-8">
            <div className="space-y-6">
              {/* Platform Dropdown */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-purple-200">
                  Platform
                </label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                >
                  {platformOptions.map((option) => (
                    <option key={option} value={option} className="bg-slate-800">
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Username Dropdown */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-purple-200">
                  Username
                </label>
                <select
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                >
                  <option value="" className="bg-slate-800">Select username</option>
                  {usernameOptions.map((option) => (
                    <option key={option} value={option} className="bg-slate-800">
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Password Dropdown */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-purple-200">
                  Password
                </label>
                <select
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                >
                  <option value="" className="bg-slate-800">Select password</option>
                  {passwordOptions.map((option) => (
                    <option key={option} value={option} className="bg-slate-800">
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* License Name Dropdown */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-purple-200">
                  License Name
                </label>
                <select
                  value={licenseName}
                  onChange={(e) => setLicenseName(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                >
                  <option value="" className="bg-slate-800">Select license</option>
                  {licenseOptions.map((option) => (
                    <option key={option} value={option} className="bg-slate-800">
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-purple-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Test Data"
                )}
              </button>
            </div>
          </div>

          {/* Results Section */}
          {(result || error) && (
            <div className="border-t border-white/10 bg-black/20 p-8">
              {error && (
                <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                  <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-red-300 font-semibold mb-1">Error</h3>
                    <p className="text-red-200/80 text-sm">{error}</p>
                  </div>
                </div>
              )}

              {result && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    <h3 className="text-lg font-semibold text-white">
                      Success
                    </h3>
                  </div>
                  <div className="bg-black/40 rounded-xl p-4 border border-white/5">
                    <pre className="text-sm text-purple-200 overflow-x-auto">
                      {JSON.stringify(result, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-purple-300/60 text-sm">
            Securely generate test data for development
          </p>
        </div>
      </div>
    </div>
  );
}

export default GenerateForm;