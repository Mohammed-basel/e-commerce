import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import ReactImageMagnify from 'react-image-magnify';


export default function Product() {
  const { productId } = useParams();

  const getproduct = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/products/${productId}`);

    return data.product;
  };
  const { data, isLoading } = useQuery(
    "product",
    getproduct
  );
  if (isLoading) {
    return <p>Loading....</p>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4">
            {data.subImages.map((img,index)=>
            <React.Fragment key={index}>
            <ReactImageMagnify {...{
                smallImage: {
                    alt: 'Wristwatch by Ted Baker London',
                    isFluidWidth: true,
                    src: img.secure_url
                },
                largeImage: {
                    src: img.secure_url,
                    width: 1200,
                    height: 1800
                },
                isHintEnabled:true,
            }} />
            </React.Fragment>
            )}
        </div>
        <div className="col-lg-8">
                <h2>{data.name}</h2>
                <p>{data.price}</p>
        </div>
      </div>
    </div>
  );
}
