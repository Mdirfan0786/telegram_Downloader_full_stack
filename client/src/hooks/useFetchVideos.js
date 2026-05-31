import { useEffect, useState } from "react";

import API from "../api/telegramApi";

const useFetchVideos = () => {
  const [videos, setVideos] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const loadVideos = async () => {
      try {
        const res = await API.get("/saved-messages");

        if (!ignore) {
          const mediaMessages = res.data.messages.filter((msg) => msg.hasMedia);

          setVideos(mediaMessages);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadVideos();

    return () => {
      ignore = true;
    };
  }, []);

  return { videos, loading };
};

export default useFetchVideos;
