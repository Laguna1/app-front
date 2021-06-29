export const mapTracksToChart = (tracks) => tracks.map(
  (track) => {
    const { attributes: { distance, duration, activ: { item } } } = track;

    return {
      item,
      distance,
      duration,
    };
  },
);

export const myTraining = () => 'myTraining';
