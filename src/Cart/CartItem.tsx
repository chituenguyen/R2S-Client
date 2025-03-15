import { Typography, IconButton, Avatar, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { removeItem } from '../Cart/cartSlice';
import { useAppDispatch } from '../redux/hooks';
import { useCallback } from 'react';
import { iProduct } from '../types/product';

// Định nghĩa kiểu dữ liệu để đảm bảo `quantity` luôn có
interface iCartItem extends iProduct {
    quantity: number;
}

export const CartItem = ({ item }: { item: iCartItem }) => {
    const dispatch = useAppDispatch();

    const handleDelete = useCallback(() => {
        dispatch(removeItem(item.id));
    }, [dispatch, item.id]);

    return (
        <Stack
            direction="row"
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
        >
            <Avatar
                variant="rounded"
                src={item.images?.[0]?.url ? `images/${item.images[0].url}` : 'images/default.jpg'}
                alt={item.images?.[0]?.title || 'Product Image'}
                sx={{ width: '50px', height: '50px' }}
            />
            <Stack maxWidth="60%">
                <Typography noWrap>{item.title}</Typography>
                <Typography>
                    {item.quantity > 1 && `$${item.salePrice} x ${item.quantity} `}
                    <Typography
                        component="span"
                        sx={{
                            fontWeight: 'bold',
                            color: 'secondary.contrastText',
                        }}
                    >
                        ${item.salePrice * (item.quantity || 1)}
                    </Typography>
                </Typography>
            </Stack>
            <IconButton onClick={handleDelete}>
                <DeleteIcon />
            </IconButton>
        </Stack>
    );
};
