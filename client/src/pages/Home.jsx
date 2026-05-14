import { lazy, Suspense, useCallback, useMemo, useRef, useState } from "react";

import Loader from "../components/common/Loader";

import AmbientGlow from "../components/hero/AmbientGlow";

import HeroSection from "../components/hero/HeroSection";

import MediaToolbar from "../components/media/MediaToolbar";

import EmptyState from "../components/media/EmptyState";

import InfiniteLoader from "../components/media/InfiniteLoader";

import useFetchVideos from "../hooks/useFetchVideos";

import useInfiniteScroll from "../hooks/useInfiniteScroll";

import useDebounce from "../utils/useDebounce";

import { getFilteredVideos, getMediaStats } from "../utils/mediaHelpers";

const MediaGrid = lazy(() => import("../components/media/MediaGrid"));

const Home = ({ searchQuery, darkMode }) => {
  const [activeFilter, setActiveFilter] = useState("All");

  const [visibleCount, setVisibleCount] = useState(6);

  const loaderRef = useRef(null);

  const { videos, loading } = useFetchVideos();

  // Debounced Search
  const debouncedSearch = useDebounce(searchQuery);

  // Memoized Filtering
  const filteredVideos = useMemo(() => {
    return getFilteredVideos(videos, debouncedSearch, activeFilter);
  }, [videos, debouncedSearch, activeFilter]);

  // Visible Videos
  const visibleVideos = useMemo(() => {
    return filteredVideos.slice(0, visibleCount);
  }, [filteredVideos, visibleCount]);

  // Memoized Stats
  const stats = useMemo(() => {
    return getMediaStats(videos);
  }, [videos]);

  // Filter Change
  const handleFilterChange = useCallback((filter) => {
    setActiveFilter(filter);

    setVisibleCount(6);
  }, []);

  // Infinite Scroll
  useInfiniteScroll(
    loaderRef,
    visibleCount < filteredVideos.length,
    setVisibleCount,
  );

  if (loading) return <Loader />;

  return (
    <div
      className="
        relative
        min-h-[70vh]

        overflow-x-hidden
      "
    >
      <AmbientGlow />

      <div
        className="
          relative
          z-10

          max-w-[1200px]
          mx-auto

          px-2.5
          sm:px-5
          lg:px-6

          pt-[64px]
          sm:pt-[78px]

          pb-8
        "
      >
        {/* HERO */}
        <HeroSection
          darkMode={darkMode}
          videos={videos}
          totalVideos={stats.totalVideos}
          totalGifs={stats.totalGifs}
        />

        {/* TOOLBAR */}
        <MediaToolbar
          darkMode={darkMode}
          activeFilter={activeFilter}
          setActiveFilter={handleFilterChange}
          setVisibleCount={setVisibleCount}
        />

        {/* CONTENT */}
        {filteredVideos.length > 0 ? (
          <>
            <Suspense fallback={<Loader />}>
              <MediaGrid videos={visibleVideos} darkMode={darkMode} />
            </Suspense>

            {visibleCount < filteredVideos.length && (
              <InfiniteLoader darkMode={darkMode} loaderRef={loaderRef} />
            )}
          </>
        ) : (
          <EmptyState darkMode={darkMode} />
        )}
      </div>
    </div>
  );
};

export default Home;
