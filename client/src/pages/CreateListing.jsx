import React, { useState } from 'react';
import axios from 'axios';
import { getDownloadURL, getStorage, ref, uploadBytesResumable, } from 'firebase/storage';
import { app } from '../firebase.js';
import { useNavigate } from 'react-router-dom';
import ListingForm from '../components/ListingForm.jsx';

export default function CreateListing() {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    isbn: "",
    author: "",
    imageUrls: [],
  });

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 3) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError('Image upload failed (2 mb max per image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload 2 images per Book Listing');
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      if(formData.imageUrls.length < 1){
        return setError("At least one image need to be uploaded");
      }
      setLoading(true);
      setError(false);
      const response = await axios.post("/server/listing/create", formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setLoading(false);
      if(response.data.success === false){
        setError(response.data.message);
      } else {
        navigate(`/book-list`);
      }
    } catch(error){
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Network error. Please try again.");
      }
      setLoading(false);
    }
  };

  return (
    <main className="p-3 max-w-5xl mx-auto mt-14 text-slate-800">
      <h1 className='text-3xl font-semibold text-center mb-8 mt-6'>
        Create a Book Listing
      </h1>
      <ListingForm
        formData={formData} 
        handleChange={handleChange} 
        handleImageSubmit={handleImageSubmit} 
        handleRemoveImage={handleRemoveImage}
        handleSubmit={handleSubmit}
        uploading={uploading}
        imageUploadError={imageUploadError}
        setFiles={setFiles}
      />
      <div className='mt-10 text-center'>
        <button 
          onClick={handleSubmit}
          disabled={loading || uploading} 
          className="p-3 bg-indigo-300 text-slate-900 rounded-lg uppercase hover:bg-opacity-85 disabled:bg-opacity-40"
        >
          {loading ? "Creating..." : "Create Listing"}
        </button>
        {error && <p className='text-red-500 text-sm mt-3'>{error}</p> }
      </div>
    </main>
  )
}
