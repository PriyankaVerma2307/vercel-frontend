import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BhajanList.css';

function BhajanList() {
  const [bhajans, setBhajans] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [message, setMessage] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editBhajan, setEditBhajan] = useState(null);
  const BACKEND_URL = "https://vercel-backend-eta-blue.vercel.app";

  const limit = 10;

  const fetchBhajans = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/bhajans?search=${search}&page=${page}`);
      setBhajans(res.data.bhajans);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('❌ Error fetching bhajans:', err);
      setBhajans([]);
    }
  };

  useEffect(() => {
    fetchBhajans();
  }, [search, page]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this bhajan?');
    if (!confirmDelete) return;

    try {
     await axios.delete(`${BACKEND_URL}/api/bhajans/${id}`);
      setMessage('✅ Bhajan deleted successfully!');
      fetchBhajans();
    } catch (err) {
      console.error('❌ Error deleting bhajan:', err);
    }
  };

  const handleEditClick = (bhajan) => {
    setEditBhajan({ ...bhajan });
    setEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    setEditBhajan({ ...editBhajan, [e.target.name]: e.target.value });
  };

  const handleEditSave = async () => {
    try {
      await axios.put(`${BACKEND_URL}/api/bhajans/${editBhajan._id}`, editBhajan);
      setMessage('✅ Bhajan updated successfully!');
      setEditModalOpen(false);
      fetchBhajans();
    } catch (err) {
      console.error('❌ Error updating bhajan:', err);
    }
  };

  return (
    <div className="bhajan-list-container">
      <h2>📖 Bhajan List</h2>

      <input
        type="text"
        placeholder="🔍 Search bhajan, singer or house..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="search-input"
      />

      {message && <p className="success-message">{message}</p>}

      <table className="bhajan-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Singer</th>
            <th>Bhajan Name</th>
            <th>House</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(bhajans) && bhajans.length > 0 ? (
            bhajans.map((b, index) => (
              <tr key={b._id}>
                <td>{(page - 1) * limit + index + 1}</td>
                <td>{b.singer}</td>
                <td>{b.nameHindi} / {b.nameHinglish}</td>
                <td>{b.houseName}</td>
                <td>{b.date}</td>
                <td>
                  <button onClick={() => handleEditClick(b)} className="edit-btn">✏️ Edit</button>
                  <button onClick={() => handleDelete(b._id)} className="delete-btn">🗑 Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No bhajans found</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1}>
          ⬅ Prev
        </button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={() => setPage(prev => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>
          Next ➡
        </button>
      </div>

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>✏️ Edit Bhajan</h3>
            <input type="text" name="singer" value={editBhajan.singer} onChange={handleEditChange} placeholder="Singer Name" />
            <input type="text" name="nameHindi" value={editBhajan.nameHindi} onChange={handleEditChange} placeholder="Bhajan in Hindi" />
            <input type="text" name="nameHinglish" value={editBhajan.nameHinglish} onChange={handleEditChange} placeholder="Bhajan in Hinglish" />
            <input type="text" name="houseName" value={editBhajan.houseName} onChange={handleEditChange} placeholder="House Name" />
            <input type="date" name="date" value={editBhajan.date} onChange={handleEditChange} />

            <div className="modal-buttons">
              <button onClick={handleEditSave} className="save-btn">💾 Save</button>
              <button onClick={() => setEditModalOpen(false)} className="cancel-btn">❌ Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BhajanList;
