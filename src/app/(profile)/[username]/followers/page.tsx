import { FollowersView } from '@/components/profile/followers-view';

const FollowersPage = async ({ params }: { params: Promise<{ username: string }> }) => {
  const { username } = await params;
  return <FollowersView username={username} />;
};

export default FollowersPage;
