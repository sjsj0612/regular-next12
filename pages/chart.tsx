import Image from 'next/image';
import { useState } from 'react';
 

const Chart =  () => {
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
        {/* <Image alt='please' src={imageUrl}/> */}
        </div>

    )
}

export default Chart;

function useEffect(arg0: () => void, arg1: never[]) {
    throw new Error('Function not implemented.');
}
