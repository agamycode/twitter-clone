import { TweetDetail } from '@/components/tweet/tweet-detail';

const TweetPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return <TweetDetail id={id} />;
};

export default TweetPage;
