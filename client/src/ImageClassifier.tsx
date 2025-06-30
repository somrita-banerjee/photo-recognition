import React, { useState } from "react";

type Label = {
  Confidence: number;
  Name: string;
  ParentName: string;
  TaxonomyLevel: number;
};

type ApiResponse = {
  status: string;
  labels: Label[];
  userMessage: string;
};

const ImageClassifier: React.FC = () => {
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = (reader.result as string).split(",")[1];
      setPreview(reader.result as string);
      setImageBase64(base64);
      setResult(null);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!imageBase64) return;
    if (!apiKey) {
      setError("Please enter your API key.");
      return;
    }
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch(
        "https://ubcvxaz71a.execute-api.ap-south-1.amazonaws.com/prod/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            photo: imageBase64,
            apiKey: apiKey,
          }),
        }
      );

      if (!res.ok) throw new Error("API request failed");

      const data: ApiResponse = await res.json();
      setResult(data);
    } catch (err) {
      console.log(err);
      setError("Failed to classify image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto justify-center p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Photo Safety Classifier</h2>
      <p className="mb-4 text-gray-700">
        Upload a photo to check if it contains any unsafe content.
      </p>
      <div className="w-full mb-6 flex flex-col space-y-4">
        <label className="mb-2 block text-gray-700 font-medium">
          API Key:
          <input
            type="password"
            required
            className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 "
            placeholder="Enter API key"
            disabled={loading}
            value={apiKey || ""}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4"
        />
      </div>

      {preview && (
        <img
          height={300}
          width={400}
          src={preview}
          alt="Preview"
          className="w-72 h-72 object-contain rounded border border-gray-300 shadow overflow-hidden"
        />
      )}

      <button
        onClick={handleSubmit}
        disabled={!imageBase64 || loading}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Submit"}
      </button>

      {error && <p className="mt-4 text-red-600">{error}</p>}

      {result && (
        <div className="mt-6 w-full max-w-md bg-white p-4 rounded shadow">
          <p className="text-lg font-semibold">
            Status:{" "}
            <span
              className={
                result.status === "safe" ? "text-green-600" : "text-red-600"
              }
            >
              {result.status.toUpperCase()}
            </span>
          </p>

          <p className="mt-2 text-gray-700">{result.userMessage}</p>

          {result.labels?.length > 0 && (
            <div className="mt-4">
              <h3 className="font-medium">Detected Labels:</h3>
              <ul className="list-disc ml-6 mt-2 text-sm text-gray-800">
                {result.labels.map((label, index) => (
                  <li key={index}>
                    <strong>{label.Name}</strong> ({label.Confidence.toFixed(2)}
                    %)
                    {label.ParentName && (
                      <>
                        {" "}
                        → <em>{label.ParentName}</em>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageClassifier;
