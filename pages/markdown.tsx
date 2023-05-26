import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { NextPage } from 'next'
import styled from '@emotion/styled';
import domtoimage from 'dom-to-image';
import axios from 'axios';
import { Configuration, OpenAIApi } from 'openai';
import PuzzleMarkdown from '../components/PuzzleMarkdown';
import useFetchData from '../hooks/useFetchData';
import Bar from '../components/Bar';
import useUploadImage from '../hooks/useUploadImage';

const Container = styled.div`
    display: 'flex';
`
const TextArea = styled.textarea<{height?: string}>`
    font-size: 12px;
    height: ${({height}) => height ? height : '600px'};
    width: 900px;
`;
const MdContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 900px;
    padding: 20px;
`
const ImageContainer = styled.div``;


const Page: NextPage = () => {
    const [token, setToken] = useState();
    const [imageUrl, setImageUrl] = useState('');
    const [propmt, setPrompt] = useState('');
    const [text, setText] = useState();

    const ref = useRef<HTMLDivElement>(null);
    const [contents, setContents] = useState<string>('');
    const handleTextAreaChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
        const value = event.currentTarget.value;
        setContents(value);
    };

    // (1) 데이터를 가지고 오자
    const { data : lastData } = useFetchData('example_2304');
    const { data : thisData } = useFetchData('example_2305');
    
    console.log('thisData', thisData);

    // (2) puzzle token을 받자
    const getToken = async() => {
        axios
            .post('https://puzzle-hub-dev.data-puzzle.com/api/puzzle-management/login', {
                "userName" : "1111594",
                "password" : "1234"
            })
            .then((res) => { console.log('puzzle admin token refreshed!'); setToken(res.data.token) })
    }
    useEffect(() => {
        getToken()
    }, []);


    // (3) 그림을 그려서 올리고 s3 주소를 받아야된다
    const onSubmitImage = async (ref:any) => {
        const formData = new FormData()
        const image = await domtoimage.toBlob(ref.current);
        const myFile = new File([image], 'image.jpeg', {
            type: image.type,
        });
        formData.append("fileCategory", "INSIGHT_ATTACHED_FILE")
        formData.append("targetFile", myFile)
  
        axios
            .post('https://puzzle-hub-dev.data-puzzle.com/api/puzzle-management/s3-files', formData, {
                headers: {  
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                },
            })
            .then((res) => { 
                console.log('이미지가 업로드된 주소는 ', res.data.s3Location, '입니다!'); 
                setImageUrl(res.data.s3Location) 
            });
    }

    // (4) 데이터로 chatGPT에 요청할 prompt를 만든다
    useEffect(() => {
        setPrompt(
            `
                이번주 ${thisData[0]?.districtName}에서 발생한 업종별 통화 비율을 저번주 ${thisData[0]?.districtName}에서 발생한 업종별 통화 비율과 대비하여 설명해줘.
                \n\n
                이번주 업종별 통화 비율 및 순위 : ${JSON.stringify(thisData)} \n
                저번주 업종별 통화 비율 및 순위 : ${JSON.stringify(lastData)} \n
            `
        )
    }, [lastData, thisData]);

    // (5) prompt를 chatGPT에 요청한다
    const onCallChatGPT = async () => {
        axios
            .post('/api/gpt', {
                "question" : prompt,
            })
            .then((res) => { console.log(res)})

    }  


    return (
      <Container>
            <div>
                <button onClick={() => onSubmitImage(ref)}>이미지 업로드</button>
                <button onClick={() => onCallChatGPT()}>chatGPT야 나대신 글을 써줘</button>
            </div>
            <h2>이미지야</h2>
            <ImageContainer ref={ref}>
                {thisData && <Bar data={thisData}/>}
            </ImageContainer>
            <h2>마크다운이야~~</h2>
            <TextArea
                    height={'300px'}
                    value={contents}
                    maxLength={7000}
                    onChange={(e) => handleTextAreaChange(e)}
                />
            <MdContainer>
                <PuzzleMarkdown text={contents}/>
                {/* <PuzzleMarkdown text={contents}/> */}
            </MdContainer>
      </Container>
    );
}

export default Page;