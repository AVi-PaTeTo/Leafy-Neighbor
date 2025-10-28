import API from "../../api/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories, getTags } from "../../api/ApiFunctions";

const SideBar = (props) =>{
    const [searchText, setSearchText] = useState('')
    const [categories, setCategories] = useState([])
    const [queue, setQueue] = useState(null)
    const [categoryActive, setCategoryActive] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState('');
    const [priceActive, setPriceActive] = useState(false)
    const [priceRangeForm, setPriceRangeForm] = useState({min:'', max:''})
    const [priceRange, setPriceRange] = useState(null)
    const [tags, setTags] = useState([])
    const [selectedTags, setSelectedTags] = useState(new Set());
    const [loading, setLoading] = useState(false)

    const [query,setQuery] = useState()
    const [backendRequestParam, setBackendRequestParam] = useState('')

    const [hide,setHide] = useState(true)
    const navigate = useNavigate();

    //initial render on page load
    useEffect(() => {        
            const fetchCategories =async() =>{
                const response = await getCategories();
                setCategories(response.data)
            }

            const fetchTags =async() =>{
                const response = await getTags()
                setTags(response.data.map(group => ({...group, active: false})))
            }

            fetchCategories();
            fetchTags();
        }, []);
    
    useEffect(() => {
        if (props.urlParams) {
            const params = new URLSearchParams(props.urlParams);

            const url_tags = params.get('tags');
            const url_category = params.get('category');
            const url_price_range = params.get('price_range');
            const url_search = 
                                (props.search != null && props.search.trim() !== "" ? props.search.trim() : 
                                (params.get('search') != null && params.get('search').trim() !== "" ? `search=${params.get('search').trim()}` : ''));
            const hasTags = url_tags && url_tags.trim() !== '';
            const hasCategory = url_category && url_category.trim() !== '';
            const hasRange = url_price_range && url_price_range.trim() !== '';
            const hasSearch = url_search && url_search.trim() !== '';

            if (hasTags || hasCategory || hasRange || hasSearch) {
            // At least one filter
            const tagSet = new Set(hasTags ? url_tags.split(',').map(tagId => Number(tagId)) : []);
            const categoryId = hasCategory ? parseInt(url_category, 10) : undefined;
            const price_range = hasRange ? url_price_range.split(',') : [];
            const search_param = url_search
            setQueue({
                search: search_param,
                tags: tagSet,
                category: categoryId,
                range: price_range,

            });

            } else {
            // No filters present
            setQueue(null);
            }
        } else {
            setQueue(null);
        }
        }, [props.urlParams, props.search]);

    useEffect(()=>{

        if (queue !== null && tags.length > 0) {
            
            if (queue['search'] !== null){
                setSearchText(queue.search)
            }
            if (queue['tags']) {    
                setSelectedTags(queue.tags)
            }
            if(queue['category']){
                setSelectedCategory(queue.category)
            }
            if(queue['range'].length !== 0){
                const min = queue.range[0] === "" ? 0 : Number(queue.range[0]);
                const max = queue.range[1] === "" ? 20000 : Number(queue.range[1]);
                // console.log(min,max)
                setPriceRangeForm({ min, max });
                setPriceRange({ min, max })
            }
            setQueue(null)
        }
    },[tags, queue])

    // runs whenever the filter parameters change
    useEffect(()=>{
            const backendparams = new URLSearchParams();
            const urlparams = new URLSearchParams();

            if (selectedTags.size > 0) {
                backendparams.append('tags__id__in', Array.from(selectedTags).join(','));
                urlparams.append('tags', Array.from(selectedTags).join(','));
            }
            if (selectedCategory) {
                backendparams.append('categories__id__in', selectedCategory);
                urlparams.append('category', selectedCategory);
            }
            if (priceRange != null) {
                console.log(priceRange)
                backendparams.append('price__range', `${priceRange.min},${priceRange.max}`);
                urlparams.append('price_range', `${priceRange.min},${priceRange.max}`);
            }
            const back =`?${searchText?searchText:''}${backendparams && searchText?'&':''}${backendparams.toString()}`
            const urlQuery = `?${searchText?searchText:''}${urlparams.toString() !=='' && searchText?'&':''}${urlparams.toString()}`


            if (props.urlParams) {

            if (urlQuery !== '?' ){
                    setBackendRequestParam(back==='?'?'categories__id__in=0':back)
                    setQuery(urlQuery)
                }
            } else {
                setBackendRequestParam(back==='?'?'':back)
                setQuery(urlQuery)
            }

        }, [selectedCategory,selectedTags,priceRange, searchText])
        
    //
    useEffect(()=>{
        props.setUrlParams(query)
        props.setFilterParams(backendRequestParam)

    }, [query, backendRequestParam])

    //changes the state of tags, to keep visual track of selected tags 
    const handleTagToggle = (id) => {
        setTags(prev => prev.map(tag => (tag.id === id? {...tag, active: !tag.active} : tag)))
    }
    
    
    //logic to add or remove tags
    const handleTagSelect = (tagId) => {
        setSelectedTags((prevSelected) => {
        const newSelected = new Set(prevSelected);
        if (newSelected.has(tagId)) {
            newSelected.delete(tagId);
        } else {
            newSelected.add(tagId);
        }
        return newSelected;
        });
    };
    
    
    //simply selects 1 one category
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };
    
    
    
    const applyPriceRange = () => {
        const min = priceRangeForm.min === "" ? 0 : Number(priceRangeForm.min);
        const max = priceRangeForm.max === "" ? 20000 : Number(priceRangeForm.max);

        setPriceRange({ min, max });
        }

    return(
        <div className={`absolute z-29 transition-all ease-in-out duration-200 ${hide?'-translate-x-50':'translate-x-0 '}`}>
            <div
                onClick={() => setHide(prev => !prev)}
                style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }} 
                className="hover:cursor-pointer z-35 absolute px-2 pl-1 pr-3 text-white flex items-center justify-center tracking-wide top-1 -right-10 bg-zinc-800 rounded-tr-sm rounded-br-sm">
                Filters
            </div>
            <div className={` overflow-hidden px-2 bg-zinc-800 rounded-br-md flex sticky flex-col gap-2 self-start hide-scrollbar overflow-y-scroll max-h-[700px] py-4 transition-all ease-in-out ${props.hide===true?'top-16 duration-200  h-fit':'top-34 duration-300 h-fit'}`}>
                    <div className="group bg-gray-100 rounded-sm w-[184px]">
                        <div  onClick={() => setCategoryActive(prev => !prev)} className="flex justify-between items-center  hover:cursor-pointer">
                            <h2 className="p-2">Categories</h2>
                            <svg className={`fill-black ${categoryActive?'scale-y-[-1]':''} transition-transform ease-in-out duration-300`} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>
                        </div>
                        <div className={` grid  ${categoryActive?'grid-rows-[1fr] pb-2': 'grid-rows-[0fr]'} transition-all ease-in-out duration-300`}>
                            <div className="overflow-hidden flex flex-col">
                                {categories !== undefined && categories.map((c) => (
                                    <label key={c.id} htmlFor={c.name} className="hover:bg-gray-200/80 pl-6 py-1">
                                        <input id={c.name} className="mr-2  accent-primary" type="radio" name="category" value={c.id} checked={Number(selectedCategory) === c.id} onChange={handleCategoryChange}/>
                                        {c.name}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    <div className="group bg-gray-100 rounded-sm w-[184px]">
                            <div onClick={() => setPriceActive(prev => !prev)} className=" hover:cursor-pointer flex justify-between items-center">
                                <h2 className="p-2">Price</h2>
                                <svg className={`fill-black hover:cursor-pointer ${priceActive?'scale-y-[-1]':''} transition-transform ease-in-out duration-300`} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>
                            </div>
                            <div className={` grid  ${priceActive?'grid-rows-[1fr] px-5':'grid-rows-[0fr]'} transition-all ease-in-out duration-300`}>
                                <div className="overflow-hidden">
                                    <div className="pb-4 px-1">
                                        <label htmlFor="min-price">
                                            Min:
                                        </label>
                                            <input className="bg-gray-200/80 p-1 w-[140px] rounded-sm" type="number" min={0} max={20000} id="min-price" name="min-price" placeholder="0" value={priceRangeForm.min} onChange={(e) => setPriceRangeForm(prev => ({...prev, min: Number(e.target.value)}))}/>
                                    </div>
                                    <div className="pb-4 px-1">
                                        <label htmlFor="max-price">
                                            Max:
                                        </label>
                                            <input className="bg-gray-200/80 p-1 w-[140px] rounded-sm" type="number" min={0} max={20000} id="max-price" name="max-price" placeholder="20000" value={priceRangeForm.max} onChange={(e) => setPriceRangeForm(prev => ({...prev, max: Number(e.target.value)}))}/>
                                    </div>
                                    <button 
                                        disabled={priceRangeForm.min === '' && priceRangeForm.max === ''? true:false}
                                        className="w-[140px] ml-1 mb-2 py-1 hover:cursor-pointer disabled:hover:cursor-default transition-colors duration-300 bg-primary disabled:bg-gray-400 rounded-sm"
                                        onClick={() => applyPriceRange()}
                                    >Apply</button>
                                </div>
                            </div>
                        </div>

                    {tags !== undefined && tags.map((t) => (
                        <div  key={t.id} className="group bg-gray-100 rounded-sm w-[184px]">
                            <div onClick={() => handleTagToggle(t.id)} className=" hover:cursor-pointer flex justify-between items-center">
                                <h2 className="p-2">{t.name}</h2>
                                <svg className={`fill-black hover:cursor-pointer ${t.active?'scale-y-[-1]':''} transition-transform ease-in-out duration-300`} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>
                            </div>
                            <div className={` grid  ${t.active?'grid-rows-[1fr]':'grid-rows-[0fr]'} transition-all ease-in-out duration-300`}>
                                <div className="overflow-hidden">
                                    {t.tags !== undefined && t.tags.map((tag) => (
                                        <label key={tag.id} className="hover:bg-gray-200/80 flex items-center pl-6 py-1 cursor-pointer select-none">
                                            <input
                                                disabled={loading}
                                                type="checkbox"
                                                className="mr-3 accent-primary"
                                                checked={selectedTags.has(tag.id)}
                                                onChange={() => handleTagSelect(tag.id)}
                                            />
                                            {tag.name}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                    
                </div>
        </div>
    )
}


export default SideBar;