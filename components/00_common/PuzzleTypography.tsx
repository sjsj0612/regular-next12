import styled from "@emotion/styled";
import { devices } from "../../styles/devices";
import { theme } from "../../styles/theme";

const P = styled.p<{ color: string }>`
  white-space: pre-line;
  color: ${(props) => props.color};
  vertical-align: center;
  margin: 0;
  word-break: keep-all;

  /* Title */
  &.title-case1 {
    font-weight: 700;
    font-size: 95px;
    line-height: 110px; 
    letter-spacing: -0.4px;

    @media ${devices.mobile} {
      font-weight: 700;
      font-size: 55px;
      line-height: 65px;
    }
  }

  &.title-case2 {
    font-weight: 700;
    font-size: 70px;
    line-height: 84px;
    letter-spacing: -0.4px;

    @media ${devices.mobile} {
      font-weight: 600;
      font-size: 35px;
      line-height: 40px;
    }
  }

  &.title-case3 {
    font-size: 40px;
    font-weight: 700;
    line-height: 56px;
    letter-spacing: -0.4px;

    @media ${devices.mobile} {
      font-weight: 600;
      font-size: 24px;
      line-height: 32px;
    }
  }

  &.title-case4 {
    font-weight: 700;
    font-size: 34px;
    line-height: 45px;
    letter-spacing: -0.4px;

    @media ${devices.mobile} {
      font-size: 20px;
      line-height: 26px;
    }
  }

  /* copy */
  &.copy-case1 {
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;

    @media ${devices.mobile} {
      font-weight: 400;
      font-size: 20px;
      line-height: 26px;
    }
  }

  &.copy-case3 {
    font-weight: 400;
    font-size: 22px;
    line-height: 36px;

    @media ${devices.mobile} {
      font-size: 18px;
      line-height: 24px;
    }
  }

  &.copy-case5 {
    font-weight: 400;
    font-size: 20px;
    line-height: 26px;

    @media ${devices.mobile} {
      font-size: 16px;
      line-height: 22px;
    }
  }
  &.copy-case6 {
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;

    @media ${devices.mobile} {
      font-size: 14px;
      line-height: 18px;
    }
  }
  &.copy-case7 {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;

    @media ${devices.mobile} {
      font-size: 12px;
      line-height: 16px;
    }
  }
  &.copy-case8 {
    font-weight: 300;
    font-size: 12px;
    line-height: 24px;

    @media ${devices.mobile} {
      font-size: 10px;
      line-height: 14px;
    }
  }
  &.underline-case1 {
    font-weight: 500;
    font-size: 20px;
    line-height: 32px;

    text-decoration-line: underline;
    @media ${devices.mobile} {
      font-size: 16px;
      line-height: 24px;
    }
  }

  &.normal {
    font-weight: 400;
  }

  &.semibold {
    font-weight: 600;
  }

  &.bold {
    font-weight: 700;
  }

  &.inline {
    display: inline;
  }
`;

interface Props {
  children?: any;
  type: "title" | "copy" | "underline";
  scale: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";
  color?: string;
  className?: string;
  testId?: string;
  weight?: "normal" | "semibold" | "bold";
}

const PuzzleTypography = ({
  children,
  type,
  scale,
  color = theme.colors.black,
  className,
  testId = "",
  weight,
}: Props) => {
  return (
    <P
      className={`${type}-case${scale} ${className ?? ""} ${weight ?? ""}`}
      color={color}
      data-testid={testId}
    >
      {children}
    </P>
  );
};

export default PuzzleTypography;
