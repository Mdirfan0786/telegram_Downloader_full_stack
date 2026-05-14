const InfiniteLoader = ({ darkMode, loaderRef }) => {
  return (
    <div
      ref={loaderRef}
      className="
        flex
        justify-center
        pb-20
        pt-2
      "
    >
      <div
        className={`
          flex
          items-center
          gap-3
          px-5
          py-3
          rounded-2xl
          border
          backdrop-blur-xl

          ${
            darkMode
              ? `
                bg-white/[0.03]
                border-white/[0.06]
              `
              : `
                bg-black/[0.03]
                border-black/[0.06]
              `
          }
        `}
      >
        <div
          className="
            w-4
            h-4
            border-2
            border-blue-500/30
            border-t-blue-500
            rounded-full
            animate-spin
          "
        />

        <span
          className={`
            text-sm
            ${darkMode ? "text-white/40" : "text-black/50"}
          `}
        >
          Loading more media...
        </span>
      </div>
    </div>
  );
};

export default InfiniteLoader;
