import { useEffect, useState } from "react"

const ImageSection = (props) => {
    const [imageIndex, setImageIndex] = useState(0)

    // useEffect(()=>{
    //     setImageIndex(props.images.length === 0 ? 0: props.images[0].id)
    // },[props.images])

    const prev = () => {
        if(imageIndex > 0){
            
            setImageIndex(prev => prev-1)
        }
        // console.log(imageIndex, 'active')
    }

    const next = () => {
        const endIndex = props.images.length
        if(imageIndex < endIndex-1){
            setImageIndex(prev => prev+1)
        }
        console.log(imageIndex, 'active')
        console.log(endIndex)
    }
    // console.log(imageIndex, 'active')
    // console.log(props.images[7])

    const handleHover =(index)=>{
        console.log(index)
    }
    return(
    <>
        <div className="hidden lg:flex relative min-w-[4.5rem] h-[400px] overflow-hidden overflow-y-auto hide-scrollbar justify-center ">
            <div className="w-[4rem] h-fit rounded gap-2 py-1 flex flex-col ">
                {
                    props.images.map((image,index) => {
                        return(
                            <div key={image.id} onMouseOver={() => setImageIndex(index)} className={`relative w-full h-[5rem] rounded overflow-hidden ${props.images[imageIndex].id===image.id? 'ring-black ring-1' : ''}`}>
                                <img className="w-full object-cover" src={image.image} alt="" />
                                <div className={`absolute inset-0 bg-black/40  ${props.images[imageIndex].id===image.id? 'opacity-100' : 'opacity-0'}`}></div>
                            </div>
                        )
                    })
                }
                
            </div>
        </div>

        {/* Main Image Wrapper */}
        <div className="w-full min-w-[320px] lg:max-w-[600px]">
            <div className="relative w-full aspect-[4/5] flex justify-center rounded-lg overflow-hidden">
                {props.images.map(image => {
                    return(
                        <img key={image.id} className={`absolute right-0 h-full w-full object-contain object-top rounded-lg ${props.images[imageIndex].id===image.id? 'opacity-100' : 'opacity-0'}`} src={image.image} alt="" />
                    )
                })}
                <div className="flex absolute justify-center items-center bottom-2 right-2 gap-2">
                    <button onClick={prev} className="bg-white/50  w-12 h-12 lg:w-8 lg:h-8 rounded-4xl flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg>
                    </button>
                    <button onClick={next} className="bg-white/50  w-12 h-12 lg:w-8 lg:h-8 rounded-4xl flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
                    </button>
                </div>
            </div>
        </div>
    </>
)}

export default ImageSection