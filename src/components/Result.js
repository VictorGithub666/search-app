import React from "react";
import moment from "moment"; // Import moment.js

function Result({ results }) {
  if (!results || !Array.isArray(results) || results.length === 0) {
    return <p>No results found.</p>;
  }

  // Helper function to format duration (from ISO 8601 format)
  const formatDuration = (isoDuration) => {
    if (!isoDuration) return "N/A";
    const duration = moment.duration(isoDuration);
    let formatted = "";
    if (duration.hours() > 0) {
      formatted += duration.hours() + "h ";
    }
    if (duration.minutes() > 0 || duration.hours() > 0) {
      formatted += duration.minutes() + "m ";
    }
    formatted += duration.seconds() + "s";
    return formatted.trim();
  };

  // Helper function to format view count
  const formatViewCount = (viewCount) => {
    if (!viewCount) return "N/A";
    return parseInt(viewCount).toLocaleString(); // Format with commas
  };

  // Helper function to calculate time since upload
  const timeSinceUpload = (publishedAt) => {
    if (!publishedAt) return "N/A";
    return moment(publishedAt).fromNow(); // e.g., "2 days ago"
  };

  // Helper function to get the YouTube video URL
  const getVideoUrl = (videoId) => {
    return `https://www.youtube.com/watch?v=${videoId}`;
  };

  return (
    <div className="row">
      {results.map((item, index) =>
        item && item.snippet && item.statistics && item.contentDetails ? (
          <div key={index} className="col-md-6 mb-4">
            <div className="card shadow rounded-4">
              <div className="row g-0">
                <div className="col-4">
                  <img
                    src={item.snippet.thumbnails.medium.url}
                    alt={item.snippet.title}
                    className="img-fluid rounded-start h-100"
                  />
                </div>
                <div className="col-8">
                  <div className="card-body">
                    <h5 className="card-title">
                      <a
                        href={getVideoUrl(item.id)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-decoration-none text-dark"
                      >
                        {item.snippet.title}
                      </a>
                    </h5>
                    <p className="card-text mb-1">
                      <small className="text-muted">
                        Channel: {item.snippet.channelTitle}
                      </small>
                      <small className="text-muted ms-3">
                        Views: {formatViewCount(item.statistics.viewCount)}
                      </small>
                    </p>
                    <p className="card-text mb-1">
                      <small className="text-muted">
                        Duration: {formatDuration(item.contentDetails.duration)}
                      </small>
                      <small className="text-muted ms-3">
                        Uploaded: {timeSinceUpload(item.snippet.publishedAt)}
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div key={index} className="col-12">
            <p>Invalid result item or missing data</p>
          </div>
        )
      )}
    </div>
  );
}

export default Result;
