import { Box, Checkbox, Divider, IconButton, Stack, Switch, Tooltip, Typography } from "@mui/material";
import { FaKey } from "react-icons/fa";
import CreateIcon from '@mui/icons-material/Create';

interface UserItemProps {
    userId: string;
    name: string;
    username: string;
    email: string;
    phone: string;
    role: string;
    jobTitle: string;
    status: '0' | '1' | '2';
    checked: boolean;
    onselect?: (id: string) => void;
    onUnselect?: (id: string) => void;
    onEdit?: () => void;
    onChangePassword?: () => void;
    onStatusChange?: (id: string, status: '0' | '1' | '2') => void;
}

export default function UserItem({ userId, name, username, email, phone, role, jobTitle, status, checked, onselect, onUnselect, onEdit, onChangePassword, onStatusChange }: UserItemProps) {
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
                    <Checkbox
                        checked={checked}
                        onChange={(event, checked) => {
                            if (checked) {
                                if (onselect) {
                                    onselect(userId);
                                }
                            } else {
                                if (onUnselect) {
                                    onUnselect(userId);
                                }
                            }
                        }}
                    />
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

                <Stack direction={'row'} width={'90%'} height={'100%'} justifyContent={'start'} alignItems={'center'}>
                    <Tooltip title={name} arrow>
                        <Typography width={'20%'} sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</Typography>
                    </Tooltip>
                    <Tooltip title={username} arrow>
                        <Typography width={'15%'} sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{username}</Typography>
                    </Tooltip>
                    <Tooltip title={email} arrow>
                        <Typography width={'18%'} sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{email}</Typography>
                    </Tooltip>
                    <Tooltip title={phone} arrow>
                        <Typography width={'15%'} sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{phone}</Typography>
                    </Tooltip>
                    <Tooltip title={role} arrow>
                        <Typography width={'15%'} sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{role}</Typography>
                    </Tooltip>
                    <Tooltip title={jobTitle} arrow>
                        <Typography width={'15%'} sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{jobTitle}</Typography>
                    </Tooltip>
                    <Box width={'10%'} display={'flex'} justifyContent={'center'} alignContent={'center'}>
                        <Switch
                            checked={status === '1'}
                            onChange={() => {
                                if (onStatusChange) onStatusChange(userId, status === '1' ? '0' : '1');
                            }}
                            color="primary"
                        />
                    </Box>
                </Stack>

            </Stack>
            <Divider />
        </Stack>

    );
}
