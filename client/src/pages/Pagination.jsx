import * as React from "react";
import MuiPagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function Pagination({ itemsPerPage, totalItems, currentPage, paginate }) {
  const count = Math.ceil(totalItems / itemsPerPage);
  if (count <= 1) return null;
  const handleChange = (event, value) => {
    paginate(value);
  };
  return (
    <>
      <div className="flex justify-end py-4 px-2">
        <Stack spacing={2}>
          <MuiPagination
            count={count}
            page={currentPage}
            onChange={handleChange}
            showFirstButton
            showLastButton
            size="large"
            shape="rounded"
            variant="outlined"
            color="primary"
            siblingCount={1}
            boundaryCount={1}
            sx={{
              "& .MuiPaginationItem-root": {
                margin: "0 4px",
                "&.Mui-selected": {
                  backgroundColor: "#3B82F6",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#2563EB",
                  },
                },
                "&:hover": {
                  backgroundColor: "#F3F4F6",
                },
              },
            }}
          />
        </Stack>
      </div>
    </>
  );
}

export default Pagination;
