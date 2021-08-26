import React from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import { useDispatch ,useSelector } from 'react-redux'
import { changePage, changeResult } from '../features/users/usersSlice'
export default function TablePaginationDemo() {


	const { page, result, total_count } = useSelector((state) => state.users) 
	const dispatch = useDispatch()
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleChangePage = (event, newPage) => {
		dispatch(changePage(newPage+1))
	};

	const handleChangeRowsPerPage = (event) => {
		dispatch(changeResult(parseInt(event.target.value, 10)) )
		dispatch(changePage(1))
	};

	return (
		<TablePagination
			component="div"
			count={total_count}
			page={page-1}
			onPageChange={handleChangePage}
			rowsPerPage={result}
			onRowsPerPageChange={handleChangeRowsPerPage}
		/>
	);
}
