import { Box, Checkbox, Divider, IconButton, Stack, Switch, Typography } from "@mui/material";
import { FaKey } from "react-icons/fa";
import CreateIcon from '@mui/icons-material/Create';

interface UserItemProps {
    name: string;
    username: string;
    email: string;
    phone: string;
    role: string;
    jobTitle: string;
    onselect?: () => void;
    onEdit?: () => void;
    onChangePassword?: () => void;
}

export default function UserItem({ name, username, email, phone, role, jobTitle, onselect, onEdit, onChangePassword }: UserItemProps) {
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
                        <IconButton onClick={() => {
                            // Edit
                            if (onEdit) {
                                onEdit();
                            }
                        }}>
                            <CreateIcon sx={{ ":hover": { color: 'black' } }} />
                        </IconButton>
                        <IconButton sx={{ '&:hover': { color: 'black' } }} onClick={() => {
                            // Change password
                            if (onChangePassword) {
                                onChangePassword();
                            }
                        }}>
                            <FaKey />
                        </IconButton>
                    </Stack>
                </Stack>

                <Stack direction={'row'} width={'90%'} height={'100%'} spacing={2} justifyContent={'center'} alignItems={'center'}>
                    <Typography width={'20%'}>{name}</Typography>
                    <Typography width={'15%'}>{username}</Typography>
                    <Typography width={'20%'}>{email}</Typography>
                    <Typography width={'15%'}>{phone}</Typography>
                    <Typography width={'15%'}>{role}</Typography>
                    <Typography width={'15%'}>{jobTitle}</Typography>
                    <Box width={'10%'} display={'flex'} justifyContent={'center'} alignContent={'center'}>
                        <Switch defaultChecked={true} />
                    </Box>
                </Stack>

            </Stack>
            <Divider />
        </Stack>

    );
}
