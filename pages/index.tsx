// import { createCanvas } from 'canvas'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { VictoryBar } from 'victory'
import { VictoryChart } from 'victory-chart'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  // const canvas = createCanvas(800, 600);
  // const ctx = canvas.getContext('2d');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
      console.log('useEffect')
      const fetchChartImage = async () => {
        try {
          const response = await fetch('/api/chart', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                data: [12, 19, 3, 5, 2, 3]
              })
          });
          console.log('res', response)
          // return response
          const imageBlob = await response.blob();
          const url = URL.createObjectURL(imageBlob);
          setImageUrl(url);

        } catch (error) {
          console.error('Error fetching chart image:', error);
        }
      };
  
      fetchChartImage();
    }, []);



  return (
    <div>
    <h3>제발</h3>
<Image width={'800px'} height={'600px'} alt='please' src={imageUrl}/>
</div>
  )
}

export default Home
