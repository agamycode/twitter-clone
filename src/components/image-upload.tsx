'use client';

import type React from 'react';
import Image from 'next/image';
import { Camera, X } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { useCallback, useState } from 'react';

import { Button } from '@/components/ui/button';

interface Props {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  variant?: 'avatar' | 'cover';
  className?: string;
}

export const ImageUpload = ({ value, onChange, disabled, variant = 'avatar', className }: Props) => {
  const [preview, setPreview] = useState<string>(value);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target?.result) {
          const dataUrl = event.target.result as string;
          setPreview(dataUrl);
          onChange(dataUrl);
        }
      };

      reader.readAsDataURL(file);
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/gif': []
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    maxFiles: 1,
    disabled
  });

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview('');
    onChange('');
  };

  if (variant === 'cover') {
    return (
      <div
        {...getRootProps()}
        className={`relative w-full h-48 bg-muted cursor-pointer group overflow-hidden ${className}`}>
        <input {...getInputProps()} />
        {preview ? (
          <>
            <Image
              src={preview || '/placeholder/placeholder.svg'}
              alt='Cover'
              className='w-full h-full object-cover'
              width={800}
              height={200}
            />
            <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
              <Button
                variant='secondary'
                size='icon'
                className='absolute top-2 right-2 rounded-full'
                onClick={removeImage}>
                <X className='size-4' />
              </Button>
              <div className='text-white text-center'>
                <Camera className='size-8 mx-auto mb-2' />
                <p>Change cover photo</p>
              </div>
            </div>
          </>
        ) : (
          <div className='absolute inset-0 flex items-center justify-center'>
            {isDragActive ? (
              <p className='text-muted-foreground'>Drop the image here</p>
            ) : (
              <div className='text-center'>
                <Camera className='size-8 mx-auto mb-2' />
                <p>Add cover photo</p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={`relative size-24 rounded-full bg-muted cursor-pointer group overflow-hidden ${className}`}>
      <input {...getInputProps()} />
      {preview ? (
        <>
          <Image
            src={preview || '/placeholder/placeholder.svg'}
            alt='Avatar'
            className='w-full h-full object-cover'
            width={96}
            height={96}
          />
          <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full'>
            <Button
              variant='secondary'
              size='icon'
              className='absolute top-0 right-0 rounded-full size-6'
              onClick={removeImage}>
              <X className='size-3' />
            </Button>
            <Camera className='size-6 text-white' />
          </div>
        </>
      ) : (
        <div className='absolute inset-0 flex items-center justify-center'>
          {isDragActive ? <p className='text-xs text-muted-foreground'>Drop</p> : <Camera className='size-6' />}
        </div>
      )}
    </div>
  );
};
