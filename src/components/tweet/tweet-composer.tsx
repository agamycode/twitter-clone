'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ImageIcon, MapPin, Calendar, Smile, X, Loader2 } from 'lucide-react';

import { useCreateTweet } from '@/features/tweet/queries';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export const TweetComposer = () => {
  const { mutate: createTweet, isPending } = useCreateTweet();

  const [tweetText, setTweetText] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const handleTweet = () => {
    createTweet({
      content: tweetText,
      images: uploadedImages
    });

    setTweetText('');
    setUploadedImages([]);
  };

  const handleImageUpload = () => {
    // Simulate image upload
    setIsUploading(true);
    setTimeout(() => {
      setUploadedImages([
        ...uploadedImages,
        `/placeholder/placeholder.svg?height=200&width=300&text=Image${uploadedImages.length + 1}`
      ]);
      setIsUploading(false);
    }, 1000);
  };

  const removeImage = (index: number) => {
    const newImages = [...uploadedImages];
    newImages.splice(index, 1);
    setUploadedImages(newImages);
  };

  return (
    <div className='pt-1 border-b'>
      <div className='flex space-x-4 px-4'>
        <div className='pt-3 basis-10 grow-0 mr-2'>
          <div className='size-12 rounded-full bg-muted shrink-0' />
        </div>
        <div className='static basis-0 pt-1 justify-center grow'>
          <Textarea
            placeholder="What's happening?"
            className='w-full border-none resize-none text-xl focus-visible:ring-0 p-0 min-h-14'
            value={tweetText}
            onChange={(e) => setTweetText(e.target.value)}
            disabled={isPending}
          />

          {uploadedImages.length > 0 && (
            <div className={`grid gap-2 my-2 ${uploadedImages.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
              {uploadedImages.map((img, index) => (
                <div key={index} className='relative rounded-xl overflow-hidden'>
                  {/* TODO: fix */}
                  <Image
                    src={img || '/placeholder/placeholder.svg'}
                    alt='Uploaded content'
                    width={300}
                    height={200}
                    className='w-full h-auto'
                  />
                  <Button
                    size='icon'
                    variant='secondary'
                    className='absolute top-2 right-2 size-8 bg-black/50 hover:bg-black/70'
                    onClick={() => removeImage(index)}>
                    <X className='size-4 text-white' />
                  </Button>
                </div>
              ))}
            </div>
          )}

          <div className='flex items-center justify-between py-2 '>
            <div className='flex space-x-1'>
              <Button
                variant='ghost'
                size='icon'
                className='text-primary size-9'
                onClick={handleImageUpload}
                disabled={isUploading || uploadedImages.length >= 4 || isPending}>
                <ImageIcon className='size-5' />
              </Button>
              <Button variant='ghost' size='icon' className='text-primary size-9' disabled={isPending}>
                <MapPin className='size-5' />
              </Button>
              <Button variant='ghost' size='icon' className='text-primary size-9' disabled={isPending}>
                <Smile className='size-5' />
              </Button>
              <Button variant='ghost' size='icon' className='text-primary size-9' disabled={isPending}>
                <Calendar className='size-5' />
              </Button>
            </div>

            <Button
              className='px-4'
              disabled={(!tweetText.trim() && uploadedImages.length === 0) || isPending}
              onClick={handleTweet}>
              {isPending ? <Loader2 className='size-4 mr-2 animate-spin' /> : null} Tweet
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
