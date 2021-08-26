import React , { useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import Button from '@material-ui/core/Button'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../features/users/usersSlice'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useLocation } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
	offset:{height:"10em"},
	offset2:{height:"4em"},
	title:{
		fontSize:"1.25em",
		display:"flex",
		fontWeight:"bold",
		justifyContent:"flex-end",
		[theme.breakpoints.down('xs')]: {
			fontSize:"6.25vw",
		},
	},
	iconTitle:{
		color: theme.palette.primary.light,
		marginRight:"0.25em",
		fontSize:"1.5em",
		width:"0.875em"
	},
	iconChangeColor:{
		fontSize:"1em",
		[theme.breakpoints.down('xs')]: {
			fontSize:"6.25vw",
		},
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: theme.palette.common.white,
		color:theme.palette.secondary.contrastText,
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		display:"flex",
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto',
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
	spacing:{
		flexGrow: 1,
		display:"flex",
		justifyContent:"center",
		paddingBottom:"1em",
		height:"5em",
	},
	searchButton:{
		height:"100%",
		display:"flex",
		alignItems:"center",
		paddingLeft:"1em",
		paddingRight:"1em",
		borderWidth: `0px`,
		borderLeftWidth: `1px`,
		borderStyle: `solid`,
		borderColor: `${theme.lineColor}`,
	},
	button:{
		padding:"1.5em",
		paddingLeft:"3em",
		paddingRight:"3em",
		fontSize:"0.75em",
		backgroundColor:theme.palette.info.main,
		color:theme.palette.info.contrastText,
		'&:hover':{
			backgroundColor:theme.palette.info.dark,
		},
		'&:active':{
			backgroundColor:theme.palette.info.light,
		}

	}
}))

function Navbar(props){
	const classes = useStyles();
	const { listUsers , loading, error } = useSelector((state) => state.users) 
	const dispatch = useDispatch()
	const [search, setSearch] = useState("")
	const location = useLocation()
	const handleUsers = async ()=>{
		if(loading == 'idle' && search.replace(/\s+/g, '').length ){
			try {
				await dispatch(fetchUsers(search))
				if(error == undefined){
					//toast.success("Cargado",{className:classes.toastSuccess})
				}else{
					toast.error("No se ha podido cargar",{className:classes.toastDanger})
				}
			} catch(err){
				toast.error("No se ha podido cargar",{className:classes.toastDanger})
			}
		}
	}

	return (
		<>
			<AppBar color="primary" position="fixed">
				<Toolbar>
					<Typography className={classes.title}>
						<img className={classes.iconTitle} src="/team.svg" />
						Users Github
					</Typography>
				</Toolbar>
				{location.pathname == "/"?
				<Toolbar>
					<div className={classes.spacing} >
						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>
							<InputBase
								placeholder="Search…"
								value={search}
								disabled={loading != 'idle'}
								onChange={(event)=>{setSearch(event.target.value)}}
								classes={{
									root: classes.inputRoot,
									input: classes.inputInput,
								}}
								inputProps={{ 'aria-label': 'search' }}
							/>
							<div className={classes.searchButton}>
								<Button onClick={handleUsers}  variant="contained" size="large" color="info" className={classes.button}>
									{loading == 'idle'?
										"search"
										:
										<CircularProgress color="inherit" size="1.5em" />
									}
								</Button>
							</div>
						</div>
					</div>
				</Toolbar>
				:null}
			</AppBar>
			<div className={location.pathname == "/"?classes.offset:classes.offset2} />
			<ToastContainer position="bottom-right"/>
		</>
	)

}

export default Navbar
