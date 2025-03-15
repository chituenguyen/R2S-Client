import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

export default function SwiperComponent() {
    return (
        <div className="w-full max-w-[1440px] h-[500px] mx-auto">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                navigation
                pagination={{ clickable: true }}
                className="w-full h-full rounded-lg"
            >
                {/* Danh sách hình ảnh */}
                {[
                    "https://Tailwindmix.b-cdn.net/image-05.jpg",
                    "https://Tailwindmix.b-cdn.net/image-01.jpg",
                    "https://Tailwindmix.b-cdn.net/image-02.jpg",
                    "https://Tailwindmix.b-cdn.net/image-03.jpg",
                    "https://Tailwindmix.b-cdn.net/image-04.jpg"
                ].map((image, index) => (
                    <SwiperSlide key={index}>
                        <img src={image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
