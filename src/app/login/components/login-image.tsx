import Image from 'next/image';

export default function LoginImage() {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <Image
                src="/img/login_image.png"
                priority={true}
                width={1096}
                height={900}
                alt="Login Image"
                className="object-contain max-w-full max-h-full"
            />
        </div>
    );
}