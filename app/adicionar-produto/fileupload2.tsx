import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import crypto from 'crypto'
import { postVideo } from '../components/requests/requests';
import { getAuthCookie } from '../components/requests/cookies';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dtnz0wppk/upload';
const CLOUDINARY_UPLOAD_PRESET = 'hbuser';
const CLOUD_NAME = 'dtnz0wppk'
const CLOUDINARY_KEY = '897171118648211'
const CLOUDINARY_SECRET = 'YUZYkoMGuWs90S4U1bSn5L8mRKk'

interface uploadProps{
  setProductVideo: (url:string)=>{}
}

interface videoprops {
  url: string,
  id: number
}

const UploadToCloudinary:React.FC<uploadProps> = ({setProductVideo}) => {
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadedUrl, setUploadedUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [video, setVideo] = useState<videoprops>({url:'', id:0})


  function publishVideo(){
    const cookie = getAuthCookie()
    if (cookie.account){
      const res = postVideo({url:uploadedUrl, account:cookie.account})
    }
    
  }


/////////////////////////////////////////////////////////////////////////////










  const generateSHA1 =(data: any) => {
    const hash = crypto.createHash("sha1");
    hash.update(data);
    return hash.digest("hex");
}

const generateSignature = (publicId: string, apiSecret: string) => {
	const timestamp = new Date().getTime();
	return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};

  const regex = /\/v\d+\/([^/]+)\.\w{3,4}$/;

  const getPublicIdFromUrl = (url) => {

    const match = url.match(regex);
    return match ? match[1] : null;
  };




const handleDeleteImage = async () => {

  const publicId = getPublicIdFromUrl(uploadedUrl)
  
  const timestamp = new Date().getTime();
  const signature = generateSHA1(generateSignature(publicId, CLOUDINARY_SECRET));
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/destroy`;

  try {
    const response = await axios.post(url, {
      public_id: publicId,
      signature: signature,
      api_key: CLOUDINARY_KEY,
      timestamp: timestamp,
    });

    setUploadedUrl('')
    setProductVideo('')
    

  } catch (error) {
    console.error(error);
  }
};








////////////////////////////////////////////////////////
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

  const deleteVideo = ()=>{
    const response = axios.delete(uploadedUrl)
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="file-upload">
      {!uploadedUrl
        ?
      <div {...getRootProps({ className: 'dropzone' })} style={{ border: '2px dashed #0087F7', padding: '20px', textAlign: 'center' }}>
          <input {...getInputProps()} />
          <p>Arraste um vídeo pra cá ou clique pra selecionar um</p>        
      </div>
      :<></>
      }
      {uploading && (
        <div className="progress">
          <progress value={uploadProgress} max="100" />
          <span>{uploadProgress}%</span>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {uploadedUrl && (
        <div className="uploaded-file">
          <p>Upload successful!</p>
          <video className='uploaded-video' controls src={uploadedUrl} alt="Uploaded file"  />
          <button onClick={handleDeleteImage} className='delete-button mt-4'>Excluir</button>
        </div>
      )}
    </div>
  );
};

export default UploadToCloudinary;