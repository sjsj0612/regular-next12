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
    const [imageUrl, setImageUrl] = useState('https://s3.ap-northeast-2.amazonaws.com/diaas-puzzle-hub-backend-imagefile-upload-dev/INSIGHT_ATTACHED_FILE/INSIGHT_ATTACHED_FILE-20230530052738-image.jpeg');
    const [prompt, setPrompt] = useState('');
    const [text, setText] = useState<string>('이번주 에 대해 비교해 보면, 부동산의 통화 비율은 저번주보다 3.8% 상승하여 4위로 위치하고 있고, 음식점의 통화 비율은 저번주보다 2.5% 하락하여 1위로 유지하고 있습니다. 학원의 통화 비율은 저번주보다 5.7% 하락하여 2위로 위치하고 있고, 의원의 통화 비율은 저번주보다 6.3% 하락하여 5위로 위치하고 있습니다. 미용실의 통화 비율은 저번주보다 1.6% 하락하여 6위로 위치하고 있고, 카페의 통화 비율은 저번주보다 6.8% 상승하여 3위로 위치하고 있습니다.');

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
        thisData && setPrompt(
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
        console.log('onCallChatGPT', prompt)
        return axios
            .post('/api/gpt', {
                "question" : prompt,
            })
            .then((res) => { console.log('chatGPT response', res); setText(res.data.response);})

    }
    
    // (6) Markdown을 만들 Text를 만들자
    useEffect(() => {
        setContents(
            `
## 설렘 반 걱정 반 첫 신혼집 구하기, 어디로 할까?

결혼을 준비할 때 신혼집 마련은 설렘이기도 하지만 주거지를 선택하는 것인 만큼 가장 중요한 고민 중 하나입니다. 신혼부부들은 어디에 신혼집을 마련할지, 어디서부터 알아봐야 할지 많은 걱정을 합니다.

최근 결혼한 신혼부부들은 어느 지역의 어떤 아파트를 선택했을까요? 특히 주거 인구가 많고 집값이 높은 수도권(서울, 경기, 인천)에서 다른 신혼부부들은 어떤 결정을 했는지 알 수 있다면 신혼집 선택에 큰 도움이 될 것 같습니다.
지오비전 퍼즐의 ‘주거생활’ 데이터를 활용하여 신혼부부가 첫 신혼집으로 많이 선택한 동네와 아파트를 확인해 볼 수 있습니다.
        
<blockquote style="background: #F5F5F5"> 

<i class="document"></i> **제공 대상**
  
서울특별시, 경기도, 인천광역시 내 신혼부부 추정 인구의 거주지 (2020.08~2022.10 기준)  
</blockquote>

![900,151](https://s3.ap-northeast-2.amazonaws.com/diaas-puzzle-hub-backend-imagefile-upload-stg/INSIGHT_REPORT/INSIGHT_REPORT-20230117003954-Small%20kv.jpg)

<br/>

## 수도권에서 첫 신혼집으로 많이 선택한 동네는 어디일까?
##### [신혼집, 수도권 동 순위]

${text.replace('\n', '').trim()}

<br/>

![900,600](${imageUrl})

<br/>
            `
        ) 
    }, [text, imageUrl])


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