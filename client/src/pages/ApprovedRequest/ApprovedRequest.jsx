import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApprovedRequestData } from "../../action/travelPendingApprovalAction.js";

function ApprovedRequest() {
  const dispatch = useDispatch();
  const [ApprovedRequestData, setApprovedRequestData] = useState([]);

  useEffect(() => {
    const fetchApprovedRequestsData = async () => {
      const data = await dispatch(getApprovedRequestData());
      console.log("daa", data);
    };
    fetchApprovedRequestsData();
  }, []);

  return (
    <>
      <div>ApprovedRequest</div>
    </>
  );
}

export default ApprovedRequest;
