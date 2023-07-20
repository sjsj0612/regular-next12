import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    size: {
      pageWidth: string;
      navBarHeight: string;
      layoutXPadding: string;
      layoutBottomPadding: string;
      cardBorderRadius: string;
      cardWidth: string;
      cardHeight: string;
      footerHeight: string;
      mobileMinWidth: string;
      mobileMaxWidth: string;
      mobilePadding: string;
      sectionGap: string;
      mobileSectionGap: string;
      mapHeaderHeight: string;

      baseFontSize: {
        desktop: string;
        mobile: string;
      };

      baseGap: {
        desktop: string;
        mobile: string;
      };
    };
    colors: {
      // Colors
      black: string;
      white: string;

      //{category}{hex2자리}
      gray6e: string;
      grayAf: string;
      grayD0: string;
      grayEa: string;
      grayF3: string;
      grayF4: string;
      grayF0: string;
      grayD9: string;
      gray70: string;
      gray97: string;
      gray95: string;
      gray8b: string;
      gray33: string;
      gray77: string;
      pointFc: string;
      pointF7: string;
      point70: string;
      pointC5: string;
      point6A: string;
      point0C: string;
      point78: string;
      point4A: string;
      point6B: string;
      pointA5: string;
      pointEf: string;
      pointEb: string;
      point60: string;
      point8C: string;
      point1F: string;
      bg: string;
      error: string;
      loading: string;

      chart0C: string;
      chart67: string;
      chartD4: string;

      subwayLine1: string;
      subwayLine2: string;
      subwayLine3: string;
      subwayLine4: string;
      subwayLine5: string;
      subwayLine6: string;
      subwayLine7: string;
      subwayLine8: string;
      subwayLine9: string;

      congestionLevel1: string;
      congestionLevel2: string;
      congestionLevel3: string;
      congestionLevel4: string;

      bannerBG01: string;
      bannerBG02: string;
      bannerBG03: string;
      bannerBG04: string;

      menuCatalogHeader: string;

      cardListBackground: string;

      color1: string;
      color2: string;
      color3: string;
      color4: string;
      color5: string;

      textColor1: string;
      textColor2: string;
    };
  }
}

declare module "*.svg";

declare module "chart.js" {
  interface TooltipPositionerMap {
    myCustomPositioner: TooltipPositionerFunction<ChartType>;
  }
}
