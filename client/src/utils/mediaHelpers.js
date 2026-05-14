export const getFilteredVideos = (videos, searchQuery, activeFilter) => {
  return videos.filter((video) => {
    const fileName = video.mediaInfo?.fileName?.toLowerCase() || "";

    const mime = video.mediaInfo?.mimeType || "";

    const matchesSearch = fileName.includes(searchQuery.toLowerCase());

    const isGif = mime.includes("gif") || fileName.endsWith(".gif");

    if (activeFilter === "GIF") {
      return matchesSearch && isGif;
    }

    if (activeFilter === "Video") {
      return matchesSearch && !isGif;
    }

    return matchesSearch;
  });
};

export const getMediaStats = (videos) => {
  const totalVideos = videos.filter((v) => {
    const mime = v.mediaInfo?.mimeType || "";

    const name = v.mediaInfo?.fileName?.toLowerCase() || "";

    return !mime.includes("gif") && !name.endsWith(".gif");
  }).length;

  const totalGifs = videos.filter((v) => {
    const mime = v.mediaInfo?.mimeType || "";

    const name = v.mediaInfo?.fileName?.toLowerCase() || "";

    return mime.includes("gif") || name.endsWith(".gif");
  }).length;

  return {
    totalVideos,
    totalGifs,
  };
};
