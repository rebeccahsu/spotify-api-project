'use client';

import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import styles from './topTracksBar.module.scss';

export default function TopTracksBar({ topTracks}) {
  const data = {
    labels: topTracks.map(track => `${track.artists[0].name} - ${track.name}`),
    datasets: [
      {
        label: 'Popularity',
        data: topTracks.map(track => track.popularity),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const options = {
    indexAxis: 'y',
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.pageTitle}>MOST POPULAR TRACKS</h2>
      <div className={styles.barChartContainer}>
        <Bar
          data={data}
          options={options}
        />
      </div>
    </div>
  );
}