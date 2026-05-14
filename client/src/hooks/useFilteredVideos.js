const useFilteredVideos = (videos, searchQuery, activeFilter) => {
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

export default useFilteredVideos;
