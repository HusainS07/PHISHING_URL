"use client";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Phishing URL Detector</h1>
      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Check
        </button>
      </form>

      {result && (
        <div className="mt-4 p-4 border rounded">
          <p>
            <strong>Prediction:</strong>{" "}
            {result.prediction === 1 ? "Phishing " : "Safe "}
          </p>
          <p>
            <strong>Probabilities:</strong>{" "}
            {result.probabilities &&
              result.probabilities.map((p, i) => (
                <span key={i}>
                  {i === 0 ? "Safe" : "Phishing"}: {(p * 100).toFixed(2)}%{" "}
                </span>
              ))}
          </p>

          {result.top_features && (
            <div className="mt-4">
              <strong>Top Contributing Features:</strong>
              <ul className="list-disc list-inside">
                {result.top_features.map((f, i) => (
                  <li key={i}>
                    {f.Feature}: {f.SHAP_Value.toFixed(4)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
