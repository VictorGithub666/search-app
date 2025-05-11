import { useEffect, useState } from "react";
import api from "../APIInfo"; // Assuming APIInfo.js exports your configured axios instance
import moment from "moment"; // Import moment.js for date formatting

const useAPIresponse = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const performSearch = async (term = "skateboarding dog") => {
    setLoading(true);
    setError(null);

    try {
      // Step 1: Perform the initial search to get video IDs
      const searchResponse = await api.get("search", {
        params: {
          part: "snippet", // We still need the snippet for basic info and thumbnails
          q: term,
          type: "video",
          // Add other search parameters as needed
          // order: "viewCount",
          // videoDefinition: "high",
          maxResults: 10, // Limit results for the example
        },
      });

      const videoItems = searchResponse.data.items || [];

      if (videoItems.length === 0) {
        setResults([]);
        setLoading(false);
        return;
      }

      // Extract video IDs from the search results
      const videoIds = videoItems.map((item) => item.id.videoId).join(",");

      // Step 2: Fetch detailed video information using the video IDs
      const videosResponse = await api.get("videos", {
        params: {
          part: "snippet,statistics,contentDetails", // Request snippet, statistics, and contentDetails
          id: videoIds, // Pass the comma-separated video IDs
        },
      });

      const detailedVideoItems = videosResponse.data.items || [];

      // Combine the data from both responses (optional, but can be helpful)
      // For simplicity, we'll just use the detailed video items for display
      setResults(detailedVideoItems);
    } catch (err) {
      console.error("YouTube API fetch error:", err);
      setError(err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    performSearch();
  }, []);

  return { results, loading, error, performSearch };
};

export default useAPIresponse;
