import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles'
import Layout from '../layout'
import ListUser from '../listUser'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../../features/users/usersSlice'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const useStyles = makeStyles((theme) => ({
	root: {
		width:"100%",
	},
	toastSuccess:{
		backgroundColor:theme.palette.success.main
	},
	toastDanger:{
		backgroundColor:theme.palette.error.main
	},
}));
	
const Home = (props) => {

	const { listUsers , loading, error , page, result} = useSelector((state) => state.users) 
	const dispatch = useDispatch()
	const classes = useStyles()
	const handleUsers = async ()=>{
		if(loading == 'idle'){
			try {
				await dispatch(fetchUsers())
				if(error == undefined){
					//toast.success("Cargado",{className:classes.toastSuccess})
				}else{
					toast.error("No se ha podido cargar",{className:classes.toastDanger})
					console.error(error)
				}
			} catch(err){
				toast.error("No se ha podido cargar",{className:classes.toastDanger})
				console.error(err)
			}
		}
	}
	useEffect(()=>{
		handleUsers()
	},[page,result])
	const users = [
		{
			login:"defunkt",
			avatar_url:"https://avatars.githubusercontent.com/u/2?v=4",
			id:6
		},
	]

	return(
		<Layout>
			<div className={classes.root}>
			<ListUser router={props.router} users={listUsers} />
			</div>
			<ToastContainer position="bottom-right"/>
		</Layout>
	)
};

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
