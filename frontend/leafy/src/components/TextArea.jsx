import { useEffect, useRef, useState } from "react";

function AutoGrowingTextarea(props) {
        
        const textareaRef = useRef(null);

        // Adjust height whenever the text changes
        useEffect(() => {
            const textarea = textareaRef.current;
            if (textarea) {
            textarea.style.height = 'auto'; // reset height
            textarea.style.height = textarea.scrollHeight + 'px'; // set to scrollHeight
            }
        }, [props.value]);

        return(
            <textarea
                                id={props.id}
                                ref={textareaRef}
                                value={props.value}
                                // placeholder="Enter short description..."
                                onChange={props.onChange}
                                className="focus:outline-accent focus:outline-2 w-full overflow-hidden resize-none p-1 px-2 bg-gray-200 rounded-sm mb-2"
                                rows={1} // start with one row
                                />
        );
    }

export default AutoGrowingTextarea;