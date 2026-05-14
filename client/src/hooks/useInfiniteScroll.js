import { useEffect } from "react";

const useInfiniteScroll = (loaderRef, hasMore, setVisibleCount) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];

        if (target.isIntersecting && hasMore) {
          setVisibleCount((prev) => prev + 6);
        }
      },
      {
        threshold: 0.5,
      },
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [loaderRef, hasMore, setVisibleCount]);
};

export default useInfiniteScroll;
