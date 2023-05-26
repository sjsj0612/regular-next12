import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import domtoimage from 'dom-to-image';
import axios from 'axios';
import Bar from '../components/Bar'

const Container = styled.div`
  display: 'flex';
`
const ImageContainer = styled.div`
  width: max-content;
  inline-size: max-content;
  height: max-content;
`

const insightData = {
  "basicDisplayName": "입력테스트인사이트세진2",
  "insightUnitType": "BASIC",
  "insightName": "sample22",
  "cardImageSource": "s3://",
  "detailCardTopImageSource": "s3://",
  "insightType": "INTERACTIVE",
  "contents": "CONTENTS LENGTH",
  "hashTags": "주거생활,테스트",
  "userId": 1111594,
  "enabled": true,
  "creationDateTime": "2023-05-04T02:50:05.342",
  "modificationDateTime": "2023-05-09T02:50:05.342"
}
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMTExNTk0IiwidXNlcklkIjoxMCwidXNlckdyb3VwIjoiQURNSU4iLCJyb2xlcyI6WyJST0xFX1VTRVIiLCJST0xFX0FETUlOIl0sImlhdCI6MTY4NDk4MDg5MiwiZXhwIjoxNjg0OTg0NDkyfQ.z2v1-50iuVgjFNS3TFpoKkLE0bH1ZoSWNTIaBYCUL-U'
    
const Page = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [file, setFile] = useState<any>();
    const [formData, setFormData] = useState<any>();


    useEffect(() => {
      console.log('file', file)

      const formData = new FormData()
      formData.append("targetFile", file)
      formData.append("fileCategory", "INSIGHT_REPORT")
      setFormData(formData);
    }, [file])
  

    const handleClick = useCallback(async () => {
      if (ref.current) {
        // downloadjs(await toJpeg(ref.current), "test1.jpg");
        // downloadjs(await toSvg(ref.current), "test.svg");
        // downloadjs(await domtoimage.toBlob(ref.current), "test.png");
        const image = await domtoimage.toBlob(ref.current)
        const myFile = new File([image], 'image.jpeg', {
          type: image.type,
      });
        setFile(myFile)
        // console.log('image', image);
        return myFile
      }
    }, []);


    const onSubmitImage = async (ref: any) => {
      const formData2 = new FormData()
      const image = await domtoimage.toBlob(ref.current);
      const myFile = new File([image], 'image.jpeg', {
          type: image.type,
      });
      formData2.append("fileCategory", "INSIGHT_ATTACHED_FILE")
      formData2.append("targetFile", myFile)

      return axios
        .post('https://puzzle-hub-dev.data-puzzle.com/api/puzzle-management/s3-files', formData2, {
            headers: {  
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            },
        })
        .then((res) => { console.log(res) });
    }

    const onSubmitFile = async () => {
        // FormData의 value 확인
        for (let value of formData.values()) {
            console.log('formData value', value);
        }

        return axios
          .post('https://puzzle-hub-dev.data-puzzle.com/api/puzzle-management/s3-files', formData, {
            headers: {  
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            },
          })
          .then((res) => { console.log(res); setFile(null) });

        // return await axios({
        //     method: "POST",
        //     url: `https://puzzle-hub-dev.data-puzzle.com/api/puzzle-management/s3-files`,
        //     headers: {
        //     "Content-Type": "application/json", // Content-Type을 반드시 multipart/form-data 이렇게 하여야 한다.
        //     "Authorization": `Bearer ${token}`,        
        //     },
        //     data: formData, // data 전송시에 반드시 생성되어 있는 formData 객체만 전송 하여야 한다.
        // }).then((res) => {console.log(res)})
    }


    const onSubmitInsight = async (data:any) => {
      await axios({
        method: "POST",
        url: "https://puzzle-hub-dev.data-puzzle.com/api/puzzle-management/insights",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: data
      }).then((res) => console.log('res', res))
      .catch((err) => console.log('err', err))
    }

    const onSubmitAPI = async () => {
      console.log('submit API')
      return await axios({
        method: "GET",
        url: "http://localhost:3000/api/hello",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => console.log('res', res))
      .catch((err) => console.log('err', err))
    }

    const handleFileInput = (e: React.FormEvent<HTMLInputElement>) => {
      console.log('e', e)
      if (
        null !== e.currentTarget &&
        null !== e.currentTarget.files &&
        null !== e.currentTarget.files.length > 0
      ) {
        const file = e.currentTarget.files[0]
        setFile(file);
      }
    };
  
    return (
      <Container>
          <ImageContainer ref={ref}>
              {/* <Bar/> */}
          </ImageContainer>
          <button onClick={() => handleClick()}>Click</button>
          <button onClick={() => onSubmitImage(ref)}>Image Submit</button>
          <button onClick={() => onSubmitFile()}>File Submit</button>
          <button onClick={() => onSubmitInsight(insightData)}>Insight Submit</button>
          <button onClick={() => onSubmitAPI()}>Test</button>
          <input type="file" width={100} height={20} onChange={(e) => handleFileInput(e)} />
      </Container>
    );
}

export default Page;