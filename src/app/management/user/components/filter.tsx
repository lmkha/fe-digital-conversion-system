import { Box, Grid2, Stack, TextField, Typography } from "@mui/material";

export default function Filter() {
    return (
        <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
            height={100}
            sx={{ backgroundColor: '#F4F6F8E5' }}
        >
            <Stack
                direction={"row"}
                spacing={2}
                sx={{
                    width: '90%',
                    mb: 1,
                }}
            >
                <Stack width='20%' spacing={2}>
                    <Typography fontWeight='bold'>Họ tên</Typography>
                    <TextField size="small" sx={{ width: '100%', backgroundColor: 'white' }} />
                </Stack>

                <Stack width='15%' spacing={2}>
                    <Typography fontWeight='bold'>Tên tài khoản</Typography>
                    <TextField size="small" sx={{ width: '100%', backgroundColor: 'white' }} />
                </Stack>
                <Stack width='20%' spacing={2}>
                    <Typography fontWeight='bold'>Email</Typography>
                    <TextField size="small" sx={{ width: '100%', backgroundColor: 'white' }} />
                </Stack>

                <Stack width='15%' spacing={2}>
                    <Typography fontWeight='bold'>SĐT</Typography>
                    <TextField size="small" sx={{ width: '100%', backgroundColor: 'white' }} />
                </Stack>
                <Stack width='15%' spacing={2}>
                    <Typography fontWeight='bold'>Quyền</Typography>
                    <TextField size="small" sx={{ width: '100%', backgroundColor: 'white' }} />
                </Stack>
                <Stack width='15%' spacing={2}>
                    <Typography fontWeight='bold'>Công việc</Typography>
                    <TextField size="small" sx={{ width: '100%', backgroundColor: 'white' }} />
                </Stack>
                <Stack width='10%' spacing={2}>
                    <Typography fontWeight='bold'>Kích hoạt</Typography>
                    <TextField size="small" sx={{ width: '100%', backgroundColor: 'white' }} />
                </Stack>

            </Stack>
        </Box>
    );
}
