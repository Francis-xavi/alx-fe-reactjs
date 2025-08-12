// src/services/githubService.js
import axios from "axios";

const BASE_URL = "https://api.github.com";
const TOKEN = import.meta.env.VITE_APP_GITHUB_API_KEY; // optional

const api = axios.create({
  baseURL: BASE_URL,
  headers: TOKEN ? { Authorization: `token ${TOKEN}` } : undefined,
});

// Build the q string from criteria
function buildUserQuery({ username, location, minRepos } = {}) {
  const parts = [];
  if (username?.trim()) parts.push(`${username.trim()} in:login`);
  if (location?.trim()) parts.push(`location:"${location.trim()}"`);
  if (typeof minRepos === "number" && !Number.isNaN(minRepos)) parts.push(`repos:>${minRepos}`);
  if (parts.length === 0) parts.push("type:user");
  return parts.join(" ");
}

// ✅ Explicitly uses the required endpoint string
export async function searchUsers(criteria = {}) {
  const q = buildUserQuery(criteria);
  const { page = 1, perPage = 20 } = criteria;

  const { data } = await api.get(
    `https://api.github.com/search/users?q=${encodeURIComponent(q)}`, // <— required literal
    { params: { page, per_page: perPage } }
  );
  return data; // { total_count, items, ... }
}

// Optional: single user fetch
export async function fetchUserData(username) {
  const { data } = await api.get(`/users/${encodeURIComponent(username)}`);
  return data;
}