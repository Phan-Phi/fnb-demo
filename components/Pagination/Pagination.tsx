import { Pagination as MuiPagination } from "@mui/material";
import { UsePaginationProps } from "@mui/material/usePagination/usePagination";

interface PaginationProps extends UsePaginationProps {
  count: number;
  onchange: (e: any, value: number) => void;
}

export default function Pagination({ count, onchange, ...props }: PaginationProps) {
  return (
    <MuiPagination
      showFirstButton
      showLastButton
      onChange={onchange}
      count={count}
      sx={{
        "& .MuiPagination-ul": {
          justifyContent: "center",
        },
      }}
      {...props}
    />
  );
}
