const HeroText = () => {
  return (
    <div className="col-start-2 col-end-3 row-start-2 row-end-2 z-2">
      <h1 className="text-5xl tracking-tighter max-w-[720px] font-semibold pt-[1.5rem] pb-[.8rem] md:pt-[8rem] md:text-6xl">
        Bring the Green Closer to Home
      </h1>
      <button className="flex gap-3 tracking-wider bg-primary rounded-md py-[.5rem] px-[.8rem] font-semibold justify-between text-white">
        Invite Some Green Over
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#ffffff"
        >
          <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" />
        </svg>
      </button>
    </div>
  );
};

export default HeroText;
