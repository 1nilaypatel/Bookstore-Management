import React from 'react';

export default function ListingForm({ formData, handleChange, handleImageSubmit, handleRemoveImage, handleSubmit, uploading, imageUploadError, setFiles }) {
  return(
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
            placeholder="ISBN-10"
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
          {imageUploadError}
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
      </div>
    </form>
  )
}