import { db } from '@/lib/db';
import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
  width: 1200,
  height: 630
};

export const contentType = 'image/png';

export default async function Image({ params }: { params: { id: number } }) {
  const post = await db.tweet.findUnique({ where: { id: params.id } });

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        {post?.content}
      </div>
    )
  );
}
