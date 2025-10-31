import bg from "../assets/avif/contactBg2.avif"

const Contact = () => {
    return(
        <div className="max-w-xl mx-auto p-2 py-8">
            <div className="fixed top-0 left-0 flex h-full w-screen -z-5 bg-zinc-800">
                <div className="absolute inset-0 bg-zinc-800/20"></div>
                <img className="h-full w-full object-cover object-left" src={"https://images.pexels.com/photos/2933470/palm-leaf-leaves-black-and-white-2933470.jpeg"} alt="" />
            </div>
            <div className="bg-gradient-to-br from-zinc-900 to-[#101013] backdrop-blur-[4px] p-4 mt-16 rounded-lg shadow-lg ">
                <h1 className="text-3xl font-bold mb-4 text-zinc-100">Contact the Developer</h1>
                <p className="mb-6 text-zinc-100">
                    This e-commerce project is a technical showcase built by me, using Django, React, PostgreSQL, and Tailwind. I welcome feedback, questions, and networking opportunities!
                </p>
                <div className="mb-4 space-y-2 flex gap-4">
                
                    <a href="mailto:asoy1711@gmail.com" className="text-blue-600 underline hover:cursor-pointer">
                        <svg className="pb-1" width="33px" height="33px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" fill="#f4f4f5 ">
                        <title>Gmail</title>
                        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
                        </svg>

                    </a>
                    
                
                    <a href="https://www.linkedin.com/in/yourprofile/" className="text-blue-600 underline hover:cursor-pointer">
                        <svg className="w-7 h-7 stroke-2 pb-1 fill-zinc-100" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>X</title><path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z"/></svg>
                    </a>
                    
                
                    <a href="https://github.com/AVi-PaTeTo" className="text-blue-600 underline hover:cursor-pointer">
                        <svg className="w-8 h-8 stroke-2 pb-2 fill-zinc-100"  role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <title>GitHub</title>
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                    </a>
                    
                </div>
                {/* Simple contact form */}
                <form className="flex flex-col gap-4">
                    <input type="text" placeholder="Your Name" className="border border-zinc-500 text-zinc-100 rounded px-4 py-2" />
                    <input type="email" placeholder="Your Email" className="border border-zinc-500 text-zinc-100 rounded px-4 py-2" />
                    <textarea placeholder="Your Message" className="border  border-zinc-500 text-zinc-100 rounded px-4 py-2" rows={4} />
                    <button type="submit" className="bg-primary shadow-sm hover:cursor-pointer text-zinc-800 font-semibold tracking-wider rounded px-4 py-2">Send Message</button>
                </form>
                <footer className="mt-10 text-zinc-100 text-center">
                    Open to opportunities and collaboration!
                </footer>
            </div>
        </div>
    )
}

export default Contact