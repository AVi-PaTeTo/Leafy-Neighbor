// packaging = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin=
// fresh     = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin=
// guides    = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin=
// support   = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin=
import { useState } from "react";

const Highlights = () => {
    const [show,setShow] = useState(false)
  
    return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(220px,1fr))] md:grid-cols-[repeat(auto-fit,_minmax(320px,1fr))] lg:grid-cols-[repeat(auto-fit,_minmax(385px,1fr))] xl:grid-cols-[repeat(auto-fit,_minmax(220px,1fr))] gap-6 md:gap-8">
      <div className="relative bg-gray-100 shadow-md rounded-md flex p-5">
        <div className="mr-1">
          <svg
          className="w-6 h-6 flex-none shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 20h10" />
          <path d="M10 20c5.5-2.5.8-6.4 3-10" />
          <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
          <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
        </svg>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-[1.2rem]">
            Fresh From the Nursery
          </h2>
          <p className="text-text/80">
            Only the healthiest, handpicked plants delivered right to your
            doorstep.
          </p>
        </div>
      </div>

      <div className="bg-gray-100 shadow-md rounded-md flex  p-5">
        <div className="mr-2">
          <svg
          className="w-6 h-6 flex-none shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" />
          <path d="M12 22V12" />
          <polyline points="3.29 7 12 12 20.71 7" />
          <path d="m7.5 4.27 9 5.15" />
        </svg>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-[1.2rem]">
            Eco-Friendly Packaging
          </h2>
          <p className="text-text/80">
            Sustainable materials that protect both your plants and the planet.
          </p>
        </div>
      </div>

      <div className="bg-gray-100 shadow-md rounded-md flex  p-5">
        <div className="mr-2">
        <svg
          className="w-6 h-6 flex-none shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
          <path d="M14 2v4a2 2 0 0 0 2 2h4" />
          <path d="M10 9H8" />
          <path d="M16 13H8" />
          <path d="M16 17H8" />
        </svg>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-[1.2rem]">Free Care Guides</h2>
          <p className="text-text/80">
            Detailed, beginner-friendly care instructions included with every
            plant.
          </p>
        </div>
      </div>

      <div className="bg-gray-100 shadow-md rounded-md flex p-5">
        <div className="mr-2">
        <svg
          className="w-6 h-6 flex-none shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z" />
          <path d="M21 16v2a4 4 0 0 1-4 4h-5" />
        </svg>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-[1.2rem]">Expert Support</h2>
          <p className="text-text/80">
            Need help? Friendly plant experts are just a message away, ready to
            help.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Highlights;

