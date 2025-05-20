import { EmptyPage } from '@/components/layouts/empty-page';

export const MediaTab = () => {
  return (
    <EmptyPage
      title='Lights, camera … attachments!'
      description='When you post photos or videos, they will show up here.'
    />
    // <EmptyPage
    //   title={`@${username} hasn’t posted media`}
    //   description='Once they do, those posts will show up here.'
    // />
  );
};
