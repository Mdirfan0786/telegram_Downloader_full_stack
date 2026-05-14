const MediaStats = ({ videos, totalVideos, totalGifs, darkMode }) => {
  return (
    <div
      className="
        flex
        flex-wrap

        gap-2.5
        sm:gap-3

        lg:justify-end
      "
    >
      {[
        {
          num: videos.length,
          label: "Total",
        },

        {
          num: totalVideos,
          label: "Videos",
        },

        {
          num: totalGifs,
          label: "GIFs",
        },
      ].map((s) => (
        <div
          key={s.label}
          className={`
            min-w-[72px]

            rounded-2xl

            px-4
            py-3

            text-center

            border

            ${
              darkMode
                ? `
                  bg-white/[0.03]
                  border-white/[0.07]
                `
                : `
                  bg-black/[0.03]
                  border-black/[0.06]
                `
            }
          `}
        >
          <div
            className={`
              text-[18px]
              sm:text-[22px]

              font-bold

              leading-none

              ${darkMode ? "text-white" : "text-black"}
            `}
          >
            {s.num}
          </div>

          <div
            className={`
              mt-2

              text-[8px]
              sm:text-[9px]

              uppercase
              tracking-[0.14em]

              ${darkMode ? "text-white/25" : "text-black/40"}
            `}
          >
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MediaStats;
