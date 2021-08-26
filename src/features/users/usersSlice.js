import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { usersAPI } from './usersApi'

export const fetchUsers = createAsyncThunk(
	'users/fetchUsersStatus',
	async (data,{ getState, requestId }) => {
		const { currentRequestId, loading, page , result , search } = getState().users
		if (loading !== 'pending' || requestId !== currentRequestId) {
			return
		}
		const response = search.replace(/\s/g, "")? await usersAPI.searchUsers({search,page,result}) : await usersAPI.getUsers({page,result})
		
		return response
	}
)

// Then, handle actions in your reducers:
const usersSlice = createSlice({
	name: 'users',
	initialState: { 
		loading: 'idle',
		error: undefined,
		currentRequestId: undefined,
		listUsers:[],
		page:1,
		result:4,
		search:"",
		total_count:0
	},
	reducers: {
		changePage: (state, action) => {
			state.page = action.payload
		},
		changeResult: (state, action) => {
			state.result = action.payload
		},
		setSearch:(state, action)=>{
			state.search = action.payload
		}
	},
	extraReducers: (builder) => {
		// Add reducers for additional action types here, and handle loading state as needed
		builder
		.addCase(fetchUsers.fulfilled, (state, action) => {
			const { requestId } = action.meta
			if (
				state.loading === 'pending' &&
				state.currentRequestId === requestId
			) {
				state.loading = 'idle'
				console.log(action.payload)
				state.listUsers = action.payload.items
				state.total_count = action.payload.total_count
				state.currentRequestId = undefined
			}
		})
		.addCase(fetchUsers.pending, (state, action) => {
			// Add user to the state array
			if (state.loading === 'idle') {
				state.loading = 'pending'
				state.currentRequestId = action.meta.requestId
			}
		})
		.addCase(fetchUsers.rejected, (state, action) => {
			const { requestId } = action.meta
			if (
				state.loading === 'pending' &&
				state.currentRequestId === requestId
			) {
				state.loading = 'idle'
				state.error = action.error
				state.currentRequestId = undefined
			}    
		})
	},
})

export const { changePage , changeResult , setSearch } = usersSlice.actions

export default usersSlice.reducer
