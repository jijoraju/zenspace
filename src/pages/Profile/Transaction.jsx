import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// components
import LoadingSpinner from "@components/LoadingSpinner";
import { localDateFormat } from "@components/CustomDatePicker";
import NotFound from "@components/NotFound";

// MUI
import Pagination from "@mui/material/Pagination";

// custom hook
import useHttp from "@hook/use-http";

// reducer
import {
  getTransactions,
  getTransactionDetail,
} from "@Reducer/transaction/ta-action";

import { statusStyle, Type } from "@Data/paymentStatus";

function Transaction() {
  const navigate = useNavigate();
  const [currentType, setCurrentType] = useState(Type[0].id);
  const [transactionList, setTransactionList] = useState([]);
  const [pagination, setPagination] = useState({
    currentIndex: 1,
    itemsPerPage: 6,
    totalLength: 0,
  });

  // get transaction api
  const {
    sendRequest: fetchTransactionsApi,
    status,
    data: transactionsResult,
  } = useHttp(getTransactions);

  // fetch api
  useEffect(() => {
    fetchTransactionsApi();
  }, []);

  // after fetch api and store data to state
  useEffect(() => {
    if (transactionsResult?.data) {
      handlePageChange(null, pagination?.currentIndex);
    } else {
      setTransactionList([]);
    }
  }, [transactionsResult, currentType]);

  // get transaction detail api
  const {
    sendRequest: fetchTransactionDetailApi,
    status: transactionDetailStatus,
    data: transactionDetailData,
  } = useHttp(getTransactionDetail);

  const goToDetail = useCallback(
    (reference) => {
      fetchTransactionDetailApi(reference);
    },
    [fetchTransactionDetailApi]
  );

  useEffect(() => {
    if (transactionDetailData?.data) {
      const { data } = transactionDetailData;
      const { bookingReference } = data;

      if (data) {
        navigate(`${bookingReference}`, { state: data });
      }
    }
  }, [transactionDetailData]);

  // pagination change
  const handlePageChange = (event, value) => {
    const currentRecord = transactionsResult?.data[currentType];
    const sortRecord = currentRecord.sort((a, b) => {
      return new Date(b.startDate) - new Date(a.startDate);
    })
    // 计算当前页的起始索引和结束索引
    const startIndex = (value - 1) * pagination?.itemsPerPage;
    const endIndex = startIndex + pagination?.itemsPerPage;

    // 提取当前页的数据范围
    const currentPageData = sortRecord.slice(startIndex, endIndex);

    // 处理页码更改逻辑
    setPagination({
      ...pagination,
      currentIndex: value,
      totalLength: Math.ceil(sortRecord.length / pagination?.itemsPerPage),
    });

    setTransactionList(currentPageData);
  };

  const renderType = Type.map((item, index) => (
    <p
      key={index}
      onClick={() => setCurrentType(item.id)}
      className={`typeItem ${currentType == item.id ? `typeItem-active` : ""}`}
    >
      {item?.name}
    </p>
  ));

  if (status == "pending") return <LoadingSpinner />;
  return (
    <div className="transactionContainer">
      <div className="transactionContainer-typeWrap">{renderType}</div>

      <div className="recordWrap">
        {
          // render transaction list
          transactionList?.length ? (
            transactionList.map((item, index) => (
              <div
                key={index}
                className="recordWrap-item"
                onClick={goToDetail.bind(this, item.bookingReference)}
              >
                <div className="recordWrap-item-subItem">
                  {/* start date */}
                  <dir className="flexRow">
                    <p>Start Date:</p>
                    <p>{localDateFormat(item.startDate)}</p>
                  </dir>

                  {
                    // end date
                    item?.endDate ? (
                      <dir className="flexRow">
                        <p>End Date:</p>
                        <p>{localDateFormat(item.endDate)}</p>
                      </dir>
                    ) : null
                  }
                </div>

                <dir className="recordWrap-item-subItem">
                  <dir className="flexRow">
                    <p>Booking Reference:</p>
                    <p className="bookingReference">{item.bookingReference}</p>
                  </dir>

                  <dir className="flexRow">
                    <p>Status:</p>
                    <p className={statusStyle[item.status]?.cssName}>
                      {item.status}
                    </p>
                  </dir>
                </dir>
              </div>
            ))
          ) : (
            <NotFound />
          )
        }
      </div>

      {transactionList?.length ? (
        <div className="paginationWrap">
          <Pagination
            size="large"
            count={pagination?.totalLength}
            page={pagination?.currentIndex}
            onChange={handlePageChange}
          />
        </div>
      ) : null}
    </div>
  );
}

export default React.memo(Transaction);
