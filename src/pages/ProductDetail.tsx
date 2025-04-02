// components/ProductDetail.tsx
import { useEffect, useState, useMemo } from "react"
import { useParams } from "react-router-dom"
import { useGetProductById } from "../hooks/useGetProducts"
import { useCart } from "../hooks/useCart"
import RelatedItem from "./RelatedItem"

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>()
  const { data: product, isLoading, error } = useGetProductById(Number(id))
  const { addToCart } = useCart()
  const [selectedImage, setSelectedImage] = useState<string>("")
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState<string>("red")
  const [selectedSize, setSelectedSize] = useState<string | null>(null)

  const colors = [
    { name: "Red", color: "bg-red-500" },
    { name: "Blue", color: "bg-blue-500" },
    { name: "Gray", color: "bg-gray-400" }
  ]

  // Cập nhật ảnh được chọn khi product thay đổi
  useEffect(() => {
    if (product?.images?.length) {
      setSelectedImage(product.images[0])
      console.log("Product data:", product)
    }
  }, [product])

  // Reset state khi id thay đổi
  useEffect(() => {
    window.scrollTo(0, 0)
    setQuantity(1)
    setSelectedColor("red")
    setSelectedSize(null)
  }, [id])

  const handleAddToCart = () => {
    if (!product) return

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      images: selectedImage,
      quantity,
      color: selectedColor,
      size: selectedSize
    }

    addToCart(cartItem)
  }

  if (isLoading) return <p>Loading...</p>
  if (error || !product) return <p>Product not found</p>

  return (
    <div>
      <div className="container mx-auto py-12 mt-20 grid grid-cols-1 md:grid-cols-[60%_40%] gap-10">
        {/* Left: Image Gallery */}
        <div className="flex gap-4 items-start w-full">
          <div className="flex flex-col gap-2">
            {product.images?.slice(0, 4).map((img, index) => (
              <div
                key={index}
                className="bg-[#F5F5F5] rounded w-[170px] h-[138px] flex items-center justify-center"
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index}`}
                  className={`h-[120px] p-1 cursor-pointer ${
                    selectedImage === img
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                  onClick={() => setSelectedImage(img)}
                />
              </div>
            ))}
          </div>

          <div className="bg-[#F5F5F5] rounded w-[450px] h-[576px] w-full p-4 flex items-center justify-center">
            {selectedImage && (
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            )}
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="w-full ml-auto">
          <h1 className="text-[24px] font-semibold font-[Inter]">
            {product.name}
          </h1>
          <div className="flex text-yellow-400 mb-2">
            {Array.from({ length: 5 }, (_, i) => (
              <span
                key={i}
                className={
                  i < product.rate ? "text-yellow-500" : "text-gray-300"
                }
              >
                ★
              </span>
            ))}
          </div>
          <p className="text-[24px] text-black font-[Inter]">
            ${product.price}
          </p>
          <p className="text-[14px] text-black my-4">{product.description}</p>

          {/* Colors */}
          <div className="my-4 flex items-center gap-4">
            <h3 className="text-[20px] font-[Inter]">Colors:</h3>
            <div className="flex gap-4">
              {colors.map(({ name, color }) => (
                <div
                  key={name}
                  className={`w-4 h-4 rounded-full cursor-pointer ${color} ${
                    selectedColor === name
                      ? "border-2 border-white outline outline-2 outline-black"
                      : "border-2 border-white"
                  }`}
                  onClick={() => setSelectedColor(name)}
                />
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="my-4 flex items-center gap-4">
            <h3 className="text-[20px] font-[Inter]">Size:</h3>
            <div className="flex gap-2">
              {["XS", "S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  className={`w-[32px] h-[32px] items-center justify-center text-[14px] border border-gray-400 rounded ${
                    selectedSize === size
                      ? "bg-red-500 text-white border border-red-500"
                      : ""
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Buy Now */}
          <div className="flex items-center gap-4 my-6">
            {/* Quantity Selector */}
            <div className="flex border border-gray-400 w-[159px] h-[44px] items-center justify-between rounded">
              <button
                className="px-3 py-2 bg-gray-200"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button
                className="px-3 py-2 bg-gray-200"
                onClick={() =>
                  setQuantity((prev) => Math.min(product.stock, prev + 1))
                }
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>

            {/* Buy Now Button */}
            <button
              onClick={handleAddToCart}
              className={`w-[165px] h-[44px] flex items-center justify-center rounded ${
                product.stock === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500 text-white"
              }`}
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? "Out of Stock" : "Buy Now"}
            </button>
          </div>

          <div className="border border-gray-400 rounded">
            <div className="p-4 flex items-start gap-3">
              <img
                src="/assets/images/fast-delivery-icon-free-vector.jpg"
                alt="icon-delivery2"
                className="w-[40px] h-[40px] object-contain"
              />
              <div>
                <h3 className="font-medium text-[16px]">Free Delivery</h3>
                <button className="font-medium text-[12px] text-black hover:border-b hover:border-black">
                  Enter your postal code for Delivery Availability
                </button>
              </div>
            </div>

            <div className="border-t border-t-gray-400 p-4 flex items-start gap-3">
              <img
                src="/assets/images/png-clipart-money-back-guarantee-computer-icons-search-button-miscellaneous-service.png"
                alt="Icon-return"
                className="w-[40px] h-[40px] object-contain"
              />
              <div>
                <h3 className="font-medium text-[16px]">Return Delivery</h3>
                <span className="font-medium text-[12px] text-black mr-1">
                  Free 30 Days Delivery Returns.
                </span>
                <button className="font-medium text-[12px] text-black hover:border-b hover:border-black">
                  Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-5 mb-10">
        {product?.id && <RelatedItem currentProductId={product.id} />}
      </div>
    </div>
  )
}

export default ProductDetail
