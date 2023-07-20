
import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import SvgIconUp from '../../assets/icons/chart/iconRankingUp.svg';
import SvgIconDown from '../../assets/icons/chart/iconRankingDown.svg';
import PuzzleTypography from "../00_common/PuzzleTypography";

const TableContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 708px;
`;
const Counter = styled.div``
const TableHead = styled.div<{gridTemplate: string, color: string}>`
    width: 100%;
    grid-template-columns: ${(props)=> props.gridTemplate};
    background-color: ${(props)=> props.color};
    display: grid;
    height: 50px;
    justify-items: center;
    align-content: center;
    font-size: 18px;
    line-height: 28px;
    font-weight: 700; 
    & > div > p {
        white-space: nowrap;
    } 
`;
const TableBody = styled.div<{gridTemplate: string}>`
    width: 100%;
    display: grid;
    grid-template-columns: ${(props)=> props.gridTemplate};
    justify-items: flex-start;
    align-content: center;
    /* height: 56px; */
    font-size: 18px;
    line-height: 28px;
    font-weight: 400;
    
    background-color: ${({theme})=> theme.colors.grayF0};
    &:nth-of-type(2n) {
        background-color: white;
    }
`;
const TableCell = styled.div`
    display: flex;
    width: -webkit-fill-available;
    height: 50px;
    padding-left: 20px;
    text-overflow: ellipsis;
    overflow: hidden;
    
    align-items: center;

    & > p {
        word-break: break-all;
    }

    &.left-aligned {
        justify-self: flex-start;
    }
    &.center-aligned {
        width: auto;
        justify-self: center;
        text-align: center;
    }
    &.right-aligned {
        width: auto;
        justify-self: flex-end;
    }
`;
const DiffText = styled.p`
    font-size: 14px;
    line-height: 20px;

    &.same {
        color: ${({theme})=> theme.colors.gray8b};
    }
    &.up {
        color: ${({theme})=> theme.colors.pointEf};
        margin-left: 2px;
    }
    &.down {
        color: ${({theme})=> theme.colors.point0C};
        margin-left: 2px;
    }
    &.new {
        color: ${({theme})=> theme.colors.point60};
    }
`;
const Div = styled.div`
    display: flex;
    align-items: center;
`;


interface Props {
  data: any;
  columns: string[];
  align?: string[];
  gridTemplate?: string;
  className?: string;
  headColor?: string;
}
const Table01 = ({ 
        data, 
        columns, 
        align = ["center", "center", "left", "center"], 
        gridTemplate = '0.8fr 1fr 3fr 2fr',
        className,
        headColor = '#1F2B68'
    }: Props) => {


    // 변동값 상승 or 하락 Icon 추가
    const diff = (text : string|number) => {
        if (text === '-') {
            return <DiffText className="same">{text}</DiffText>
        } else if (typeof text === 'number' && text > 0) {
            return (
                <Div>
                    <SvgIconUp/>
                    <DiffText className="up">{text}</DiffText>
                </Div>

            )    
        } else if (typeof text === 'number' && text < 0) {
            return (
                <Div>
                    <SvgIconDown/>
                    <DiffText className="down">{Math.abs(text)}</DiffText>
                </Div>

            ) 
        } else if (text === "new") {
            return <DiffText className="new">{text}</DiffText>
        }
    }
    
    // tabel cell
    const getValue = (row:any, i:number) => {
        const getColumn = (i:number) => {
            if (i === 0) return row.column1
            else if (i === 1) return row?.column2
            else if (i === 2) return row?.column3
            else if (i === 3) return row?.column4
            else if (i === 4) return row?.column5
        }

        if (columns[i] === '변동') return (
            <TableCell className={`${align[1]}-aligned`}>
                {diff(getColumn(i))}
            </TableCell>
        )
        else return (
            <TableCell className={`${align[i]}-aligned`}>
                <PuzzleTypography type="copy" scale="5" weight={ columns[i] === '순위' ? "bold" : "normal" }>
                    {getColumn(i)}
                </PuzzleTypography>
            </TableCell>
        )
    }
        
    return (
        <TableContainer className={className} data-testid={"showroom-ranking"}>
            <Counter>
                {/* column 명 */}
                <TableHead gridTemplate={gridTemplate} color={headColor}>
                    {columns.map((name:string, index:number) => (
                        <TableCell key={index} className={'center-aligned'}>
                            <PuzzleTypography type="copy" scale="6" color="white" weight="normal">
                                {name}
                            </PuzzleTypography>
                            
                        </TableCell>
                    ))}
                </TableHead>

                {/* 데이터 */}
                {data &&
                    data.map((row:any, index:number) => (
                        <TableBody 
                            key={index} 
                            gridTemplate={gridTemplate}
                        >
                            { getValue(row, 0) }
                            { getValue(row, 1) }
                            { getValue(row, 2) }
                            { row.column4 && getValue(row, 3) }
                            { row.column5 && getValue(row, 4) }
                        </TableBody>
                    ))
                }
            </Counter>
        </TableContainer>
    );
};

export default Table01;

