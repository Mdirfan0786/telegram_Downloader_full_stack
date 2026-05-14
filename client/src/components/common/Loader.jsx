const Loader = () => {
  return (
    <div className="fixed inset-0 bg-[#080c14] flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-11 h-11">
          <div className="absolute inset-0 rounded-full border-2 border-white/[0.06]" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500 animate-spin" />
        </div>
        <p className="text-[10px] text-white/20 tracking-[0.28em] uppercase font-medium">
          Loading Media
        </p>
      </div>
    </div>
  );
};

export default Loader;
