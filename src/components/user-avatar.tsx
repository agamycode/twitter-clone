import Link from 'next/link';
import Image from 'next/image';

interface Props {
  name: string;
  username: string;
  avatar: string;
}

export const UserAvatar = ({ name, username, avatar }: Props) => {
  return (
    <div className='flex items-center space-x-3'>
      <Link href={`/${username}`} className='w-full cursor-pointer'>
        <div className='size-10 rounded-full bg-muted overflow-hidden relative'>
          <Image
            fill
            style={{ objectFit: 'cover' }}
            src={avatar || '/placeholder/placeholder.svg'}
            alt={name || 'User Avatar'}
          />
        </div>
      </Link>
      <div>
        <p className='font-semibold'>{name}</p>
        <p className='text-sm text-muted-foreground'>{username}</p>
      </div>
    </div>
  );
};
