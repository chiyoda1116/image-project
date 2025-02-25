import React, { ChangeEvent } from "react";
import { Upload } from "lucide-react";

interface ImageUploadProps {
  imageUrl: string;
  onImageUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  filterStyle: React.CSSProperties;
}

export function ImageUpload({
  imageUrl,
  onImageUpload,
  fileInputRef,
  filterStyle,
}: ImageUploadProps) {
  return (
    <div
      className="border-2 border-dashed border-gray-300 rounded-lg min-h-[400px] flex items-center justify-center overflow-hidden transition-all duration-300 hover:border-blue-500"
      onClick={() => fileInputRef.current?.click()}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Preview"
          className="max-w-full max-h-[600px] object-contain transition-all duration-300"
          style={filterStyle}
        />
      ) : (
        <div className="text-center p-8">
          <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">
            クリックして画像をアップロードするか、ドラッグ＆ドロップしてください
          </p>
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={onImageUpload}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}
