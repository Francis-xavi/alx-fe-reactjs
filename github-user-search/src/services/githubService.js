import axios from "axios";

const GITHUB_API = "https://api.github.com";
const TOKEN = import.meta.env.VITE_APP_GITHUB_API_KEY; // optional

// Create an axios instance so we can add headers, baseURL, etc.
const api = axios.create({
  baseURL: GITHUB_API,
  headers: TOKEN
    ? { Authorization: `token ${TOKEN}` }
    : undefined,
});

/**
 * Fetch a GitHub user's public profile data.
 * @param {string} username - GitHub username to look up
 * @returns {Promise<object>} - user data from GitHub API
 */
export async function fetchUserData(username) {
  if (!username || typeof username !== "string") {
    throw new Error("A valid username is required.");
  }

  try {
    const { data } = await api.get(`/users/${encodeURIComponent(username)}`);
    return data;
  } catch (err) {
    // Normalize common errors
    if (err.response?.status === 404) {
      throw new Error("User not found.");
    }
    if (err.response?.status === 403) {
      throw new Error("Rate limit exceeded. Try again later.");
    }
    throw new Error("Failed to fetch user data.");
  }
}