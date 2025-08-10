import { useState } from "react";
import { fetchUserData } from "../services/githubService";

export default function Search() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const value = username.trim();
    if (!value) {
      setError("Please enter a GitHub username.");
      setUser(null);
      return;
    }
    setLoading(true);
    setError("");
    setUser(null);

    try {
      const data = await fetchUserData(value);
      setUser(data);
    } catch {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 520 }}>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Enter GitHub username…"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          aria-label="GitHub username"
          style={{ flex: 1, padding: 8 }}
        />
        <button type="submit">Search</button>
      </form>

      {/* Conditional rendering per requirements */}
      {loading && <p>Loading...</p>}
      {!loading && error && <p style={{ color: "crimson" }}>{error}</p>}

      {!loading && !error && user && (
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <img
            src={user.avatar_url}
            alt={`${user.login} avatar`}
            width={72}
            height={72}
            style={{ borderRadius: "50%" }}
          />
          <div>
            <h3 style={{ margin: 0 }}>{user.name || user.login}</h3>
            <a href={user.html_url} target="_blank" rel="noreferrer">
              View GitHub Profile
            </a>
          </div>
        </div>
      )}
    </div>
  );
}