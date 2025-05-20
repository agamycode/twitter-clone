interface Props {
  title: string;
  description?: string;
}

export const EmptyPage = ({ title, description }: Props) => {
  return (
    <div className='md:max-w-[600px] w-full mx-auto'>
      <div className='max-w-[calc(400px)] w-full self-center my-8 mx-auto min-w-0'>
        <div className='mb-2 leading-9 break-words text-left text-[31px] font-black'>
          <span>{title}</span>
        </div>
        {description && (
          <div className='mb-7 leading-5 break-words text-left text-[15px] min-w-0 text-muted-foreground'>
            <span>{description}</span>
          </div>
        )}
      </div>
    </div>
  );
};
