import { useState } from "react";
import { Button } from "@mui/material";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import Stack from '@mui/material/Stack';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useMutation } from "@tanstack/react-query";
import { createProduct } from "../../useQuery/api/api";
import { toast } from "react-toastify";

const AddModal = ({setOpenModalAdd}) => {

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        category: "",
        brand: "",
        images: []
    });

    const mutation = useMutation({
        mutationFn: createProduct,
        onSuccess: () =>{
            toast("Thêm sản phẩm thành công", {position:"top-right"})
        },
        onError:(error) => {
            console.error("Lỗi khi gọi API:", error);
            toast("Thêm sản phẩm thất bại", {position:"top-right"})
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, files } = e.target;
    
        if (type === "file" && files) {
            const selectedFiles = Array.from(files);
            const previewUrls = selectedFiles.map(file => URL.createObjectURL(file));
    
            setFormData(prev => ({
                ...prev,
                images: selectedFiles,  // Lưu file ảnh thật
                previewImages: previewUrls // Lưu ảnh preview
            }));
        
        }
    };
    

    const handleAddProduct = (e: React.FormEvent) => {
        e.preventDefault();
    
        const data = new FormData();
        data.append("name", formData.name);
        data.append("price", formData.price);
        data.append("description", formData.description);
        data.append("category", formData.category);
        data.append("brand", formData.brand);
    
        if (formData.images && formData.images.length > 0) {
            formData.images.forEach((file) => {
                data.append("images", file);
            });
        }
    
        mutation.mutate({ formData: data }); 
    };
    
    



    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-1/3">
                <h2 className="text-xl font-bold mb-4">Add Product</h2>
                <label className="block mb-2">Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
                <label className="block mb-2">Price:</label>
                <input type="text" name="price" value={formData.price} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
                <label className="block mb-2">Description:</label>
                <input type="text" name="description" value={formData.description} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
                <label className="block mb-2">Category:</label>
                <input type="text" name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
                <label className="block mb-2">Brand:</label>
                <input type="text" name="brand" value={formData.brand} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
                <label className="block mb-2">Image:</label>
                <input type="file" 
                    name="images" 
                    multiple
                    onChange={handleChange} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                     />
                    {formData.previewImages && formData.previewImages.length > 0 && (
                        <div className="flex gap-2 mt-2">
                            {formData.previewImages.map((src, index) => (
                                <img key={index} src={src} alt={`Preview ${index}`} className="w-20 h-20 object-cover rounded-lg shadow" />
                        ))}
                        </div>
                    )}
                <Stack className='mt-5' direction="row" spacing={2}>
                    <Button onClick={()=>setOpenModalAdd(false)} variant="outlined" startIcon={<CloseRoundedIcon />}>
                        Cancel
                    </Button>
                    <Button onClick={handleAddProduct} variant="contained" endIcon={<AddCircleRoundedIcon />}>
                        {mutation.isLoading ? "Adding..." : "Add"}
                    </Button>
                </Stack>
            </div>
            
        </div>
    )
}

export default AddModal