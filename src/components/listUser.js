import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { usersAPI } from '../features/users/usersApi'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import IconButton from '@material-ui/core/IconButton'
import CircularProgress from '@material-ui/core/CircularProgress'
import LinearProgress from '@material-ui/core/LinearProgress'
import { useHistory } from "react-router-dom"
import { useSelector } from 'react-redux'
import { grey } from '@material-ui/core/colors'
import PaginationList from './paginationList'
const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		backgroundColor: theme.palette.background.paper,
	},
	inline: {
		display: 'inline',
	},
	linearProgress:{
		marginTop:"30vh"
	},
	emptyList:{
		width:"100%",
		display:"flex",
		justifyContent:"center",
	},
	emptyListText:{
		color:grey[600],
		[theme.breakpoints.down('sm')]: {
			fontSize:"1em"
		},
	},
	titleList:{
		color:grey[700],
		[theme.breakpoints.down('sm')]: {
			fontSize:"1.25em"
		},
	}

}));

export default function AlignItemsList(props) {
	const classes = useStyles();
	const { users } = props
	const { loading } = useSelector((state) => state.users) 
	
	return (
		<>
			{loading === "idle"?
				<List className={classes.root}>
					<ListItem>
					  <ListItemText
						primary={<Typography className={classes.titleList} variant="h5">Users Github</Typography>}
					  />
					</ListItem>
					<Divider variant="inset" component="li" />
					{users && typeof users.map == 'function' && users?.map((user)=>(
						<>
							<ItemList
								user={user}
							/>
							<Divider variant="inset" component="li" />
						</>
					))}
					{!users?.length?
						<ListItem>
						  <ListItemText
							primary={
								 <div className={classes.emptyList}>
									<Typography className={classes.emptyListText} variant="h5">
										There are no users
									</Typography>
								 </div>
							}
						  />
						</ListItem>
					:null}
					<ListItem>
						<PaginationList />
					</ListItem>
				</List>
				:
				<LinearProgress className={classes.linearProgress} />
			}
		</>
	);
}

const ItemList = ({ user })=>{
	
	const [userData,setUserData] = useState(false)
	const [load,setLoad] = useState(false)
	const [err,setErr] = useState(false)
	const { page, result } = useSelector((state) => state.users) 
	const classes = useStyles();
	const handleUserData = ()=>{
		usersAPI.getUser({id:user.login,page,result }).then(userResponse=>{
			console.log("userResponse")
			console.log(userResponse)
			setUserData(userResponse)
			setLoad(true)
		}).catch(err=>{
			setLoad(true)
			setErr(true)
		})
	}
	const history = useHistory()
	const toUser = ()=>{
		history.push({
			pathname: '/user',
			state: { 
				user:user.login,
				userData 
			},
		})
	}
	useEffect(()=>{
		/*setTimeout(()=>{
			setUserData({
				name:"Anthony Martinez",
				location:"Caracas Venezuela",
				avatar_url: "https://avatars.githubusercontent.com/u/1825798?v=4",
			})
		},1000)*/
		handleUserData()
	},[])
	return(
		<ListItem alignItems="flex-start">
			<ListItemAvatar>
				<Avatar alt="Remy Sharp" src={user.avatar_url} />
			</ListItemAvatar>
			<ListItemText
				primary={user.login}
				secondary={
					<React.Fragment>
						<Typography
							component="span"
							variant="body2"
							className={classes.inline}
							color="textPrimary"
						>
							{userData.name}
						</Typography>
						{userData?" - ":""}{userData.location}
						{err && !userData?"User data not found":""}
					</React.Fragment>
				}
			/>
			<ListItemSecondaryAction>
				{load?
					<IconButton disabled={err}  onClick={toUser}>
						<ChevronRightIcon />
					</IconButton>
				:
					<CircularProgress />
				}
			</ListItemSecondaryAction>
		</ListItem>
	)

}
