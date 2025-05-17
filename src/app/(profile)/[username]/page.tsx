import { ProfileTabs } from '@/components/profile/profile-tabs';
import { ProfileHeader } from '@/components/profile/profile-header';

const ProfilePage = async ({ params }: { params: Promise<{ username: string }> }) => {
  const { username } = await params;

  return (
    <>
      <ProfileHeader username={username} />
      <ProfileTabs username={username} />
    </>
  );
};

export default ProfilePage;
