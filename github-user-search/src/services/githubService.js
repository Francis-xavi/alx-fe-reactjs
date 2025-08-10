import axios from "axios";

const BASE_URL = "https://api.github.com";
const TOKEN = import.meta.env.VITE_APP_GITHUB_API_KEY; // optional but helps with rate limits

const api = axios.create({
  baseURL: BASE_URL,
  headers: TOKEN ? { Authorization: `token ${TOKEN}` } : undefined,
});

/**
 * Build a GitHub user search query from criteria.
 * Supports: username (login), location, minRepos
 * Docs: https://docs.github.com/en/rest/search/search?apiVersion=2022-11-28#search-users
 */
function buildUserQuery({ username, location, minRepos } = {}) {
  const parts = [];

  // Exact/partial username match (search in login field)
  if (username && username.trim()) {
    const u = username.trim();
    // Note: `in:login` focuses search on username
    parts.push(`${u} in:login`);
  }

  // Location qualifier
  if (location && location.trim()) {
    // Wrap in quotes to support locations with spaces/commas
    parts.push(`location:"${location.trim()}"`);
  }

  // Minimum public repos
  if (typeof minRepos === "number" && !Number.isNaN(minRepos)) {
    parts.push(`repos:>${minRepos}`);
  }

  // Fallback to something valid if empty (GitHub requires a q)
  if (parts.length === 0) parts.push("type:user");

  return parts.join(" ");
}

/**
 * Advanced user search.
 * @param {{ username?: string, location?: string, minRepos?: number, page?: number, perPage?: number }} criteria
 * @returns {Promise<{items: any[], total_count: number}>}
 */
export async function searchUsers(criteria = {}) {
  const { page = 1, perPage = 20 } = criteria;
  const q = buildUserQuery(criteria);

  try {
    const { data } = await api.get("/search/users", {
      params: {
        q,
        page,
        per_page: perPage,
      },
    });
    // data: { total_count, incomplete_results, items: [...] }
    return data;
  } catch (err) {
    // Normalize common errors
    if (err.response?.status === 403) {
      throw new Error("Rate limit exceeded. Try again later.");
    }
    throw new Error("Failed to search users.");
  }
}

/**
 * (Optional) Fetch a single user's full profile by username.
 */
export async function fetchUserData(username) {
  if (!username || typeof username !== "string") {
    throw new Error("A valid username is required.");
  }
  try {
    const { data } = await api.get(`/users/${encodeURIComponent(username)}`);
    return data;
  } catch (err) {
    if (err.response?.status === 404) {
      throw new Error("User not found.");
    }
    if (err.response?.status === 403) {
      throw new Error("Rate limit exceeded. Try again later.");
    }
    throw new Error("Failed to fetch user data.");
  }
}