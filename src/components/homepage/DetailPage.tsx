import React, { useState, useEffect } from "react";
import Rating from "../rating/Rating";
import ColorPicker from "../rating/pickColor";
import SizePicker from "../rating/pickSize";
import QuantitySelector from "../rating/ButtonQuanti";
import LikePicker from "../rating/pickLike";
import { useProductDetail } from "../../useQuery/hooks/useProductDetail";
import { useParams } from "react-router-dom";

interface Product {
    id: number
    name: string
    price: number
    description: string
    image: string
    category: string
    brand: string
    stock: number
  }

const DetailPage = () => {
    const {id} = useParams<{id: number}>()
    const {data} = useProductDetail(id)
    const [rating, setRating] = useState(4);
    const [selectedImage, setSelectedImage] = useState(null)
    if (!data){
        return <></>
    }
    if (selectedImage === null) {
        setSelectedImage(data?.data[0].images[0]);
    }
    console.log(data.data[0].images[1])
    
    return (
    <div className="max-w-7xl mx-auto p-6 space-y-10 sm:flex-col">
        <div className="space-x-2">
            <span className="text-sm text-zinc-500">Account /</span>
            <span className="text-sm text-zinc-500">Gaming /</span>
            <span className="text-sm">{data?.data[0].name}</span>
        </div>
        <div className="flex-col md:flex-row sm:flex-col lg:flex justify-center">
        <div className="flex space-x-10">
            <div className="w-28 shadow-sm space-y-2">
                {data?.data[0].images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`Thumbnail ${index}`}
                        className={`bg-zinc-100 cursor-pointer p-1 border ${
                            selectedImage === img ? "border-red-500" : "border-transparent"
                        }`}
                        onClick={() => setSelectedImage(img)}
                    />
                ))}
            </div>
            <img className="w-92 h-[475px] bg-zinc-100" src={selectedImage} alt="Selected" />
        </div>
        <div className="flex flex-col ml-10 w-96 space-y-3">
            <h1 className="font-bold text-lg">{data?.data[0].name}</h1>
            <Rating rating={rating} onRatingChange={setRating} />
            <p className="font-semibold text-lg">$192.00</p>
            <div className="border-b-black border-b">
            <p className="text-sm w-80 h-20">PlayStation 5 Controller Skin High quality vinyl with air channel 
                adhesive for easy bubble free install & mess free removal Pressure sensitive.</p>
            </div>
            <div className="flex items-center space-x-2">
            <span className="font-semibold">Colors:</span>
                <ColorPicker />
            </div>
            <div className="flex items-center space-x-2">
            <span className="font-semibold">Size:</span>
                <SizePicker />
            </div>
            <div className="flex space-x-10">
                <QuantitySelector />
                <button className="w-32 bg-red-400 text-white rounded-md">
                    Buy Now
                </button>
                <LikePicker />
            </div>
            <div>
            <div className="border rounded-lg w-96">
            {/* Free Delivery */}
                <div className="flex items-center p-4 border-b">
                    <span className="text-2xl">🚚</span>
                    <div className="ml-3">
                        <h3 className="font-semibold">Free Delivery</h3>
                        <a href="#" className="text-blue-600 underline">
                            Enter your postal code for Delivery Availability
                        </a>
                    </div>
                </div>

            {/* Return Delivery */}
                <div className="flex items-center p-4">
                    <span className="text-2xl">🔄</span>
                    <div className="ml-3">
                        <h3 className="font-semibold">Return Delivery</h3>
                    <p>
                        Free 30 Days Delivery Returns.{" "}
                    <a href="#" className="text-blue-600 underline">Details</a>
                    </p>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    )
};

export default DetailPage;
