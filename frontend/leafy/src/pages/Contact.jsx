import bg from "../assets/avif/contactBg2.avif"

const Contact = () => {
    return(
        <div className="max-w-xl mx-auto p-2 py-8">
            <div className="fixed top-0 left-0 flex h-full w-screen -z-5 bg-zinc-800">
                <div className="absolute inset-0 bg-zinc-800/20"></div>
                <img className="h-full w-full object-cover object-left" src={bg} alt="" />
            </div>
            <div className="bg-gray-100/40 backdrop-blur-[4px] p-4 mt-16 rounded-lg shadow-lg outline-[0.5px] outline-zinc-400/30 ">
                <h1 className="text-3xl font-bold mb-4">Contact the Developer</h1>
                <p className="mb-6">
                    This e-commerce project is a technical showcase built by me, using Django, React, PostgreSQL, and Tailwind. I welcome feedback, questions, and networking opportunities!
                </p>
                <ul className="mb-6 space-y-2">
                    <li>
                    <span className="font-medium">Email:</span> <a href="mailto:asoy1711@gmail.com" className="text-blue-600 underline">Asoy1711@gmail.com</a>
                    </li>
                    <li>
                    <span className="font-medium">LinkedIn:</span> <a href="https://www.linkedin.com/in/yourprofile/" className="text-blue-600 underline">linkedin.com/in/yourprofile</a>
                    </li>
                    <li>
                    <span className="font-medium">GitHub:</span> <a href="https://github.com/yourusername" className="text-blue-600 underline">github.com/yourusername</a>
                    </li>
                </ul>
                {/* Simple contact form */}
                <form className="flex flex-col gap-4">
                    <input type="text" placeholder="Your Name" className="border rounded px-4 py-2" />
                    <input type="email" placeholder="Your Email" className="border rounded px-4 py-2" />
                    <textarea placeholder="Your Message" className="border rounded px-4 py-2" rows={4} />
                    <button type="submit" className="bg-primary shadow-sm text-text font-semibold tracking-wider rounded px-4 py-2">Send Message</button>
                </form>
                <footer className="mt-10 text-gray-800 text-center">
                    Open to opportunities and collaboration!
                </footer>
            </div>
            </div>
    )
}

export default Contact