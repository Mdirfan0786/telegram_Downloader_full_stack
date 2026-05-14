const AmbientGlow = () => {
  return (
    <div
      className="
        absolute
        top-0
        left-0
        right-0
        h-[700px]
        z-0
        pointer-events-none
        overflow-hidden
      "
    >
      <div
        className="
          absolute
          top-[-80px]
          left-[-60px]
          w-[500px]
          h-[500px]
          rounded-full
          bg-[radial-gradient(circle,rgba(37,99,235,0.10)_0%,transparent_70%)]
        "
      />

      <div
        className="
          absolute
          top-[40px]
          right-[-40px]
          w-[400px]
          h-[400px]
          rounded-full
          bg-[radial-gradient(circle,rgba(109,40,217,0.07)_0%,transparent_70%)]
        "
      />
    </div>
  );
};

export default AmbientGlow;
