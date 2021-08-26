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

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function AlignItemsList() {
	const classes = useStyles();
	const users = [
		{
			login:"mojombo",
			avatar_url:"https://avatars.githubusercontent.com/u/1?v=4",
			id:1
		},
		{
			login:"defunkt",
			avatar_url:"https://avatars.githubusercontent.com/u/2?v=4",
			id:6
		},
		{
			login:"pjhyett",
			avatar_url:"https://avatars.githubusercontent.com/u/3?v=4",
			id:5
		},
		{
			login:"wycats",
			avatar_url:"https://avatars.githubusercontent.com/u/4?v=4",
			id:4
		},
	]
	return (
		<List className={classes.root}>
			{users.map((user)=>(
				<ItemList
					user={user}
				/>
			))}
			<Divider variant="inset" component="li" />
		</List>
	);
}

const ItemList = ({user})=>{
	
	const [userData,setUserData] = useState(false)
	const classes = useStyles();
	const handleUserData = ()=>{
		usersAPI.getUser(user.id).then(userResponse=>{
			console.log("userResponse")
			console.log(userResponse)
			setUserData(userResponse)
		})
	}
	useEffect(()=>{
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
						{" - "}{userData.location}
					</React.Fragment>
				}
			/>
			<ListItemSecondaryAction>
				{userData?
					<IconButton>
						<ChevronRightIcon />
					</IconButton>
				:
					<CircularProgress />
				}
			</ListItemSecondaryAction>
		</ListItem>
	)

}
