import React, { useEffect, useState } from "react";
import axiosInstance from "../axios";
import WalletTable from "./WalletTable";

function WalletBase() {
  const [appState, setAppState] = useState({
    finances: null,
  });

  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [prevPageNum, setPrevPageNum] = useState(1);
  const [nextPageNum, setNextPageNum] = useState(2);



  useEffect(() => {

    console.log(pageNum)
    axiosInstance.get(`finances/operations/?page=${pageNum}`).then((res) => {
      const newData = res.data;
      setAppState({ loading: false, finances: newData });
      setTotalPages(newData.total_pages)
      setNextPageNum(newData.links.next)
      setPrevPageNum(newData.links.previous)
      console.log(res.data);
    });
  }, [pageNum]);


  
  return (
    <div className="App">
      {appState.finances == null ? (
        <h2>
          <b>Loading...</b>
        </h2>
      ) : (
        <div>
        <WalletTable items={appState.finances.data} pageNum={pageNum} prevPageNum={prevPageNum} nextPageNum={nextPageNum} setPageNum={setPageNum} totalPages={totalPages}/>

        
        </div>
      )}
    </div>
  );
}
export default WalletBase;
