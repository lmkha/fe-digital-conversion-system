import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface PasswordProps {
    isError?: boolean;
    helperText?: string;
    defaultValue?: string;
    onChange: (value: string) => void;
    validatePassword: (password: string) => void;
}

export default function Password(
    { isError = false, helperText = '', defaultValue, onChange, validatePassword }: PasswordProps
) {
    const [showPassword, setShowPassword] = React.useState(true);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <FormControl sx={{ m: 1, width: '45%' }} variant="outlined" error={isError} size='small'>
            <InputLabel htmlFor="outlined-adornment-password">Mật khẩu *</InputLabel>
            <OutlinedInput
                defaultValue={defaultValue}
                id="outlined-adornment-password"
                fullWidth
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => {
                    validatePassword(e.target.value);
                    onChange(e.target.value);
                }}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                label="Mật khẩu * "
            />
            {isError && <FormHelperText error>{helperText}</FormHelperText>}
        </FormControl>
    );
}
