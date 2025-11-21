import { QrReader } from "react-qr-reader";
import { useState } from "react";

export default function QRScanner({ onScan }) {
  const [error, setError] = useState(null);

  return (
    <div>
      <QrReader
        onResult={(result, err) => {
          if (result) onScan(result.text);
          if (err) setError(err.message);
        }}
        constraints={{ facingMode: "environment" }}
        style={{ width: "100%" }}
      />

      {error && <p className="text-danger">{error}</p>}
    </div>
  );
}
