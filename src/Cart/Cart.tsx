import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart, selectCartItems } from "../Cart/cartSlice";
import { Popover, IconButton, Badge, Button } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { AiOutlineClose } from "react-icons/ai";

const Cart = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();

    const open = Boolean(anchorEl);
    const id = open ? "cart-popover" : undefined;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleRemoveItem = (id: number) => {
        dispatch(removeFromCart(id));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return (
        <div>
            {/* Nút mở giỏ hàng */}
            <IconButton aria-label="Open cart" onClick={handleClick}>
                <Badge badgeContent={cartItems.length} color="primary">
                    <ShoppingCartOutlinedIcon />
                </Badge>
            </IconButton>

            {/* Popover giỏ hàng */}
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                sx={{
                    "& .MuiPaper-root": {
                        width: 320,
                        maxHeight: 400,
                        overflowY: "auto",
                        padding: "16px",
                    },
                }}
            >
                <div className="flex justify-between items-center pb-2 border-b">
                    <h2 className="text-lg font-semibold">Your Cart</h2>
                    <button onClick={handleClearCart} className="text-red-500 text-sm">
                        Clear All
                    </button>
                </div>

                {/* Nếu giỏ hàng trống */}
                {cartItems.length === 0 ? (
                    <p className="text-center text-gray-500 py-4">Your cart is empty</p>
                ) : (
                    <div className="mt-2 space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex items-center justify-between border-b pb-2">
                                <div className="flex items-center space-x-3">
                                    <img
                                        src={item.image || "https://via.placeholder.com/50"}
                                        alt={item.name}
                                        className="w-14 h-14 object-cover rounded"
                                    />
                                    <div>
                                        <h3 className="text-sm font-medium">{item.name}</h3>
                                        <p className="text-gray-600 text-xs">${item.price}</p>
                                    </div>
                                </div>
                                <button onClick={() => handleRemoveItem(item.id)}>
                                    <AiOutlineClose className="text-gray-500 hover:text-red-500" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Nút Checkout */}
                {cartItems.length > 0 && (
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{ marginTop: 2, paddingY: 1.5, borderRadius: "10px" }}
                        onClick={() => alert("Proceeding to checkout")}
                    >
                        Checkout
                    </Button>
                )}
            </Popover>
        </div>
    );
};

export default Cart;
