import React, { useRef, useState } from "react";
import domtoimage from 'dom-to-image';
import axios from 'axios';
import Bar from '../components/Bar'


const useUploadImage = (ref: any) => {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMTExNTk0IiwidXNlcklkIjoxMCwidXNlckdyb3VwIjoiQURNSU4iLCJyb2xlcyI6WyJST0xFX1VTRVIiLCJST0xFX0FETUlOIl0sImlhdCI6MTY4NDk4MDg5MiwiZXhwIjoxNjg0OTg0NDkyfQ.z2v1-50iuVgjFNS3TFpoKkLE0bH1ZoSWNTIaBYCUL-U'
    
    // const ref = useRef<HTMLDivElement>(null);

    const onSubmitImage = async (ref: any) => {
        const formData = new FormData()
        const image = await domtoimage.toBlob(ref.current);
        const myFile = new File([image], 'image.jpeg', {
            type: image.type,
        });
        formData.append("fileCategory", "INSIGHT_ATTACHED_FILE")
        formData.append("targetFile", myFile)
  
        const response = axios
            .post('https://puzzle-hub-dev.data-puzzle.com/api/puzzle-management/s3-files', formData, {
                headers: {  
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                },
            })
            .then((res) => { console.log(res) });
        
        return { response : response };
    }

    onSubmitImage(ref);
}

export default useUploadImage