import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles'
import Layout from '../layout'
import { useLocation } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import FolderIcon from '@material-ui/icons/Folder'
import { grey } from '@material-ui/core/colors'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import IconButton from '@material-ui/core/IconButton'
import { useHistory } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
	root: {
		width:"100%",
		paddingTop:"4em",
		paddingBottom:"4em",
		display:"flex",
		alignItems:"center",
		flexDirection:"column",
		position:"relative",
		borderRadius:"2em",
	},
	img:{
		width:"10em",
		borderRadius:"100%",
		zIndex:1
	},
	background:{
		position:"absolute",
		borderRadius:"2em 2em 0em 0em",
		top:0,
		backgroundColor:theme.palette.secondary.main,
		width:"100%",
		height:"9em",
		zIndex:0
	},
	user:{
		paddingTop:"10px",
		paddingBottom:"10px",
		[theme.breakpoints.down('sm')]: {
			fontSize:"2em"
		},
	},
	list:{
		width:"100%"
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
	data:{
		'& span':{
			color:grey[600]
		},
		[theme.breakpoints.down('sm')]: {
			fontSize:"1em"
		},
	},
	backButton:{
		position:"absolute",
		top:20,
		left:20,
		zIndex:1,
		color:theme.palette.secondary.contrastText
	},
	titleList:{
		color:grey[700],
		[theme.breakpoints.down('sm')]: {
			fontSize:"1.25em"
		},
	}
}));
	

const User = (props) => {	

	const classes = useStyles();
	const location = useLocation()
	const history = useHistory()
	
	return(
		<Layout>
			<Paper className={classes.root}>
				<IconButton
					onClick={()=>{
						history.push("/akimad-prueba")
					}}
					className={classes.backButton}
				>
					<ArrowBackIosIcon />
				</IconButton>
				<div className={classes.background} />
				<img className={classes.img} src={location.state.userData.avatar_url} alt="avatar" />
				<Typography variant="h3" className={classes.user}>
					{location.state.user}
				</Typography>
				<Typography variant="h6" className={classes.data}>
					{location.state.userData.name}{" - "}<span>{location.state.userData.location}</span>
				</Typography>
				<List className={classes.list} >
					<ListItem>
					  <ListItemText
						primary={<Typography className={classes.titleList} variant="h5">Organizations</Typography>}
					  />
					</ListItem>
					{location.state.userData.org?.map(org=>
						<ListItem>
							<ListItemIcon>
								<Avatar alt="Remy Sharp" src={org.avatar_url} />
							</ListItemIcon>
							<ListItemText
								primary={org.login}
								secondary={org.description ? org.description : null}
							/>
						</ListItem>,
					)}
					{!location.state.userData.org || !location.state.userData.org.length?
						<ListItem>
						  <ListItemText
							primary={
								 <div className={classes.emptyList}>
									<Typography className={classes.emptyListText} variant="h5">
										There are no organizations
									</Typography>
								 </div>
							}
						  />
						</ListItem>
						:null
					}
            	</List>
				<List className={classes.list} >
					<ListItem>
					  <ListItemText
						primary={<Typography className={classes.titleList} variant="h5">Repositories</Typography>}
					  />
					</ListItem>
					{location.state.userData.repo?.map(repo=>
						<ListItem>
							<ListItemIcon>
								<Avatar alt="Remy Sharp" src={repo.owner.avatar_url} />
							</ListItemIcon>
							<ListItemText
								primary={repo.name}
								secondary={repo.description ? repo.description : null}
							/>
						</ListItem>,
					)}
					{!location.state.userData.repo || !location.state.userData.repo.length?
						<ListItem>
						  <ListItemText
							primary={
								 <div className={classes.emptyList}>
									<Typography className={classes.emptyListText} variant="h5">
										There are no repositories
									</Typography>
								 </div>
							}
						  />
						</ListItem>
						:null
					}
            	</List>
			</Paper>
		</Layout>
	)
};

User.propTypes = {};

User.defaultProps = {};

export default User;
