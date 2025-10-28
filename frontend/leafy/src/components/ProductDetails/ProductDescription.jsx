import React from "react";

const ProductDescription = (props) => {
    function toTitleCase(str) {
        return str
          .toLowerCase()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      }
    
    return (
    <section className=" space-y-6 text-gray-800 text-base leading-relaxed">
      <p>{props.product.detailed_description}</p>

      <ul className="list-disc list-inside text-gray-700 space-y-1">
        {props.product.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>

      <div>
        <h3 className="mt-6 text-lg font-medium text-gray-900">Specifications</h3>
        <div className="mt-2 grid grid-cols-2 gap-4 text-sm text-gray-700">
          {props.product.specifications !== undefined &&
            //Creates an array of pairs of key and value
            Object.entries(props.product.specifications).map((spec, index) => { 
              return(
                <React.Fragment key={index}>
                    <div  className="font-medium">{toTitleCase(spec[0].replace(/_/g,' '))}:</div>
                    <div  >{spec[1]}</div>
                </React.Fragment>
              )
            })
          }
          
        </div>
      </div>

      <div>
        <h3 className="mt-6 text-lg font-medium text-gray-900">Care Instructions</h3>
        <p className="mt-1 text-gray-700">{props.product.care_instructions}</p>
      </div>
    </section>
  );
}

export default ProductDescription