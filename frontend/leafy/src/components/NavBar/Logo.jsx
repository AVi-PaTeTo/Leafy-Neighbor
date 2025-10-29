import { useNavigate } from "react-router-dom"

const Logo = (props) => {
    const navigate = useNavigate();
    return(
        <div 
            className={`flex items-center z-5 pt-1 hover:cursor-pointer transition-transform duration-300 ease-in-out ${props.search?'-translate-y-[200%] md:translate-y-0':'translate-y-0 delay-600'}`}
            onClick={() => navigate('/')}
            >    
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-[${props.size}] w-[${props.size}]`} viewBox="0 -960 960 960" fill="#afc35f"><path d="M342-160h276l40-160H302l40 160Zm0 80q-28 0-49-17t-28-44l-45-179h520l-45 179q-7 27-28 44t-49 17H342ZM200-400h560v-80H200v80Zm280-240q0-100 70-170t170-70q0 90-57 156t-143 80v84h320v160q0 33-23.5 56.5T760-320H200q-33 0-56.5-23.5T120-400v-160h320v-84q-86-14-143-80t-57-156q100 0 170 70t70 170Z"/></svg>
            <div
                style={{ fontSize: props.f_size }} 
                className={`flex flex-col font-[600] pt-1`}>
                <h2 className={`-mb-2 transition-colors ease-in-out duration-200 ${props.font} `}>Leafy</h2>
                <h2 className={` transition-colors ease-in-out duration-200 ${props.font} `}>Neighbour</h2>
            </div>
        </div>
    )
}

export default Logo