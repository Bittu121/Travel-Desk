import React, { useState } from "react";
import PendingRequestLine from "./PendingRequestLine.jsx";
import { RiFileExcel2Line } from "react-icons/ri";
import * as XLSX from "xlsx";
import { Pagination } from "@mui/material";
import LoadingSpinner from "../LoadingSpinner.jsx";

function PendingRequest() {
  const [data, setData] = useState([]);

  return (
    <>
      <div>
        <p>PendingRequest</p>
      </div>
    </>
  );
}

export default PendingRequest;
