import { mapTracksToChart } from '../reducers/track/track.utils';
import { defaultTracks } from '../reducers/track/track.data';

describe('unit test', () => {
  test('mapTracksToChart: map valid array', () => {
    expect(mapTracksToChart(defaultTracks))
      .toEqual([
        {
          distance: 500,
          duration: 30,
          item: '2021-06-23',
        },
        {
          distance: 300000,
          duration: 320,
          item: '2021-06-23',
        },
        {
          distance: 30000,
          duration: 120,
          item: '2021-06-23',
        },
        {
          distance: 10000,
          duration: 75,
          item: '2021-06-23',
        },
        {
          distance: 3000,
          duration: 150,
          item: '2021-06-23',
        },
      ]);
  });
  test('mapTracksToChart: map an empty array', () => {
    expect(mapTracksToChart([]))
      .toEqual([]);
  });
});
