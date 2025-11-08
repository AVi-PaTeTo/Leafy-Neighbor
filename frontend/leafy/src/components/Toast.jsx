import { useState, useEffect } from "react"

const Toast = (props) => {
    const [style, setStyle] = useState({ opacity: 0, transform: "translateY(20px)" });

    useEffect(() => {
        if (props.show) {
        // animate in
        setStyle({ opacity: 1, transform: "translateY(0)" });
        } else {
        setStyle({ opacity: 0, transform: "translateY(20px)" });
        }
    }, [props.show]);

    return(
        <div className="pointer-events-none fixed bottom-10 w-full flex justify-center z-55">
                <div
                    className={`px-6 py-3 rounded-lg font-medium shadow-lg bg-zinc-800 outline-2 outline-primary text-gray-200 transition-all duration-500 ease-in-out
                                ${props.show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[100px]"}`}>
                    <h1>{props.message}</h1>
                </div>
        </div>
    )
}

export default Toast