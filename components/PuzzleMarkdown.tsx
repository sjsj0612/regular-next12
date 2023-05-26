import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import styled from "@emotion/styled";
import PuzzleMarkdownImage from "./PuzzleMarkdownImage";
import PuzzleMarkdownIcon from "./PuzzleMarkdownIcon";
import { devices } from "../styles/devices";
import { theme } from '../styles/theme';

const IMAGE_DEFAULT_SIZE = {
  width: 900,
  height: 605,
};

const H1 = styled.h1`
  font-size: 28px;
  font-weight: 900;
  line-height: 1.36;
  letter-spacing: -0.4px;

  @media ${devices.mobile} {
    font-size: 26px;
  }
`;

const H2 = styled.h2`
  font-size: 26px;
  font-weight: 700;
  line-height: 36px;

  color: #0c8bff;

  margin-block-start: 130px;
  margin-block-end: 15px;

  &:first-of-type {
    margin-block-start: 100px;
    @media ${devices.mobile} {
      margin-block-start: 40px;
    }
  }

  @media ${devices.mobile} {
    margin-block-start: 80px;
    margin-block-end: 13px;

    font-size: 24px;
    line-height: 36px;
  }

  svg {
    width: 26px;
    height: 26px;

    @media ${devices.mobile} {
      width: 24px;
      height: 24px;
    }
  }
`;

const H3 = styled.h3`
  font-size: 24px;
  font-weight: 700;
  line-height: 1.33;
  letter-spacing: normal;

  @media ${devices.mobile} {
    font-size: 22px;
  }

  svg {
    width: 24px;
    height: 24px;

    @media ${devices.mobile} {
      width: 22px;
      height: 22px;
    }
  }
`;

const H4 = styled.h4`
  font-size: 22px;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: normal;

  margin-block-start: ${({ theme }) => theme.size.baseGap.desktop};
  margin-block-end: ${({ theme }) => theme.size.baseGap.desktop};

  @media ${devices.mobile} {
    font-size: 20px;
    line-height: 30px;

    margin-block-start: ${({ theme }) => theme.size.baseGap.desktop};
    margin-block-end: ${({ theme }) => theme.size.baseGap.mobile};
  }

  svg {
    width: 27px;
    height: 27px;

    @media ${devices.mobile} {
      width: 23px;
      height: 23px;
    }
  }
`;

const H5 = styled.p`
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;

  color: #5d5e5e;

  margin-block-start: 0px;
  margin-block-end: 0px;

  @media ${devices.mobile} {
    font-size: 18px;
    font-weight: 700;
    line-height: 28px;
  }

  svg {
    width: 18px;
    height: 18px;

    @media ${devices.mobile} {
      width: 16px;
      height: 16px;
    }
  }
`;

const H6 = styled.p`
  font-size: 16px;
  font-weight: 400;

  color: #8b8b8c;

  margin-block-start: 8px;
  margin-block-end: 0px;

  @media ${devices.mobile} {
    margin-block-start: 4px;

    font-size: 14px;
    line-height: 20px;
  }

  svg {
    width: 15px;
    height: 15px;

    @media ${devices.mobile} {
      width: 14px;
      height: 14px;
    }
  }
`;

const P = styled.p`
  /* font-size: ${({ theme }) => theme.size.baseFontSize.desktop}; */
  font-size: ${({ theme }) => theme.size.baseFontSize.desktop};
  font-weight: 400;
  line-height: 30px;
  letter-spacing: normal;
  word-wrap: break-word;

  color: #303038;

  margin-block-start: ${({ theme }) => theme.size.baseGap.desktop};
  margin-block-end: ${({ theme }) => theme.size.baseGap.desktop};

  @media ${devices.mobile} {
    font-size: ${({ theme }) => theme.size.baseFontSize.mobile};
    line-height: 30px;

    margin-block-start: ${({ theme }) => theme.size.baseGap.mobile};
    margin-block-end: ${({ theme }) => theme.size.baseGap.mobile};
  }

  svg {
    width: 27px;
    height: 27px;

    @media ${devices.mobile} {
      width: 23px;
      height: 23px;
    }
  }
`;

const Li = styled.li`
  font-size: ${({ theme }) => theme.size.baseFontSize.desktop};
  font-weight: 400;
  line-height: 1.56;
  letter-spacing: normal;
  word-wrap: break-word;

  margin-block-start: ${({ theme }) => theme.size.baseGap.desktop};
  margin-block-end: ${({ theme }) => theme.size.baseGap.desktop};

  @media ${devices.mobile} {
    font-size: ${({ theme }) => theme.size.baseFontSize.mobile};

    margin-block-start: ${({ theme }) => theme.size.baseGap.mobile};
    margin-block-end: ${({ theme }) => theme.size.baseGap.mobile};
  }

  svg {
    width: 27px;
    height: 27px;

    @media ${devices.mobile} {
      width: 23px;
      height: 23px;
    }
  }
`;

const Ul = styled.ul`
  padding-inline-start: ${({ theme }) => theme.size.baseFontSize.desktop};

  margin-block-start: ${({ theme }) => theme.size.baseGap.desktop};
  margin-block-end: ${({ theme }) => theme.size.baseGap.desktop};

  @media ${devices.mobile} {
    padding-inline-start: ${({ theme }) => theme.size.baseFontSize.mobile};

    margin-block-start: ${({ theme }) => theme.size.baseGap.mobile};
    margin-block-end: ${({ theme }) => theme.size.baseGap.mobile};
  }
`;

const Th = styled.th`
  font-size: 20px;
  font-weight: 400;
  line-height: 1.56;
  letter-spacing: normal;

  @media ${devices.mobile} {
    font-size: 16px;
  }
`;

const Td = styled.td<{ width: string }>`
  font-size: ${({ theme }) => theme.size.baseFontSize.desktop};
  font-weight: 400;
  line-height: 1.56;
  letter-spacing: normal;

  @media ${devices.mobile} {
    font-size: ${({ theme }) => theme.size.baseFontSize.mobile};
    display: inline-block;
    padding: 5px;
    width: 100%;
  }
`;

const Table = styled.table`
  width: 100%;
`;

const A = styled.a`
  margin-top: 20px;
  color: ${({ theme }) => theme.colors.chart0C};
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  text-decoration: underline;
`;

const Blockquote = styled.blockquote`
  border-radius: 8px;
  padding: 14px 30px 22px 30px;
  background-color: #f4f7ff;
  margin-inline-start: 0;
  margin-inline-end: 0;

  margin-block-start: 30px;
  margin-block-end: 30px;

  @media ${devices.mobile} {
    padding: 14px 20px 22px 20px;

    margin-block-start: 30px;
    margin-block-end: 30px;
  }

  p {
    margin-block-start: 0;
    margin-block-end: 10px;
    @media ${devices.mobile} {
      margin-block-start: 0;
      margin-block-end: 6px;
    }
  }

  ul {
    margin-block-start: 0px;
    margin-block-end: 0px;
  }

  li {
    margin-block-start: 0;
    margin-block-end: 0;
  }
`;

const Code = styled.code`
  background: #0c8bff;

  border-radius: 15px;
  padding: 1px 11px;

  margin: 0px 5px;

  font-family: "Pretendard";
  font-weight: 500;
  font-size: 18px;

  color: #ffffff;

  @media ${devices.mobile} {
    font-size: 16px;
  }
`;

function getImageSizeFromElement(element: {
  properties: { alt: string; src: string };
}) {
  const [metaWidth = 0, metaHeight = 0] = element?.properties.alt.split(",");

  return {
    width: Number(metaWidth) || IMAGE_DEFAULT_SIZE.width,
    height: Number(metaHeight) || IMAGE_DEFAULT_SIZE.height,
  };
}

interface Props {
  text: string;
}

const PuzzleMarkdown = ({ text }: Props) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        h1: (props) => <H1 {...props} />,
        h2: (props) => <H2 {...props} />,
        h3: (props) => <H3 {...props} />,
        h4: (props) => <H4 {...props} />,
        h5: (props) => <H5>{props.children}</H5>,
        h6: (props) => <H6>{props.children}</H6>,
        a: (props) => <A {...props} />,
        ul: (props) => <Ul {...props} />,
        li: (props) => <Li {...props} />,
        table: (props) => <Table {...props} />,
        th: (props) => <Th>{props.children}</Th>,
        td: (paragraph) => {
          const { node } = paragraph;

          const firstElement = node.children[0] as unknown;

          if ((firstElement as Element).tagName === "img") {
            const image = firstElement as {
              properties: { alt: string; src: string };
            };

            const { width, height } = getImageSizeFromElement(image);

            return (
              <Td width={`${width}px`}>
                <PuzzleMarkdownImage
                  src={image.properties.src}
                  width={width}
                  height={height}
                  alt={image.properties.alt}
                />
              </Td>
            );
          }
          return <Td width={"auto"}>{paragraph.children}</Td>;
        },
        p: (paragraph) => {
          const { node } = paragraph;

          const firstElement = node.children[0] as unknown;

          if ((firstElement as Element).tagName === "img") {
            const image = firstElement as {
              properties: { alt: string; src: string };
            };

            const { width, height } = getImageSizeFromElement(image);

            return (
              <PuzzleMarkdownImage
                src={image.properties.src}
                width={width}
                height={height}
                alt={image.properties.alt}
              />
            );
          }
          return <P>{paragraph.children}</P>;
        },
        blockquote: (props) => <Blockquote {...props} />,
        i: (icon) => {
          const { className } = icon;

          if (!className) return null;

          return <PuzzleMarkdownIcon name={className} />;
        },
        code: (props) => <Code {...props} />,
      }}
    >
      {text}
    </ReactMarkdown>
  );
};

export default PuzzleMarkdown;
