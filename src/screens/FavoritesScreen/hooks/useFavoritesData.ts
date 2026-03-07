import { useStories } from '@/hooks/database/useStories';

export const useFavoritesData = () => {
  const [savedStories, savedStoriesVersion] = useStories('is_favorite = true', [
    {
      reverse: true,
      sortDescriptor: 'saved_at_timestamp',
    },
  ]);
  const [recentlyPlayedStories, recentlyPlayedStoriesVersion] = useStories(
    'played_at_timestamp != nil',
    [
      {
        reverse: true,
        sortDescriptor: 'played_at_timestamp',
      },
    ],
  );

  return {
    recentlyPlayedStories,
    recentlyPlayedStoriesVersion,
    savedStories,
    savedStoriesVersion,
  };
};
