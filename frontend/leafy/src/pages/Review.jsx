import { useState } from "react"
import { postReview } from "../api/ApiFunctions"
const Review = (props) =>{

    const [hoverId,setHoverId] = useState(0)
    const [rating, setRating] = useState(0)
    const [reviewText,setReviewText] = useState('')
    
    const postReviewButton = async() => {
        const formData = new FormData()
        formData.append('rating', rating)
        formData.append('review', reviewText)
        formData.append('product', Number(props.product))

        try{
            const response = await postReview(formData)
            console.log(response.data)
        } catch(error){
            console.log(error)
        }
        
    }

    return(
        <div className=" max-w-[400px] w-full bg-zinc-200 h-fit rounded-md py-6 px-2 mobile:p-6">
                    <h2 className="text-3xl font-bold">Add a review</h2>
                    <div className="w-full">
                        <h3 className="pt-8">Rating</h3>
                        <div  className="  px-6 mid-md:px-12 ">
                            <div onMouseLeave={() => setHoverId(0)} className="flex w-full justify-between">
                                {Array(5).fill(null).map((_, i) => (
                                    <svg key={i}
                                        fill="#99a1af" 
                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        id={i+1}
                                        onMouseOver={() => setHoverId(i+1)}
                                        onClick={()=> setRating(i+1)}
                                        className={`${hoverId !== 0 && hoverId >= i+1? 'fill-amber-400':''} ${(hoverId === 0 && rating !== 0) && rating >= i+1? 'fill-amber-400':''} hover:scale-120 w-10 h-10`}>
                                        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>
                                    </svg>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="h-fit w-full">
                        <h3 className="pt-8">Review</h3>
                        <textarea className="custom-scrollbar w-full focus:outline-1 p-2 focus:outline-primary resize-none bg-gray-100 rounded-md" value={reviewText} onChange={(e) => setReviewText(e.target.value)} name="review" rows={7} id="review"></textarea>
                    </div>
                    <div className="w-full h-[50px] flex pt-4 gap-4">
                        <button onClick={props.cancel} className="px-4 py-1 mt-[1px] ml-auto h-[32px] outline-1 font-semibold rounded-sm text-xl hover:cursor-pointer">
                            Cancel
                        </button>
                        <button onClick={()=>postReviewButton()} className="px-4 py-1 bg-primary  font-semibold rounded-sm text-xl hover:cursor-pointer">
                            Post
                        </button>
                    </div>
                </div>
    )
}

export default Review