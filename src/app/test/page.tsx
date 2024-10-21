'use client';
import { CldImage } from 'next-cloudinary';

export default function Page() {
    return (
        <CldImage
            width="100"
            height="100"
            sizes="100vw"
            src="https://res.cloudinary.com/dfx1kzavc/image/upload/v1729395910/avatars/ycqxvpsjchiifpzy15h0.jpg"
            alt="Description of my image"
            style={{
                borderRadius: '50%',
                objectFit: 'cover',
                height: 'auto',
                border: '1px solid black',
            }}
        />
    );
}