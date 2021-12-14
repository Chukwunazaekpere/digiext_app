import { useState } from "react";
import { launchImageLibrary,} from "react-native-image-picker";
import envs, { EnvInterface } from "../config/env";

const { CLOUDINARY_UPLOAD_PRESET, } = envs as EnvInterface;

const selectImageToUpload = async (): Promise<[]> => {
    const uploadData: any = [];
    // Select Image to upload
    // "includeBase64" ensures that images can be converted into forms, readable by cloudinary
    launchImageLibrary({mediaType: "photo", includeBase64: true, maxHeight: 400, maxWidth: 400}, async e => {
        // console.log("\n\t Image: ", e.assets);
        const base64Image = e.assets![0].base64;
        const base64Img = `data:image/jpg;base64,${base64Image}`;
        // ============== Set the cloudinary details for the package image =========
        const uploadedImageData = new FormData();
        uploadedImageData.append("file", base64Img);
        
        uploadedImageData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
        uploadData.append(base64Image);

        // ===================================================================================
    });
    return uploadData;
};

export default selectImageToUpload;