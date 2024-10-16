import { Box, Checkbox, Divider, IconButton, Stack, Switch, Typography } from "@mui/material";
import { FaKey } from "react-icons/fa";
import CreateIcon from '@mui/icons-material/Create';


export default function UserItem() {
    return (
        <Stack>
            <Stack
                direction={'row'} width={'100%'} height={'50px'} justifyContent={'center'} alignItems={'center'}
                sx={{ backgroundColor: 'white' }}
            >
                <Stack direction={'row'} width={'10%'} height={'100%'} justifyContent={'space-between'}
                    alignItems={'center'}
                    paddingRight={1}
                >
                    <Checkbox />
                    <Stack direction={'row'}>
                        <IconButton>
                            <CreateIcon sx={{ ":hover": { color: 'black' } }} />
                        </IconButton>
                        <IconButton sx={{ '&:hover': { color: 'black' } }}>
                            <FaKey />
                        </IconButton>
                    </Stack>
                </Stack>

                <Stack direction={'row'} width={'90%'} height={'100%'} spacing={2} justifyContent={'center'} alignItems={'center'}>
                    <Typography width={'20%'}>Lê Minh Kha</Typography>
                    <Typography width={'15%'}>lmkha</Typography>
                    <Typography width={'20%'}>lmkha0201@gmail.com</Typography>
                    <Typography width={'15%'}>0372963425</Typography>
                    <Typography width={'15%'}>Chuyên viên</Typography>
                    <Typography width={'15%'}>Chuyên viên</Typography>
                    <Box width={'10%'} display={'flex'} justifyContent={'center'} alignContent={'center'}>
                        <Switch defaultChecked={true} />
                    </Box>
                </Stack>

            </Stack>
            <Divider />
        </Stack>

    );
}
