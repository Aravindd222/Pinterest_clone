const PostSkeleton = () => {
  return (
    <div className="mb-6 break-inside-avoid animate-pulse">

      <div
        className="
          overflow-hidden
          rounded-[30px]
          border
          border-white/5
          bg-[#151515]
        "
      >

        <div className="h-[340px] bg-[#202020]" />

        <div className="space-y-3 p-5">

          <div className="h-5 w-3/4 rounded-full bg-[#2b2b2b]" />

          <div className="h-4 w-1/2 rounded-full bg-[#262626]" />

          <div className="mt-5 flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div className="h-10 w-10 rounded-full bg-[#2b2b2b]" />

              <div className="h-4 w-24 rounded-full bg-[#2b2b2b]" />

            </div>

            <div className="h-9 w-20 rounded-full bg-[#2b2b2b]" />

          </div>

        </div>

      </div>

    </div>
  );
};