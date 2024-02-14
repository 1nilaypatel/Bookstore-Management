import React, { useState } from 'react';
import axios from 'axios';
import { getDownloadURL, getStorage, ref, uploadBytesResumable, } from 'firebase/storage';
import { app } from '../firebase.js';
import { useNavigate } from 'react-router-dom';

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
      <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-7 mt-16'>
        <div className='flex flex-col flex-1 gap-5'>
          <input
            type="text"
            placeholder="Title"
            className="border rounded-lg p-3 focus:outline-indigo-400"
            id="title"
            required
            onChange={handleChange}
            value={formData.title}
          />
          <textarea
            type="text"
            placeholder="Book Overview"
            className="border rounded-lg p-3 focus:outline-indigo-400"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />
          <div className='flex flex-row gap-5'>
            <input
              type="number"
              placeholder="Price in Rs"
              className="border rounded-lg p-3 focus:outline-indigo-400"
              id="price"
              required
              onChange={handleChange}
              value={formData.price}
            />
            <input
              type="text"
              placeholder="ISBN"
              className="border rounded-lg p-3 focus:outline-indigo-400"
              id="isbn"
              required
              onChange={handleChange}
              value={formData.isbn}
            />
            <input
              type="text"
              placeholder="Author"
              className="border rounded-lg p-3 focus:outline-indigo-400"
              id="author"
              required
              onChange={handleChange}
              value={formData.author}
            />
          </div>
        </div>

        <div className='flex flex-col gap-5'>
          <div className="flex flex-col gap-2">
            <p className='font-semibold'>
              Images:
              <span className="font-normal ml-2">
                Upload images for Book Display (max 2)
              </span>
            </p>
            <div className="flex gap-2 bg-slate-50 rounded-lg mt-3">
              <input
                onChange={(e) => setFiles(e.target.files)}
                type="file" 
                id="images"
                accept="image/*"
                className="p-2 rounded-lg w-full"
                multiple
              />
              <button
                onClick={handleImageSubmit}
                type='button'
                className="p-2 text-indigo-400 border border-indigo-400 rounded-lg uppercase hover:shadow-lg disabled:bg-opacity-40"
              >
                {uploading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
          </div>
          <p className='text-red-500 text-sm'>
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
            <div
              key={url}
              className='flex justify-between p-2 border border-indigo-400 items-center '
            >
              <img
                src={url}
                alt='listing image'
                className='w-20 h-20 object-contain rounded-lg'
              />
              <button
                type='button'
                onClick={() => handleRemoveImage(index)}
                className='p-3 text-red-500 rounded-lg uppercase hover:opacity-75'
              >
                Delete
              </button>
            </div>
          ))}
          <button disabled={loading || uploading} className="p-3 bg-indigo-300 text-slate-900 rounded-lg uppercase hover:bg-opacity-85 disabled:bg-opacity-40">
            {loading ? "Creating..." : "Create Listing"}
          </button>
          {error && <p className='text-red-500 text-sm'>{error}</p> }
        </div>
      </form>
    </main>
  )
}
