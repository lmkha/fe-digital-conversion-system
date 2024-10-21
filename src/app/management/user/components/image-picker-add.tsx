'use client';

import React, { useRef, useState } from 'react';
import { Box, IconButton, Stack, Typography, Avatar, Tooltip } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

interface ImagePickerForAddModalProps {
    onSelectedImage: (file: File | null, imageUrl: string, success: boolean, errorMessage: string) => void;
}

export default function ImagePickerForAddModal({ onSelectedImage }: ImagePickerForAddModalProps) {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);  // State for selected image URL
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();  // Trigger the file input click
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];  // Ensure a file is selected

        // Validate file type and size
        if (file) {
            const validFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
            const maxFileSize = 100 * 1024;  // 100KB in bytes

            if (!validFileTypes.includes(file.type)) {
                onSelectedImage(null, '', false, 'File phải có định dạng .jpeg, .jpg, hoặc .png');
                setIsSuccess(false);
                setSelectedImage(null);  // Clear any previously selected image
                return;
            }

            if (file.size > maxFileSize) {
                onSelectedImage(null, '', false, 'Kích thước tệp phải nhỏ hơn hoặc bằng 100KB');
                setIsSuccess(false);
                setSelectedImage(null);  // Clear any previously selected image
                return;
            }

            // If file is valid, reset error message and set selected image
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            setIsSuccess(true);
            onSelectedImage(file, imageUrl, true, '');
        }
    };

    return (
        <>
            <Box
                width={'80%'}
                sx={{
                    border: `2px dashed ${isSuccess || isHovered ? '#007BFF' : '#ccc'}`, // Change border color based on isSuccess or isHovered
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    padding: '10px',
                    backgroundColor: 'white',
                    transition: 'border-color 0.3s ease',
                    aspectRatio: '1/1'  // Set height based on width
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                        backgroundColor: 'grey.200',
                        overflow: 'hidden'  // Ensure image fits inside the circle
                    }}
                >
                    <IconButton
                        sx={{ width: '100%', height: '100%', position: 'relative' }}
                        onClick={handleButtonClick}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {selectedImage ? (
                            <>
                                <Avatar
                                    src={selectedImage}
                                    alt="Selected Image"
                                    sx={{ width: '100%', height: '100%' }}  // Ensure the image fits
                                />

                                {isHovered && (
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            color: 'white',
                                            fontSize: '14px',
                                            borderRadius: '50%',
                                        }}
                                    >
                                        Thay đổi ảnh
                                    </Box>
                                )}
                            </>
                        ) : (
                            <Stack justifyContent={'center'} alignItems={'center'}>
                                <AddAPhotoIcon fontSize={'large'} />
                                <Typography>Chọn ảnh đại diện</Typography>
                            </Stack>
                        )}

                    </IconButton>

                    {/* Hidden file input */}
                    <input
                        hidden
                        title='Chọn ảnh đại diện'
                        type="file"
                        ref={fileInputRef}
                        accept=".jpeg, .jpg, .png"  // Only allow specific image types
                        onChange={handleFileChange}
                    />
                </Box>
            </Box>
        </>
    );
}
