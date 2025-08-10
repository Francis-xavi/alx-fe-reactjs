import { useState, useCallback } from "react";
import Search from "./Search"; // your advanced UI with username/location/minRepos
import { searchUsers, fetchUserData } from "../services/githubService";

export default function SearchResultsContainer() {
  const [criteria, setCriteria] = useState(null);
  const [results, setResults] = useState([]);     // enriched users
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Enrich minimal search hits with full profiles
  const enrichUsers = async (items) => {
    // items contain .login, .avatar_url, .html_url (no location/repos)
    const detailed = await Promise.all(
      items.map(async (u) => {
        try {
          const full = await fetchUserData(u.login);
          return {
            login: u.login,
            avatar_url: u.avatar_url,
            html_url: u.html_url,
            name: full.name ?? u.login,
            location: full.location ?? "—",
            public_repos: full.public_repos ?? 0,
          };
        } catch {
          // fallback to minimal data if detail fetch fails
          return {
            login: u.login,
            avatar_url: u.avatar_url,
            html_url: u.html_url,
            name: u.login,
            location: "—",
            public_repos: 0,
          };
        }
      })
    );
    return detailed;
  };

  const runSearch = useCallback(async (crit, nextPage = 1, append = false) => {
    setLoading(true);
    setError("");
    if (!append) {
      setResults([]);
      setPage(1);
      setTotal(0);
    }
    try {
      const data = await searchUsers({ ...crit, page: nextPage, perPage: 20 });
      setTotal(data.total_count ?? 0);

      const detailed = await enrichUsers(data.items ?? []);
      setResults((prev) => (append ? [...prev, ...detailed] : detailed));
      setPage(nextPage);
    } catch (e) {
      setError(e.message || "Failed to search users.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = (crit) => {
    setCriteria(crit);
    runSearch(crit, 1, false);
  };

  const handleLoadMore = () => {
    if (!criteria) return;
    runSearch(criteria, page + 1, true);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <Search onSearch={handleSearch} />

      {/* States */}
      {loading && results.length === 0 && <p>Loading...</p>}
      {!!error && <p className="text-red-600">{error}</p>}
      {!loading && !error && results.length === 0 && criteria && (
        <p>Looks like we cant find the user</p>
      )}

      {/* Results */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {results.map((u) => (
          <li key={u.login} className="p-4 border rounded-xl bg-white shadow-sm flex gap-3">
            <img
              src={u.avatar_url}
              alt={`${u.login} avatar`}
              className="w-16 h-16 rounded-full"
            />
            <div className="min-w-0">
              <h3 className="font-semibold text-slate-800 truncate">{u.name}</h3>
              <p className="text-sm text-slate-600">@{u.login}</p>
              <p className="text-sm text-slate-600">Location: {u.location}</p>
              <p className="text-sm text-slate-600">Public repos: {u.public_repos}</p>
              <a
                href={u.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-indigo-600 hover:underline text-sm"
              >
                View GitHub Profile
              </a>
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      {!loading && results.length > 0 && results.length < total && (
        <div className="flex justify-center">
          <button
            onClick={handleLoadMore}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Load more
          </button>
        </div>
      )}

      {loading && results.length > 0 && <p className="text-center">Loading more…</p>}
    </div>
  );
}