import { useState, useRef, useEffect } from "react"
import AutoGrowingTextarea from "../components/TextArea"
import ImageUploader from "../components/ImageUploader";
import { createProduct, getProductById, getProducts, getCategories, getTags } from "../api/ApiFunctions";

const Create = () => {
    const PLANT_CARE_ID = 13;

    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedTags, setSelectedTags] = useState({})
    const [showUploader, setShowUploader] = useState(false);
    const [images, setImages] = useState([]);
    const [featureIndex, setFeatureIndex] = useState(0)
    const [specIndex, setSpecIndex] = useState(0)
    const [features, setFeatures] = useState([])
    const [specifications, setSpecifications] = useState([])
    const [prodFormData, setProdFormData] = useState({
        name: '',
        price:'',
        stock: '',
        short_description:'',
        care_instructions:'',
        detailed_description: ''
    })

    useEffect(() => {        
            const fetchCategories =async() =>{
                const response = await getCategories();
                setCategories(response.data)
            }

            const fetchTags =async() =>{
                const response = await getTags()
                setTags(response.data)
            }

            fetchCategories();
            fetchTags();
        }, []);

    const handleInputChange = (e) =>{
        const {id, value} = e.target
        setProdFormData(prev => ({...prev, [id]:value}))
    }

    const addFeature = (e) => {
        e.preventDefault()
        setFeatures(prev => [...prev, {index: featureIndex, text:''}])
        setFeatureIndex(prev => prev+1)
    }

    const removeFeature = (e) => {
    e.preventDefault();
    const id = Number(e.target.id); // make sure this is the correct id type
    setFeatures(prev =>
        prev.filter(f => f['index'] !== id));
    }

    const handleFeatureChange = (e) => {
        setFeatures(prev => prev.map(feature => {
            return feature.index == e.target.id? {...feature, text:e.target.value}:feature
        }))
    }

    const addSpecification = (e) => {
        e.preventDefault()
        setSpecifications(prev => [...prev, {index: specIndex, key: '', value:''}])
        setSpecIndex(prev => prev+1)
    }

    const handleSpecKeyChange = (e) => {
        setSpecifications(prev => prev.map(spec => {
            return spec.index == e.target.id? {...spec, key:e.target.value}:spec
        }))
    }

    const handleSpecValueChange = (e) => {
        setSpecifications(prev => prev.map(spec => {
            return spec.index == e.target.id? {...spec, value:e.target.value}:spec
        }))
    }

    const removeSpecification = (e) => {
    e.preventDefault();
    const id = Number(e.target.id); // make sure this is the correct id type
    setSpecifications(prev =>
        prev.filter(spec => spec['index'] !== id));
    }


    const createJson = async (e) => {
        e.preventDefault();

        let finalSpecifications = {};
        for (const element of specifications) {
            finalSpecifications = { ...finalSpecifications, [element.key]: element.value };
        }

        const finalFeatures = features.map(feature => feature.text);

        const description = {
            short_description: prodFormData['short_description'],
            care_instructions: prodFormData['care_instructions'],
            detailed_description: prodFormData['detailed_description'],
            features: finalFeatures,
            specifications: finalSpecifications,
        };

        // Create FormData
        const formData = new FormData();

        // Append images
        images.forEach((imageObj) => {
            if (imageObj.file) {
            formData.append('uploaded_images', imageObj.file);
            }
        });


        // Append scalar fields
        formData.append('title', prodFormData['name'] || '');
        formData.append('stock', prodFormData['stock'] || '');
        formData.append('price', prodFormData['price'] || '');

        for (const category of selectedCategories) {
            formData.append('categories', category)
        }
        // formData.append('categories', selectedCategories.join(','))

        const allTagIds = Object.values(selectedTags).flatMap(value => {
            if (value instanceof Set) {
                return Array.from(value); // convert Set to array
            } else if (typeof value === 'number') {
                return [value];
            }
            return []; // skip any unexpected value types
            });
        
        const finalTags = selectedCategories.includes(13)? []:allTagIds
        
        for (const tag of finalTags) {
            formData.append('tags', tag)
        }


        // Append description as JSON string if backend expects a single value
        formData.append('description', JSON.stringify(description));

        // Debug output: Show what is in formData
        // for (let pair of formData.entries()) {
        //     console.log(pair[0], pair[1]);
        // }


        try {
            const response = await createProduct(formData);
            console.log(response)
            } catch (error) {
                console.error(error);
            }
            alert('uploaded successfully')
        };

    //only used inside handleTagChange 
    const otherTags = (tagId) => {
    
        const newSelected = new Set(selectedTags['other'])
        if (newSelected.has(tagId)) {
            newSelected.delete(tagId);
        } else {
            newSelected.add(tagId);
        }
        return newSelected;

    }

    const handleTagChange = (tagGroup, tagId) => {
        if(['Light Requirement', 'Watering Needs', 'Size'].includes(tagGroup)){
            setSelectedTags(prev => ({...prev, [tagGroup]:tagId}))
        } else {
            if(selectedTags['other']){
                setSelectedTags(prev => ({...prev, ['other']:otherTags(tagId)}))
            } else {
                selectedTags['other'] = new Set()
                setSelectedTags(prev => ({...prev, ['other']:otherTags(tagId)}))
            }
        }

    }

    const handleCategoryChange = (catId) => {
        setSelectedCategories(prev => {
            if (catId === PLANT_CARE_ID) {
            if (prev.includes(PLANT_CARE_ID)) {
                // Deselect it
                return [];
            } else {
                return [PLANT_CARE_ID];
            }
            }
            if (prev.length === 1 && prev[0] === PLANT_CARE_ID) {
            return prev;
            }
            if (prev.includes(catId)) {
            return prev.filter(id => id !== catId);
            } else {
            if (prev.length === 2) {
                return [prev[1], catId];
            } else {
                return [...prev, catId];
            }
            }
        });
        };
        
    return(
        <div className="w-full min-h-screen max-h-fit bg-primary flex flex-col">
            <div className="pt-12 flex justify-center ">
                
                

                <form className="mt-5 p-4 sm:p-12 sm:pt-8 rounded-md w-screen max-w-[600px] flex flex-col  bg-primary ">
                    
                    <h1 className="mb-4 text-3xl font-bold">Create New Product</h1>

                    

                    <div style={{ maxWidth: 600 }}>
                    
                    {/* Gallery style wireframe area */}
                        <div className=" relative h-fit p-7 mb-2 rounded-md bg-gray-200">
                            {/* Upload button at top right */}
                            <button className="absolute right-4 top-4 px-5 py-2.5 rounded-md font-semibold bg-primary"
                            onClick={(e) => {
                                e.preventDefault();
                                setShowUploader(true)}}
                            >Upload Images</button>

                            {/* Thumbnails row when modal is closed */}
                            <div className={`flex ${images.length === 0? 'mt-5': 'mt-14'}  gap-6 h-fit overflow-hidden overflow-x-auto custom-scrollbar`}>
                            {images.map((img, idx) => (
                                typeof img.id === "string"
                                ?
                                <img
                                key={img.id}
                                src={img.id}
                                alt={img.file?.name || `preview-${idx}`}
                                height={130}
                                width={130}
                                className="object-cover mb-4 rounded-sm"
                                
                                />
                                : null
                            ))}
                            </div>
                        </div>

                        <ImageUploader
                            isOpen={showUploader}
                            onClose={() => setShowUploader(false)}
                            images={images}
                            setImages={setImages}
                            desiredAspect={4/5} // set your aspect ratio, e.g., 4:3
                            aspectTolerance={0.03}
                        />
                    </div>

                    <div className="w-full flex flex-col group">
                        <label className={` pointer-events-none transition-transform duration-500 ease-in-out translate-x-2 ${prodFormData['name'] ===''?'translate-y-7':'translate-y-1'} group-focus-within:translate-y-1`} htmlFor="name">Product Name</label>
                        <input className=" bg-gray-200 p-1 px-2 rounded-sm mb-2 focus:outline-accent focus:outline-2" type="text" value={prodFormData['name']} onChange={handleInputChange} name="" id="name" />
                    </div>
                    

                    <div className="flex flex-col sm:flex-row sm:gap-6 w-full">
                        <div className="w-full flex flex-col group">
                            <label className={`pointer-events-none transition-transform duration-500 ease-in-out translate-x-2 ${prodFormData['price'] ===''?'translate-y-7':'translate-y-1'} group-focus-within:translate-y-1`} htmlFor="price">Price</label>
                            <input className="focus:outline-accent focus:outline-2 bg-gray-200 p-1 px-2 rounded-sm mb-2" min={0} type="number" value={prodFormData['price']} onChange={handleInputChange} name="" id="price" />
                        </div>

                        <div className="w-full flex flex-col group">
                            <label className={`pointer-events-none transition-transform duration-500 ease-in-out translate-x-2 ${prodFormData['stock'] ===''?'translate-y-7':'translate-y-1'} group-focus-within:translate-y-1`} htmlFor="stock">Stock</label>
                            <input className="focus:outline-accent focus:outline-2 bg-gray-200 p-1 px-2 rounded-sm mb-2" type="text" value={prodFormData['stock']} onChange={handleInputChange} name="" id="stock" />
                        </div>
                    </div>
                    
                    <div className="w-full flex flex-col group">
                        <label className={`pointer-events-none transition-transform duration-500 ease-in-out translate-x-2 group-focus-within:translate-y-1 ${prodFormData['short_description'] === ''? 'translate-y-7':'translate-y-1'}`} htmlFor="short_description">Short Description</label>
                        <AutoGrowingTextarea    id={'short_description'}
                                                onChange={handleInputChange}
                                                value = {prodFormData['short_description']}
                        />
                    </div>

                    <div className="w-full flex flex-col group">
                        <label className={`pointer-events-none transition-transform duration-500 ease-in-out translate-x-2  group-focus-within:translate-y-1 ${prodFormData['care_instructions'] === ''? 'translate-y-7':'translate-y-1'}`} htmlFor="care_instructions">Care Instructions</label>
                        <AutoGrowingTextarea    id={'care_instructions'}
                                                onChange={handleInputChange}
                                                value = {prodFormData['care_instructions']}
                        />
                        
                    </div>

                    <div className="w-full flex flex-col group">
                        <label className={`pointer-events-none transition-transform duration-500 ease-in-out translate-x-2 group-focus-within:translate-y-1 ${prodFormData['detailed_description'] === ''? 'translate-y-7':'translate-y-1'}`} htmlFor="detailed_description">Detailed Description</label>
                        <AutoGrowingTextarea    id={'detailed_description'}
                                                onChange={handleInputChange}
                                                value = {prodFormData['detailed_description']}
                        />
                    </div>


                    <fieldset className="flex flex-col w-full border-2 border-text rounded-md mt-4 p-4 gap-3">
                        <legend className=" text-2xl font-semibold">Features</legend>
                        {features.map(feature => {
                                return(
                                    <div key={feature.index} className="flex gap-2">
                                        <input id={feature.index} className="focus:outline-accent focus:outline-2 w-[95%] bg-gray-200 p-1 rounded-sm" type="text" value={feature.text} onChange={handleFeatureChange} placeholder={'Feature text (i.e., Low maintenance, ideal for beginners )'}/>
                                        <button id={feature.index} onClick={removeFeature} className="hover:cursor-pointer~">
                                            <svg className="pointer-events-none h-6 w-6 shrink-0 rounded-sm bg-red-500" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m336-280-56-56 144-144-144-143 56-56 144 144 143-144 56 56-144 143 144 144-56 56-143-144-144 144Z"/></svg>
                                        </button>
                                    </div>
                                )
                            })
                        }
                        <button onClick={addFeature} className="py-2 px-4 bg-black/50 text-white rounded-md ml-auto">
                            <svg  className="pointer-events-none" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                        </button>
                    </fieldset>
                    
                    <fieldset className="flex flex-col w-full border-2 border-text rounded-md mt-4 p-4 gap-3">
                        <legend className=" text-2xl font-semibold">Specifications</legend>
                        {specifications.map(spec => {
                                return(
                                    <div key={spec.index} className="flex gap-2">
                                        <input id={spec.index} className="focus:outline-accent focus:outline-2 w-[45%] bg-gray-200 p-1 rounded-sm" type="text" placeholder={'Title (i.e., Watering )'} value={spec.key} onChange={handleSpecKeyChange }/>
                                        <p className="text-2xl font-semibold">-</p>
                                        <input id={spec.index} className="focus:outline-accent focus:outline-2 w-[45%] bg-gray-200 p-1 rounded-sm" type="text" placeholder={'Value (i.e., Once a week )'} value={spec.value} onChange={handleSpecValueChange }/>
                                        <button id={spec.index} onClick={removeSpecification} className="hover:cursor-pointer">
                                            <svg className="pointer-events-none  h-6 w-6 shrink-0 rounded-sm bg-red-500" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m336-280-56-56 144-144-144-143 56-56 144 144 143-144 56 56-144 143 144 144-56 56-143-144-144 144Z"/></svg>
                                        </button>
                                    </div>
                                )
                            })
                        }
                        <button onClick={addSpecification} className="py-2 px-4 bg-black/50 text-white rounded-md ml-auto">
                            <svg  className="pointer-events-none" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                        </button>
                    </fieldset>
                    
                    <fieldset className="flex flex-col w-full border-2 border-text rounded-md mt-4 p-4 gap-3">
                        <legend className=" text-2xl font-semibold">Categories</legend>
                            <div className="group bg-gray-100 py-2 flex flex-col rounded-md">
                                        {categories !== undefined && categories.map((c) => (
                                            <label key={c.id} htmlFor={c.name} className="hover:bg-gray-200/80 pl-6 py-1">
                                                <input
                                                    id={c.name}
                                                    className="mr-2 accent-primary"
                                                    type="checkbox"
                                                    value={c.id}
                                                    checked={selectedCategories.includes(c.id)}
                                                    disabled={
                                                        selectedCategories.includes(13) && c.id !== 13
                                                    }
                                                    onChange={() => handleCategoryChange(c.id)}
                                                    />
                                                {c.name}
                                            </label>
                                        ))}
                            </div>
                    </fieldset>
                    {
                        !selectedCategories.includes(13) &&
                    <fieldset className="flex flex-col w-full border-2 border-text rounded-md mt-4 p-4 gap-3">
                        <legend className=" text-2xl font-semibold">Tags</legend>
                        {tags !== undefined && tags.map((t) => (
                            <div  key={t.id} className="group bg-gray-100 rounded-sm">
                                <div className="flex justify-between items-center">
                                    <h2 className="p-2 font-semibold">{t.name}</h2>
                                </div>
                                <div className={` flex flex-col pb-2`}>

                                        {t.tags !== undefined && t.tags.map((tag) => {
                                            if(['Light Requirement', 'Watering Needs', 'Size'].includes(t.name)){
                                                return(
                                                        <label key={tag.id} className="hover:bg-gray-200/80 flex items-center pl-6 py-1 cursor-pointer select-none">
                                                            <input
                                                                // disabled={loading}
                                                                type="radio"
                                                                name={t.name}
                                                                className="mr-3 accent-primary"
                                                                onChange={()=> handleTagChange(t.name, tag.id)}
                                                            />
                                                            {tag.name}
                                                        </label>
                                                )} else {
                                                    return(
                                                        <label key={tag.id} className="hover:bg-gray-200/80 flex items-center pl-6 py-1 cursor-pointer select-none">
                                                            <input
                                                                // disabled={loading}
                                                                type="checkbox"
                                                                checked={selectedTags['other'] && selectedTags['other'].has(tag.id)}
                                                                value={tag.id}
                                                                className="mr-3 accent-primary"
                                                                onChange={()=> handleTagChange(t.name, tag.id)}
                                                            />
                                                            {tag.name}
                                                        </label>
                                                    )
                                            }
                                        })}

                                </div>
                            </div>
                        ))}
                    </fieldset>
                    }                    
                        <button onClick={createJson} className="mt-8 py-2 px-6 bg-accent rounded-md text-white font-bold">Create JSON</button>
                </form>

                {/* <div className="flex flex-col mt-15 items-center">
                        <input type="file"/>
                        <button onClick={handlePost}>hello</button>
                        {imageData}
                    </div> */}
                    
            </div>
        </div>
    )
} 

export default Create