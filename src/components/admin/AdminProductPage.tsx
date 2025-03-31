import SidebarAdmin from '../sidebar/sideBarAdmin';
import { useProduct } from '../../useQuery/hooks/useProduct';
import { useState } from 'react';
import { useProductDetail } from '../../useQuery/hooks/useProductDetail';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from '../../useQuery/api/api';
import { toast } from 'react-toastify';
import AddModal from './AddModal';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import  DeleteIcon  from '@mui/icons-material/Delete';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Stack } from "@mui/material";


const AdminProductPage: React.FC = () => {
    const queryClient = useQueryClient()
    const {id} = useParams<{id: number}>()
    const {data} = useProduct()
    const [openModal, setOpenModal] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [openModalAdd, setOpenModalAdd] = useState(false)

    const mutation = useMutation({
        mutationFn: updateProduct,
        onSuccess: () => {
            toast.success("Thay doi thanh cong")
            queryClient.invalidateQueries(['products']);
            setOpenModal(false); 
        },
        onError: (error) => {
            console.error("Lỗi khi cập nhật sản phẩm:", error);
            console.error("Chi tiết lỗi:", error.response?.data || error.message);
            toast.error("Khong the sua san pham")
        }
    });


    const handleSave = () => {
        if (!selectedProduct) return;
        
        const formData = new FormData();
        formData.append("name", selectedProduct.name);
        formData.append("price", selectedProduct.price);
        formData.append("description", selectedProduct.description);

        if (Array.isArray(selectedProduct.images)) {
            selectedProduct.images.forEach((file) => {
                formData.append("images", file);
            });
        } else {
            formData.append("images", selectedProduct.images);
        }

        mutation.mutate({ id: selectedProduct.id, formData });
    };
    
    

    return (
    <div className="p-6">
        <div className='flex space-x-10'>
            <SidebarAdmin/>
            <div className='w-screen'>
            <h1 className="text-2xl font-bold mb-4">Admin Product List</h1>
            <button onClick={()=> setOpenModalAdd(true)} className="mb-4 p-2 bg-blue-500 text-white rounded">Add Product</button>
            {openModalAdd && (
                <AddModal setOpenModalAdd={setOpenModalAdd} />
            )}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                    <TableRow sx={{ backgroundColor: "#77a0f1" }}>
                        <TableCell className="border border-gray-300 p-2">ID</TableCell>
                        <TableCell className="border border-gray-300 p-2">Name</TableCell>
                        <TableCell className="border border-gray-300 p-2">Price</TableCell>
                        <TableCell className="border border-gray-300 p-2">Description</TableCell>
                        <TableCell className="border border-gray-300 p-2">Stock</TableCell>
                        <TableCell className="border border-gray-300 p-2">Actions</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {data?.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell className="border border-gray-300 p-2">{product.id}</TableCell>
                            <TableCell className="border border-gray-300 p-2 flex">
                                <img src={product.images[0]} className='w-20 h-20' alt="" />
                                <p>{product.name}</p>
                                </TableCell>
                            <TableCell className="border border-gray-300 p-2">${product.price}</TableCell>
                            <TableCell className="border border-gray-300 p-2">{product.description}</TableCell>
                            <TableCell className="border border-gray-300 p-2">{product.stock}</TableCell>
                            <TableCell className="border border-gray-300 p-2">
                                <Stack className='mt-5' direction="row" alignItems="center" spacing={2}>
                                    <Button variant='contained' startIcon={<EditRoundedIcon/>} onClick={() => {
                                        setSelectedProduct(product);
                                        setOpenModal(true);
                                        }} >
                                    Edit</Button>
                                    <Button variant='outlined' startIcon={<DeleteIcon />}>Delete</Button>
                                </Stack>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {openModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                <div key={data?.id} className="bg-white p-6 rounded-lg w-1/3">
                    <h2 className="text-xl font-bold mb-4">Edit Product</h2>
                    <label className="block mb-2">Name:</label>
                    <input type="text" onChange={(e) => setSelectedProduct(prev => ({...prev!, name: e.target.value}))} defaultValue={selectedProduct?.name} className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
                    <label className="block mb-2">Price:</label>
                    <input type="text" onChange={(e) => setSelectedProduct(prev => ({...prev!, price: e.target.value}))} defaultValue={selectedProduct?.price} className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
                    <label className="block mb-2">Description:</label>
                    <input type="text" onChange={(e) => setSelectedProduct(prev => ({...prev!, description: e.target.value}))} defaultValue={selectedProduct?.description} className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
                    <label className="block mb-2">Image:</label>
                    <input
                    type="file"
                    multiple
                    onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        setSelectedProduct(prev => ({
                            ...prev!,
                            images: files, // Lưu file vào state
                            previewImages: files.map(file => URL.createObjectURL(file)) // Tạo URL để xem trước
                        }));
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                    {selectedProduct?.previewImages && (
                        <div className="flex gap-2 mt-2">
                            {selectedProduct.previewImages.map((img, index) => (
                                <img key={index} src={img} alt="Preview" className="w-20 h-20 object-cover border" />
                            ))}
                        </div>
                    )}
                    <div className="flex justify-end">
                        <Stack direction="row" className='mt-5' spacing={2}>
                            <Button startIcon={<CloseRoundedIcon/>} variant='outlined' onClick={() => setOpenModal(false)} className="mr-2 p-2 bg-gray-500 text-white rounded">Cancel</Button>
                            <Button endIcon={<BeenhereIcon/>} variant='contained' color='success' onClick={handleSave} className="p-2 bg-blue-500 text-white rounded">
                            {mutation.isLoading ? "Saving..." : "Save"}
                            </Button>
                        </Stack>
                    </div>
                </div>
                </div>
            )}
            </div>
        </div>
    </div>
    )
}

export default AdminProductPage