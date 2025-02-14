import axios from "axios";

export const uploadToCloudinary = async (file: File):Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET || '');

    try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload/`,
            formData
        );
        if (response?.data.secure_url) {
            console.log('Uploaded image to Cloudinary', response?.data.secure_url);
            return response?.data.secure_url;
        } else {
            throw new Error("Failed to upload image to Cloudinary");
        }
    } catch (error) {
        console.log('Error uploading image to Cloudinary', error);
        return null
    }
}