import React, { useState, useRef } from 'react';
import axios from 'axios';

const BulkUploadModal = ({ isOpen, onClose, onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (
        selectedFile.type === 'text/csv' ||
        selectedFile.type === 'application/vnd.ms-excel' ||
        selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        selectedFile.type === 'application/zip' ||
        selectedFile.type === 'application/x-zip-compressed'
      ) {
        setFile(selectedFile);
        setError(null);
      } else {
        setError('Please select a valid CSV, Excel, or ZIP file.');
        setFile(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const API_URL = import.meta.env.VITE_API_URL || '/api/v1';
      const { data } = await axios.post(`${API_URL}/admin/products/bulk-upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      setSuccess(data.message);
      setFile(null);
      if (onUploadSuccess) onUploadSuccess();
      setTimeout(() => {
        onClose();
        setSuccess(null);
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload products');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-surface w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center">
          <h3 className="text-xl font-bold text-on-surface">Bulk Upload Products</h3>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <div className="p-8">
          <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
            Upload a CSV, Excel, or <strong>ZIP</strong> file containing your product data. 
            If using ZIP, include your CSV and an <strong>images</strong> folder with files named matching your CSV entries.
          </p>

          <div className="flex items-center gap-6 mb-8">
            <a 
              href="/templates/product_template.csv" 
              download 
              className="inline-flex items-center gap-2 text-primary text-sm font-semibold hover:underline"
            >
              <span className="material-symbols-outlined text-lg">download</span>
              CSV Template
            </a>
            <span className="w-1 h-1 rounded-full bg-outline-variant/30" />
            <div className="text-xs text-on-surface-variant font-medium">
              Supports URLs & Local Files (ZIP)
            </div>
          </div>

          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`
              border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all
              ${file ? 'border-primary bg-primary/5' : 'border-outline-variant hover:border-primary/50 hover:bg-surface-container-low'}
            `}
          >
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".csv, .xls, .xlsx, .zip"
            />
            
            <span className={`material-symbols-outlined text-4xl mb-3 ${file ? 'text-primary' : 'text-outline-variant'}`}>
              {file ? 'description' : 'upload_zip'}
            </span>
            
            <span className="text-sm font-medium text-on-surface">
              {file ? file.name : 'Select or drag file'}
            </span>
            <span className="text-xs text-on-surface-variant mt-1">
              CSV, XLSX, or ZIP (incl. images)
            </span>
          </div>

          {error && (
            <div className="mt-6 p-4 bg-error-container text-error rounded-xl text-xs font-medium flex items-center gap-2">
              <span className="material-symbols-outlined text-base">error</span>
              {error}
            </div>
          )}

          {success && (
            <div className="mt-6 p-4 bg-success-container text-success rounded-xl text-xs font-medium flex items-center gap-2">
              <span className="material-symbols-outlined text-base">check_circle</span>
              {success}
            </div>
          )}

          <div className="mt-8 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 text-sm font-bold text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              disabled={!file || uploading}
              onClick={handleUpload}
              className="flex-1 px-6 py-3 text-sm font-bold text-on-primary bg-primary hover:bg-primary-container disabled:opacity-50 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
            >
              {uploading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              {uploading ? 'Uploading...' : 'Upload Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkUploadModal;
