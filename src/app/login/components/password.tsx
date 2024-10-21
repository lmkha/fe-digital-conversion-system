import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface PasswordProps {
    showPassword: boolean;
    isError?: boolean;
    helperText?: string;
    onChange: (value: string) => void;
    validatePassword: (password: string) => void;
    onChangeShowPassword: () => void;
}

export default function Password(
    { showPassword, isError = false, helperText = '', onChange, validatePassword, onChangeShowPassword }: PasswordProps
) {
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <FormControl sx={{ width: '100%' }} variant="outlined" error={isError}>
                <InputLabel htmlFor="outlined-adornment-password">Mật khẩu *</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    fullWidth // This ensures the input takes the full width
                    type={showPassword ? 'text' : 'password'}
                    onChange={(e) => {
                        validatePassword(e.target.value);
                        onChange(e.target.value);
                    }}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={onChangeShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                onMouseUp={handleMouseUpPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Mật khẩu ||"
                />
                {isError && <FormHelperText error>{helperText}</FormHelperText>}
            </FormControl>
        </Box>
    );
}
