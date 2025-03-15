import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Button, Stack } from '@mui/material';
import { Counter } from './Counter';
import { iProduct } from '../types/product';
import { useAppDispatch } from '../redux/hooks';
import { useState, useCallback } from 'react';
import { addItem } from './cartSlice';

interface AddToCartProps {
    product: iProduct;
}

export const AddToCart = ({ product }: AddToCartProps) => {
    const [count, setCount] = useState(0);
    const dispatch = useAppDispatch();

    const handleClick = useCallback((value: number) => {
        setCount((prev) => Math.max(0, prev + value));
    }, []);

    const handleSubmit = useCallback(() => {
        if (count === 0) return; // Không dispatch nếu count = 0
        dispatch(addItem({ ...product, quantity: count }));
        setCount(0); // Reset count sau khi thêm vào giỏ hàng
    }, [dispatch, product, count]);

    return (
        <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
        >
            <Counter count={count} handleClick={handleClick} />
            <Button
                variant="contained"
                startIcon={<ShoppingCartOutlinedIcon />}
                fullWidth
                onClick={handleSubmit}
                disabled={count === 0}
                sx={{
                    padding: { xs: '16px 0', md: '12px 0' },
                    borderRadius: '10px',
                    boxShadow: '0 15px 30px 10px hsla(26, 100%, 55%, 0.25)',
                    '&:hover': {
                        backgroundColor: 'primary.light',
                        boxShadow: '0 15px 30px 10px hsla(26, 100%, 55%, 0.25)',
                    },
                }}
            >
                Add to cart
            </Button>
        </Stack>
    );
};
