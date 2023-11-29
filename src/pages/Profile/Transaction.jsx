import React , {useState, useEffect} from 'react'

// components
import LoadingSpinner from "@components/LoadingSpinner";
import {localDateFormat,} from "@components/CustomDatePicker";
import NotFound from "@components/NotFound";

// MUI
import Pagination from '@mui/material/Pagination';

// custom hook
import useHttp from "@hook/use-http";

// reducer
import {getTransactions} from '@Reducer/transaction/ta-action'

const Type = [
  {
    id: 'upcoming',
    name: 'Upcoming',
  },
  {
    id: 'past',
    name: 'Past',
  }
]

const statusStyle = {
  CONFIRMED:{
    color: `#0b2e72`,
    cssName: `CONFIRMED`,
  },
  PENDING:{
    color: `#ff7e0d`,
    cssName: `PENDING`,
  },
  CANCELLED:{
    color: `#ff0d0d`,
    cssName: `CANCELLED`,
  },
}

function Transaction() {
  const [currentType, setCurrentType] = useState(Type[0].id)
  const [transactionList, setTransactionList] = useState([])
  const [pagination, setPagination] = useState({
    currentIndex: 1,
    itemsPerPage: 6,
    totalLength: 0,
  });

    // use http hook
  const {
    sendRequest: fetchTransactionsApi,
    status,
    data: transactionsResult,
  } = useHttp(getTransactions);

  // fetch api
  useEffect(()=>{
    fetchTransactionsApi();
  },[])

  // after fetch api and store data to state
  useEffect(()=>{
    if(transactionsResult?.data){
      handlePageChange(null, pagination?.currentIndex)
    }else{
      setTransactionList([])
    }
  },[transactionsResult,currentType])


  const handlePageChange = (event, value) => {
    const currentRecord = transactionsResult?.data[currentType]

    // 计算当前页的起始索引和结束索引
    const startIndex = (value - 1) * pagination?.itemsPerPage;
    const endIndex = startIndex + pagination?.itemsPerPage;

    // 提取当前页的数据范围
    const currentPageData = currentRecord.slice(startIndex, endIndex);

    // 处理页码更改逻辑
    setPagination({
      ...pagination,
      currentIndex: value,
      totalLength: Math.ceil(currentRecord.length / pagination?.itemsPerPage)
    });

    console.log('currentPageData',currentPageData)
    setTransactionList(currentPageData)
  };


  const renderType = Type.map((item,index)=><p 
    key={index} 
    onClick={()=>setCurrentType(item.id)}
    className={`typeItem ${currentType == item.id?`typeItem-active`:''}`}
    >{item?.name}</p>)

  if(status == 'pending') return <LoadingSpinner />
  return (
    <div className='transactionContainer'>
      <div className='transactionContainer-typeWrap'>{renderType}</div>

      <div className='recordWrap'>
        {// render transaction list
        transactionList?.length ? 
        transactionList.map((item,index)=>(
          <div key={index} className='recordWrap-item' onClick={()=>{}}>
            <div className='recordWrap-item-subItem'>
              {/* start date */}
              <dir className='flexRow'>
                <p>Start Date:</p>
                <p>{localDateFormat(item.startDate)}</p>
              </dir>

              { // end date 
                item?.endDate?(
                <dir className='flexRow'>
                  <p>End Date:</p>
                  <p>{localDateFormat(item.endDate)}</p>
                </dir>
                ):null
              }
            </div>

            <dir className='recordWrap-item-subItem'>
              <dir className='flexRow'>
                <p>Booking Reference:</p>
                <p className='bookingReference'>{item.bookingReference}</p>
              </dir>

              <dir className='flexRow'>
                <p>Status:</p>
                <p className={statusStyle[item.status]?.cssName}>{item.status}</p>
              </dir>
            </dir>
          </div>
        )): <NotFound />}
      </div>

      {
        transactionList?.length ?(
          <div className='paginationWrap'>
            <Pagination 
              size="large"
              count={pagination?.totalLength} 
              page={pagination?.currentIndex} 
              onChange={handlePageChange} 
            />
          </div>
        ):null
      }

    </div>
  )
}

export default React.memo(Transaction)
