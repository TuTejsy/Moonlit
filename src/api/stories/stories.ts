import { SERVER_URL } from '@/constants/common';
import { NetworkClient } from '@/services/networkClient/networkClient';

import { GetAudioRecordingsResponse, GetStoriesResponse } from './stories.types';

const networkClient = new NetworkClient({
  baseURL: SERVER_URL,
});

export const StoriesRepository = {
  getAudioRecordings: async (storyId: number) => {
    const response = await networkClient.instance.get<GetAudioRecordingsResponse>(
      'audio_recordings',
      {
        params: { storyId },
      },
    );

    return response.data.data;
  },

  getStories: async () => {
    const response = await networkClient.instance.get<GetStoriesResponse>('stories');

    return response.data.data;
  },

  playNotify: async (storyId: number) => {
    const response = await networkClient.instance.post('playNotify', null, {
      params: {
        storyId,
      },
    });

    return response.data;
  },
};
