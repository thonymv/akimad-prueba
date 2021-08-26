import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { usersAPI } from './usersApi'

export const fetchUsers = createAsyncThunk(
	'users/fetchUsersStatus',
	async (search, { getState, requestId }) => {
		const { currentRequestId, loading } = getState().users
		if (loading !== 'pending' || requestId !== currentRequestId) {
			return
		}
		
		const response = search? await usersAPI.searchUsers(search) : await usersAPI.getUsers()
		
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
		listUsers:[]
	},
	reducers: {
		//standard reducer logic, with auto-generated action types per reducer
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
				state.listUsers = action.payload
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

export default usersSlice.reducer
