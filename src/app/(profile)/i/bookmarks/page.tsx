import { auth } from '@/auth';

import { BookmarksView } from '@/components/bookmarks';

const BookmarksPage = async () => {
  const session = await auth();

  if (!session?.user) return null;

  return <BookmarksView />;
};

export default BookmarksPage;
