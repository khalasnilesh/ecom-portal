import React, { useEffect } from "react";
import Banner from "./Banner/Banner";
import PhoneAndroidOutlinedIcon from "@material-ui/icons/PhoneAndroidOutlined";
import OfflineBoltOutlinedIcon from "@material-ui/icons/OfflineBoltOutlined";
import FlightIcon from "@material-ui/icons/Flight";
import SecondaryMenubar from "./SecondaryMenubar-styled/SecondaryMenubar";
import BrandSearch from "./BrandSearch/BrandSearch";
import MobileHeader from "./Mobile-Header/MobileHeader";
import PrimaryMenubar from './PrimaryMenubar/PrimaryMenubar';
import { Axios } from '../../utils';
import useSWR from "swr";
import Router from 'next/router';
import Fedex from "../FedEx/Fedex";
import NewMenu from "./PrimaryMenubar/NewMenu";

// Custom component for BrandSearch
const CustomComponent = () => {
  return (
    <>
      <PhoneAndroidOutlinedIcon />
      <div>Some text</div>
    </>
  );
};

// Props data for BrandSearch Component
const brandSearchOptions = {
  logo:
    "https://www.elementsdistribution.us/uploads/uploads/ELEMENTS-LOGO-2019-small.png",
  searchBar: null, // Copying from the existing desing
  options: [
    {
      id: 1,
      component: <CustomComponent />,
    },
    {
      id: 2,
      icon: <FlightIcon className="brandSearchRight-item-icon" />,
      text: "Overseas \n delivery",
      link: "/order",
      separator: true,
    },
    {
      id: 2,
      icon: <OfflineBoltOutlinedIcon className="brandSearchRight-item-icon" />,
      text: "Quick \n order",
      link: "/order",
      separator: true,
    },
  ],
};

const bannerOptions = {};

export default () => {
  const fetchData = async () => {
    const res = await Axios.get(
      "/menu"
    );
    const menuItems = await res.data;
    return menuItems;
  };
  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  }
  const { data, error } = useSWR("mobileMenuData", fetchData, {focusThrottleInterval: 10000});

  useEffect(() => {
    Router.events.on('routeChangeComplete', handleScrollToTop);
    return () => {
      Router.events.off('routeChangeComplete', handleScrollToTop)
    }
  },[])

  return (
    <>
      <MobileHeader menuItems={!data ? [] : data} />
      {/* <Banner /> */}
      <Fedex />
      <SecondaryMenubar />
      <BrandSearch />
      {/* <PrimaryMenubar data={!data ? [] : data}/> */}
      <NewMenu data={!data ? [] : data} />
    </>
  );
};
