import React, { useState } from 'react';
import axios from 'axios';
import './DataEntry.css';

function DataEntry() {
  const [houseName, setHouseName] = useState('');
  const [date, setDate] = useState('');
  const [nameHindi, setNameHindi] = useState('');
  const [nameHinglish, setNameHinglish] = useState('');
  const [singer, setSinger] = useState('');
  const [message, setMessage] = useState('');
  const [bhajansInSatsang, setBhajansInSatsang] = useState([]);

  const BACKEND_URL =  "https://vercel-backend-eta-blue.vercel.app";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!houseName || !date || !singer) {
      setMessage('⚠️ Please fill all required fields');
      return;
    }

    if (!nameHindi && !nameHinglish) {
      setMessage('⚠️ Please enter Bhajan name in Hindi or Hinglish');
      return;
    }

    if (nameHindi && nameHinglish) {
      setMessage('⚠️ Enter bhajan name in only one language, not both');
      return;
    }

    const bhajanKey = nameHindi
      ? nameHindi.trim().toLowerCase()
      : nameHinglish.trim().toLowerCase();

    if (bhajansInSatsang.includes(bhajanKey)) {
      setMessage('⚠️ This bhajan is already added in current satsang');
      return;
    }

      try {
        const token = localStorage.getItem("token"); // jab login hua tha, token save kiya hoga
  
    await axios.post(
       `${BACKEND_URL}/api/bhajans/add`,
       {
        houseName,
        date,
        nameHindi,
        nameHinglish,
        singer,
      },
     {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  setMessage("✅ Bhajan saved successfully!");
  setBhajansInSatsang([...bhajansInSatsang, bhajanKey]);
  setNameHindi("");
  setNameHinglish("");
  setSinger("");
} catch (err) {
  console.error(err);
  setMessage("❌ Error saving bhajan!");
}

  };

  const handleNewSatsang = () => {
    setHouseName('');
    setDate('');
    setNameHindi('');
    setNameHinglish('');
    setSinger('');
    setMessage('');
    setBhajansInSatsang([]);
  };

  return (
    <div className="form-container">
      <h2>📝 Naamcharcha Bhajan Entry</h2>
      <button className="new-satsang-btn" onClick={handleNewSatsang}>
       🌼 Fresh Bhajan Entry
      </button>

      {message && <p className="msg">{message}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Satsang Name / House"
          value={houseName}
          onChange={(e) => setHouseName(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <h3 className="section-heading">🎵 Add Bhajan</h3>

        <input
          type="text"
          placeholder="Bhajan Name in Hindi"
          value={nameHindi}
          onChange={(e) => setNameHindi(e.target.value)}
          disabled={nameHinglish}
        />

        <input
          type="text"
          placeholder="Bhajan Name in Hinglish"
          value={nameHinglish}
          onChange={(e) => setNameHinglish(e.target.value)}
          disabled={nameHindi}
        />

        <input
          type="text"
          placeholder="Singer Name"
          value={singer}
          onChange={(e) => setSinger(e.target.value)}
        />

        <button type="submit">Save Bhajan</button>
      </form>
    </div>
  );
}

export default DataEntry;
