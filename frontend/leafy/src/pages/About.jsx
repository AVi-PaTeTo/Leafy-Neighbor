import { useState } from "react"
import bg from "../assets/avif/contactBg2.avif"

const About = () => {
    const [activeDropdown, setActiveDropdown] = useState(0)


    function changeActiveDropdown(id){
        setActiveDropdown(activeDropdown === id ? 0 : id);
    }

    return(
        <div className="max-w-[600px] h-[calc(100vh-100px)] max-h-[700px] gap-4 mx-auto p-4 py-4 bg-gradient-to-br  from-zinc-900 to-[#101013] flex flex-col sm:flex-row items-center mt-18 rounded-lg hide-scrollbar overflow-hidden overflow-y-auto">
            <div className="fixed top-0 left-0 flex h-full w-screen -z-5 bg-zinc-800">
                <div className="absolute inset-0 bg-zinc-800/20"></div>
                <img className="h-full w-full object-cover object-left" src={"https://images.pexels.com/photos/2933470/palm-leaf-leaves-black-and-white-2933470.jpeg"} alt="" />
            </div>
            <p className="sticky top-0 text-2xl text-zinc-100 pb-4 self-start">
                I didn’t want this page to be just another boring “About” section that says the same things every project says.
                So instead, I went with a FAQ-style layout — it’s more personal and gives a better idea of what this project is actually about, 
                how it started, and what I learned along the way.
            </p>
            <div className="flex flex-col gap-2 self-start overflow-hidden overflow-y-scroll hide-scrollbar rounded-sm">
                <div
                    onClick={() => changeActiveDropdown(1)}
                    className="group bg-zinc-100 px-4 py-1 rounded-sm">
                    <h1 className="hover:cursor-pointer font-semibold text-xl">
                        What is this project?
                    </h1>
                    <div className={`grid ${activeDropdown == 1?'grid-rows-[1fr] py-2':'grid-rows-[0fr]'} transition-all ease-in-out duration-900`}>
                        <div className="overflow-hidden w-fit pl-4 hover:cursor-default">
                            This is a full-stack e-commerce website built around everything related to plants — from indoor pots to gardening tools. 
                            It’s designed to provide a simple and modern shopping experience, 
                            showcasing how a complete online store can be built using Django REST Framework on the backend and React with Tailwind CSS on the frontend.
                        </div>
                    </div>
                </div>
                <div
                    onClick={() => changeActiveDropdown(2)}
                    className="group bg-zinc-100 px-4 py-1 rounded-sm">
                    <h1 className="hover:cursor-pointer font-semibold text-xl">
                        Why did you build it?
                    </h1>
                    <div className={`grid ${activeDropdown == 2?'grid-rows-[1fr] py-2':'grid-rows-[0fr]'} transition-all ease-in-out duration-900`}>
                        <div className="overflow-hidden w-fit pl-4 hover:cursor-default">
                            After finishing my first project — a simple blog website — I wanted to work on something more complex and useful in real life.
                            Instead of just watching tutorials, I wanted to learn by actually building. This project gave me the chance to explore new technologies
                            like React and Tailwind, improve my frontend design sense, and understand how backend and frontend communicate in a real-world setup.
                        </div>
                    </div>
                </div>
                <div
                    onClick={() => changeActiveDropdown(3)}
                    className="group bg-zinc-100 px-4 py-1 rounded-sm">
                    <h1 className="hover:cursor-pointer font-semibold text-xl">
                        How long did it take and why?
                    </h1>
                    <div className={`grid ${activeDropdown == 3?'grid-rows-[1fr] py-2':'grid-rows-[0fr]'} transition-all ease-in-out duration-900`}>
                        <div className="overflow-hidden w-fit pl-4 hover:cursor-default">
                            The first commit was made on March 24, and the latest one on October 30, which makes it about seven months of development. 
                            That might sound long, but much of the time was spent learning and experimenting with frontend concepts — grids, flexbox, UI design, and transitions. 
                            The backend was finished within 2–3 weeks, but I also took two family trips, each about a month long. Overall, most of the effort went into understanding and refining the frontend.
                        </div>
                    </div>
                </div>
                <div
                    onClick={() => changeActiveDropdown(4)}
                    className="group bg-zinc-100 px-4 py-1 rounded-sm">
                    <h1 className="hover:cursor-pointer font-semibold text-xl">
                        What did you learn?
                    </h1>
                    <div className={`grid ${activeDropdown == 4?'grid-rows-[1fr] py-2':'grid-rows-[0fr]'} transition-all ease-in-out duration-900`}>
                        <div className="overflow-hidden w-fit pl-4 hover:cursor-default">
                            This project taught me a lot, both technically and practically.
                            Some key takeaways include:
                            <ul className="list-disc pl-6">
                                <li>Building responsive layouts using CSS Grid and Flexbox</li>
                                <li>Styling efficiently with Tailwind CSS</li>
                                <li>Using React Context for state management</li>
                                <li>Making API requests and handling responses with Axios</li>
                                <li>Integrating and managing payment flows using Razorpay</li>
                                <li>Profiling performance and optimizing queries with Django Silk</li>
                                <li>Generating clean, interactive API documentation using DRF Spectacular</li>
                                <li>Understanding how image optimization impacts performance and load times</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div
                    onClick={() => changeActiveDropdown(5)}
                    className="group bg-zinc-100 px-4 py-1 rounded-sm">
                    <h1 className="hover:cursor-pointer font-semibold text-xl">
                        What’s next?
                    </h1>
                    <div className={`grid ${activeDropdown == 5?'grid-rows-[1fr] py-2':'grid-rows-[0fr]'} transition-all ease-in-out duration-900`}>
                        <div className="overflow-hidden w-fit pl-4 hover:cursor-default">
                            I already have an idea for my next project, but before that, I want to strengthen both my frontend and backend skills.
                            I plan to focus more on function-based views, write more efficient database queries, and explore Next.js for server-side rendering and performance improvements.
                        </div>
                    </div>
                </div>
                <div
                    onClick={() => changeActiveDropdown(6)}
                    className="group bg-zinc-100 px-4 py-1 rounded-sm">
                    <h1 className="hover:cursor-pointer font-semibold text-xl">
                        Tech Stack
                    </h1>
                    <div className={`grid ${activeDropdown == 6?'grid-rows-[1fr] py-2':'grid-rows-[0fr]'} transition-all ease-in-out duration-900`}>
                        <div className="overflow-hidden w-fit pl-4 hover:cursor-default">
                            <strong>Backend:</strong> Python, Django, Django REST Framework, PostgreSQL <br />
                            <strong>Frontend:</strong> React, Tailwind CSS, Axios<br />
                            <strong>Other Tools & Integrations:</strong>
                                <ul className="list-disc pl-6">
                                    <li>JWT Authentication for secure user sessions</li>
                                    <li>Razorpay for payments</li>
                                    <li>DRF Spectacular for API documentation</li>
                                    <li>Django Silk for profiling and optimization</li>
                                    <li>Version Control: Git & GitHubprovements.</li>
                                </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default About