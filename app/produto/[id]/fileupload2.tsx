import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dtnz0wppk/upload';
const CLOUDINARY_UPLOAD_PRESET = 'hbuser';

interface uploadProps {
  setProductVideo: (url:string)=>void,
  currentVideo: string
}

const UploadToCloudinary:React.FC<uploadProps> = ({setProductVideo, currentVideo}) => {
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadedUrl, setUploadedUrl] = useState<string>(currentVideo);
  const [error, setError] = useState<string>('');
  useEffect(()=>{
    setUploadedUrl(currentVideo)
  },[currentVideo])
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    uploadFile(file);
  }, []);

  const uploadFile = (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    setUploading(true);
    setError('');

    axios.post(CLOUDINARY_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent: ProgressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setUploadProgress(percentCompleted);
      },
    })
    .then(response => {
      setUploadedUrl(response.data.secure_url);
      setProductVideo(response.data.secure_url)
      setUploading(false);
      setUploadProgress(0);
    })
    .catch(error => {
      console.error('Error uploading file:', error);
      setError('Failed to upload file. Please try again.');
      setUploading(false);
      setUploadProgress(0);
    });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="file-upload">
      <div {...getRootProps({ className: 'dropzone' })} style={{ border: '2px dashed #0087F7', padding: '20px', textAlign: 'center' }}>
        <input {...getInputProps()} />
        <p>Arraste um vídeo pra cá ou clique pra selecionar um</p>
      </div>
      {uploading && (
        <div className="progress">
          <progress value={uploadProgress} max="100" />
          <span>{uploadProgress}%</span>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {uploadedUrl && (
        <div className="uploaded-file">
          <video className='uploaded-video' controls src={uploadedUrl}  style={{ maxWidth: '55%' }} />
          <button className='delete-button mt-4'>Excluir</button>
        </div>
      )}
    </div>
  );
};

export default UploadToCloudinary;