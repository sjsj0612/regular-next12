import Table01 from "../components/01_realtor_call_trend_weekly/Table01";


const data = {
    ym: '202304',
    label: '4월',
    align: ['center', 'center', 'center', 'center'],
    columns: ["순위", '변동', "시도", "통화량 변화율(%)"],
    data: [
        {column1: '1', column2: 12, column3: '광주광역시', column4: 3.208},
        {column1: '2', column2: 3, column3: '세종특별자치도', column4: -0.223},
        {column1: '3', column2: -2, column3: '인천광역시', column4: -1.860},
        {column1: '4', column2: '-', column3: '대구광역시', column4: -2.655},
        {column1: '5', column2: 4, column3: '전라북도', column4: -3.085},
        {column1: '6', column2: 10, column3: '울산광역시', column4: -3.297},
        {column1: '7', column2: -4, column3: '부산광역시', column4:  -3.357},
        {column1: '8', column2: '-', column3: '경상남도', column4: -3.725},
        {column1: '9', column2: 2, column3: '경상북도', column4: -4.327},
        {column1: '10', column2: 2, column3: '서울특별시', column4: -5.207},
        {column1: '11', column2: -4, column3: '강원도', column4: -5.411},
        {column1: '12', column2: 5, column3: '충청남도', column4: -5.422},
        {column1: '13', column2: 1, column3: '대전광역시', column4: -5.475},
        {column1: '14', column2: -8, column3: '경기도', column4: -6.092},
        {column1: '15', column2: '-', column3: '충청북도', column4: -7.305},
        {column1: '16', column2: -14, column3: '제주특별자치도', column4: -7.769},
        {column1: '17', column2: -7, column3: '전라남도', column4: -10.428}
    ]
}


const data2 = {
    ym: '202304',
    label: '4월',
    align: ['center', 'center', 'center', 'center', 'center'],
    columns: ["순위", '변동', "시도", "시군구", "통화량 변화율(%)"],
    data: [
        {column1: '1', column2: 'new', column3: '인천광역시', column4: '중구', column5: 3.208},
        {column1: '2', column2: 5, column3: '경기도', column4: '고양시 덕양구', column5: -0.223},
        {column1: '3', column2: 2, column3: '서울특별시', column4: '서초구', column5: -1.860},
        {column1: '4', column2: 'new', column3: '경기도', column4: '수원시 장안구', column5: -2.655},
        {column1: '5', column2: 'new', column3: '서울특별시', column4: '영등포구', column5: -3.085},
        {column1: '6', column2: 'new', column3: '인천광역시', column4: '계양구', column5: -3.297},
        {column1: '7', column2: -6, column3: '서울특별시', column4: '도봉구', column5:  -3.357},
        {column1: '8', column2: 'new', column3: '경기도', column4: '군포시', column5: -3.725},
        {column1: '9', column2: 'new', column3: '경기도', column4: '안산시 단원구', column5: -4.327},
        {column1: '10', column2: 'new', column3: '인천광역시', column4: '서구', column5: -5.207},
    ]
}

const Insight = () => {
    return (
        <>
            <Table01 data={data.data} columns={data.columns} align={data.align}/>
            <Table01 data={data2.data} columns={data2.columns} align={data2.align} gridTemplate={'0.8fr 1fr 2fr 2fr 2fr'}/>
        </>
    )
}   

export default Insight;