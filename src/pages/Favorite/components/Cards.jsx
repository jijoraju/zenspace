import React, { useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// components
import Card from "./Card";
import NotFound from "@components/NotFound";
import CardContainer from "@components/Card/CardContainer";
import CardSkeleton from "@components/Card/CardSkeleton";

function Cards(props) {
  const { workSpaceResult, loadingStatus, setWorkSpaceList,productPageState } = props;

  if (!workSpaceResult?.length && !loadingStatus) {
    return <NotFound />;
  }

  const renderCards = () => {
    return workSpaceResult.map((item, index) => {
      const photo = item?.photos[0];
      const cardProps = {
        imgDefault:  photo ||`home/solutions/Gallery_Workplace.jpg`,
        img2:  photo ||`home/solutions/Gallery_Workplace.jpg`,
        img3:  photo ||`home/solutions/Gallery_Workplace.jpg`,
        fullInfo: item,
        setWorkSpaceList,
        productPageState,
      };

      return <Card key={index} {...cardProps} />;
    });
  };

  return (
    <div className="productContainer-selectionContainer-cards">
      {loadingStatus
        ? Array.from(new Array(6)).map((item, index) => (
            <CardSkeleton key={index} />
          ))
        : renderCards()}
    </div>
  );
}

export default React.memo(Cards);
