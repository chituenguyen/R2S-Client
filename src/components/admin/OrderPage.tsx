import React, { useState } from "react"
import SidebarAdmin from "../sidebar/sideBarAdmin"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Stack } from "@mui/material";
import { useOrder } from "../../useQuery/hooks/useOrder";
import { editStatus } from "../../useQuery/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";


const OrderPage: React.FC =() =>{
    const queryClient = useQueryClient();
    const {id} = useParams<{id: number}>()
    const {data} = useOrder()
    const mutation = useMutation({
        mutationFn: editStatus,
        onSuccess: () => {
            queryClient.invalidateQueries(["orders"]);  // Làm mới danh sách
            toast.success("Đã thay đổi trạng thái", { position: "top-right" });
        },
    });

    const changeStatusHandle = (id: number, currentStatus: string) => {
        const newStatus = currentStatus === "pending" ? "completed" : "pending";
        mutation.mutate({ id, newStatus });
    };

    console.log(data)
    return(
        <div className="p-6">
            <div className="flex space-x-10">
                <SidebarAdmin/>
                <div className="w-screen">
                    <h1 className="text-2xl font-bold mb-4">List Order</h1>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{backgroundColor: "aqua"}}>
                                    <TableCell className="border border-gray-300 p-2">Name</TableCell>
                                    <TableCell className="border border-gray-300 p-2">Address</TableCell>
                                    <TableCell className="border border-gray-300 p-2">Products</TableCell>
                                    <TableCell className="border border-gray-300 p-2">Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data?.map(order=>(
                                    <TableRow key={order.id}>
                                    <TableCell className="border border-gray-300 p-2">{order.name}</TableCell>
                                    <TableCell className="border border-gray-300 p-2">{order.address}</TableCell>
                                    <TableCell className="border border-gray-300 p-2">{order.total_amount}</TableCell>
                                    <TableCell className="border border-gray-300 p-2 text-center">
                                        <div className="flex items-center justify-center space-x-2">
                                            <span className={`px-3 py-1 h-fit text-white text-sm font-semibold 
                                                ${order.status === "pending" ? "bg-yellow-500" : "bg-green-500"}`}>
                                                {order.status === "pending" ? "⏳ Pending" : "✅ Completed"}
                                            </span>
                                            <Button 
                                                onClick={() => changeStatusHandle(order.id, order.status)} 
                                                variant="contained"
                                                color={order.status === "pending" ? "success" : "warning"}
                                                className="transition-transform transform hover:scale-105"
                                            >
                                                {order.status === "pending" ? "Hoàn tất" : "Đặt lại"}
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                                ))} 
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    )
} 

export default OrderPage