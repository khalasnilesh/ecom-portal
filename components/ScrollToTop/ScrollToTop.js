import React, { useEffect, useState, useCallback } from "react";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import styled from "styled-components";

const SttContainer = styled.div`
  align-items: center;
  background: #414141;
  border-radius: 50%;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  display: flex;
  height: 40px;
  justify-content: center;
  left: 88%;
  opacity: ${(props) => (props.showStt ? 1 : 0)};
  position: fixed;
  top: 80%;
  width: 40px;
  transition: all 0.3s linear;
  z-index: ${(props) => (props.showStt ? 3 : -1)};
  @media only screen and (min-width: 600px) {
    left: 90%;
  }
  @media only screen and (min-width: 960px) {
    left: 95%;
  }
`;

export default () => {
  const [showStt, setShowStt] = useState(false);

  const handleScroll = useCallback((event) => {
    const windowScroll = window.scrollY;
    if (windowScroll >= 350 && showStt === false) {
      setShowStt(true);
    } else if (windowScroll < 350) {
      setShowStt(false);
    } else {
      return;
    }
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <SttContainer showStt={showStt}>
      <div>
        <ArrowUpwardIcon
          onClick={scrollToTop}
          css={`
            color: ${(props) => props.theme.secondaryColor};
            font-size: 30px;
          `}
        />
      </div>
    </SttContainer>
  );
};
