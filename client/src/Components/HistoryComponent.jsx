// frontend/src/components/History.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HistoryComponent.css";

const HistoryComponent = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isLoggedOut, setIsLoggedOut] = useState(true)

  const checkLogout = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/common-auth`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res.data.success === true) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/history`, {
          withCredentials: true,
        });
        setHistory(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch history");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
    checkLogout();
  }, []);

  return (
    <section className="history-container">
      <h1 className="history-title">History</h1>

      {loading ? (
        <div className="skeleton-list">
          <div className="skeleton-card" />
          <div className="skeleton-card" />
          <div className="skeleton-card" />
        </div>
      ) : error ? (
        <p className="history-error">{error}</p>
      ) : isLoggedIn ? (
        <ul className="history-list">
          {history.map((item) => (
            <li key={item._id} className="history-card">
              <div className="history-row">
                <span className="history-icon" aria-hidden="true">
                  📝
                </span>
                <p className="history-text">{item.text}</p>
              </div>

              <div className="history-footer">
                <span className={`badge ${item.result ? "success" : "failed"}`}>
                  {item.result ? "Success" : "Failed"}
                </span>

                <span className="time">
                  <span className="dot" aria-hidden="true" />
                  {new Date(item.createdAt).toLocaleString()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : history.length === 0 ? (
        <p className="history-empty">No history yet.</p>
      ) : (
        <div>Sorry , we are unable to fetch the History data for now.</div>
      )}
    </section>
  );
};

export default HistoryComponent;
