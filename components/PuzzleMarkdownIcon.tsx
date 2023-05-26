import React from "react";
import styled from "@emotion/styled";
import Bag from "../assets/icons/markdown/bag.svg";
import Congestion from "../assets/icons/markdown/congestion.svg";
import Days from "../assets/icons/markdown/days.svg";
import Document from "../assets/icons/markdown/document.svg";
import Exit from "../assets/icons/markdown/exit.svg";
import Flag from "../assets/icons/markdown/flag.svg";
import House from "../assets/icons/markdown/house.svg";
import Metro from "../assets/icons/markdown/metro.svg";
import Offer from "../assets/icons/markdown/offer.svg";
import PCell from "../assets/icons/markdown/pCell.svg";
import Person from "../assets/icons/markdown/person.svg";
import Place from "../assets/icons/markdown/place.svg";
import RealTime from "../assets/icons/markdown/realTime.svg";
import Route from "../assets/icons/markdown/route.svg";
import School from "../assets/icons/markdown/school.svg";
import Search from "../assets/icons/markdown/search.svg";
import Share from "../assets/icons/markdown/share.svg";
import Stats from "../assets/icons/markdown/stats.svg";
import Truck from "../assets/icons/markdown/truck.svg";
import VisitTime from "../assets/icons/markdown/visitTime.svg";
import { devices } from "../styles/devices";

const IconWrapper = styled.span`
  margin-right: 5px;
  @media ${devices.mobile} {
    margin-right: 0px;
  }
`;

const Inside = styled.span`
  svg {
    transform: translateY(25%);

    @media ${devices.mobile} {
      transform: translateY(20%);
    }
  }
`;

const icons: { [key: string]: React.ReactNode } = {
  bag: <Bag />,
  congestion: <Congestion />,
  days: <Days />,
  document: <Document />,
  exit: <Exit />,
  flag: <Flag />,
  house: <House />,
  metro: <Metro />,
  offer: <Offer />,
  pCell: <PCell />,
  person: <Person />,
  place: <Place />,
  realTime: <RealTime />,
  route: <Route />,
  school: <School />,
  search: <Search />,
  share: <Share />,
  stats: <Stats />,
  truck: <Truck />,
  visitTime: <VisitTime />,
};

interface Props {
  name: string;
}

const PuzzleMarkdownIcon = ({ name }: Props) => {
  return (
    <IconWrapper>
      <Inside>{icons[name]}</Inside>
    </IconWrapper>
  );
};

export default PuzzleMarkdownIcon;
