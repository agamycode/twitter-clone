import { FollowingView } from '@/components/profile/following-view';

const FollowingPage = async ({ params }: { params: Promise<{ username: string }> }) => {
  const { username } = await params;
  return <FollowingView username={username} />;
};

export default FollowingPage;
