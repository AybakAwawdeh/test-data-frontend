import React, { useState } from "react";

function GenerateForm() {
  const [platform, setPlatform] = useState("bmq");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [licenseName, setLicenseName] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      alert("Error connecting to backend");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Generate Test Data v0.0</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Platform:</label>
          <input value={platform} onChange={(e) => setPlatform(e.target.value)} />
        </div>
        <div>
          <label>Username:</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label>License Name:</label>
          <input value={licenseName} onChange={(e) => setLicenseName(e.target.value)} />
        </div>
        <button type="submit">Generate</button>
      </form>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Result:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default GenerateForm;
