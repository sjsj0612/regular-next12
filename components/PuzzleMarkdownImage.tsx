import React from "react";
import Image from "next/image";
import Link from "next/link";
import styled from "@emotion/styled";
import FullscreenOutlinedIcon from "@mui/icons-material/FullscreenOutlined";
import { devices } from "../styles/devices";

const Container = styled.div`
  position: relative;

  margin-block-start: 10px;
  margin-block-end: 10px;

  @media ${devices.mobile} {
    margin-block-start: 8px;
    margin-block-end: 8px;
  }
`;

const FullScreenButton = styled.div`
  display: none;
  width: 20px;
  height: 20px;
  padding: 5px;

  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  bottom: 10px;
  right: 10px;

  @media ${devices.mobile} {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

interface Props {
  src: string;
  width: number;
  height: number;
  alt: string;
}

const PuzzleMarkdownImage = ({ src, width, height, alt }: Props) => {
  return (
    <Container>
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        layout={"responsive"}
        // unoptimized={isSrcGifPath(src)}
      />
      <Link
        href={`/image?url=${src}&width=${width}&height=${height}`}
        passHref={true}
        scroll={false}
      >
        <a>
          <FullScreenButton data-testid={"image-fullscreen-button"}>
            <FullscreenOutlinedIcon sx={{ fontSize: 30, color: "white" }} />
          </FullScreenButton>
        </a>
      </Link>
    </Container>
  );
};

export default PuzzleMarkdownImage;
