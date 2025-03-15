import { Box, IconButton, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface Props {
    count: number;
    handleClick: (value: number) => void;
}

export const Counter = ({ count, handleClick }: Props) => (
    <Box
        width={{ xs: '100%', md: 'auto' }}
        sx={{
            backgroundColor: 'secondary.light',
            borderRadius: '10px',
        }}
    >
        <Stack
            direction='row'
            spacing={2}
            justifyContent='space-between'
            alignItems='center'
        >
            <IconButton
                color='primary'
                onClick={() => handleClick(-1)}
                aria-label='Decrease quantity by 1'
            >
                <RemoveIcon
                    fontSize='small'
                    sx={{ '&:hover': { color: 'primary.light' } }}
                />
            </IconButton>
            <Typography variant='h4'>{count}</Typography>
            <IconButton
                color='primary'
                onClick={() => handleClick(1)}
                aria-label='Increase quantity by 1'
            >
                <AddIcon
                    fontSize='small'
                    sx={{ '&:hover': { color: 'primary.light' } }}
                />
            </IconButton>
        </Stack>
    </Box>
);