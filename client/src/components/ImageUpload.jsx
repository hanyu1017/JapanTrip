import React, { useState } from 'react';
import { Upload, Camera, Loader } from 'lucide-react';

/**
 * 圖片上傳組件
 * 支援點擊上傳和拖放上傳，將圖片轉換為 base64
 */
export const ImageUpload = ({ currentImage, onImageChange }) => {
  const [preview, setPreview] = useState(currentImage || '');
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleImageChange = (file) => {
    if (file && file.type.startsWith('image/')) {
      setUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onImageChange(reader.result);
        setUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) handleImageChange(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleImageChange(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  return (
    <div className="space-y-3">
      <div
        className={`relative h-48 rounded-xl overflow-hidden border-2 border-dashed transition-all ${
          dragOver
            ? 'border-[#c44569] bg-[#c44569]/10'
            : 'border-[#c9a884] bg-gradient-to-br from-[#faf8f3] to-[#f5f1e8]'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {preview ? (
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-[#8d6e63]">
            <div className="text-center">
              <Camera size={48} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm font-medium">画像をドラッグまたはクリック</p>
            </div>
          </div>
        )}

        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <Loader className="animate-spin text-white" size={32} />
          </div>
        )}

        <label className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="text-center text-white">
            <Upload size={32} className="mx-auto mb-2" />
            <span className="text-sm font-bold">画像をアップロード</span>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />
        </label>
      </div>

      <label className="inline-flex items-center gap-2 px-4 py-2 bg-[#8b6f47] text-white rounded-lg hover:bg-[#6d5436] transition-colors cursor-pointer text-sm font-bold w-full justify-center">
        <Camera size={16} />
        画像を選択
        <input
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default ImageUpload;
