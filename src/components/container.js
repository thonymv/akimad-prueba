import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'

Container.propTypes = {
	lightBackground: PropTypes.bool,
	paddingVertical: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
		PropTypes.bool
	])
}

function Container(props){

	const classes = useStyles();
	const classBackground = typeof props.lightBackground === 'undefined'?classes.lightBackground:classes.mainBackground
	
	return (
		<div 
			ref={props.reference} 
			style={props.paddingVertical?
				{
					paddingTop:props.paddingVertical,
					paddingBottom:props.paddingVertical
				}
				:
				{}
			}
			className={`${classes.root} ${classBackground}`}
		>
			<div className={`${classes.container} ${props.paddingVertical?"":classes.padding}`}>
				{props.children}
			</div>
		</div>
	)

}

const useStyles = makeStyles((theme) => ({
	root: {
		width:"100%",
		display:"flex",
		justifyContent:"center",
	},
	lightBackground:{
		backgroundColor:theme.palette.secondary.light,
	},
	mainBackground:{
		backgroundColor:theme.palette.secondary.main,
	},
	padding:{
		paddingTop:"5em",
		paddingBottom:"5em",
		[theme.breakpoints.down('xs')]: {
			paddingLeft:'5vw',
			paddingRight:'5vw',
			paddingTop:"3em",
			paddingBottom:"3em",
		},
		[theme.breakpoints.up('sm')]: {
			paddingLeft:theme.spacing(5),
			paddingRight:theme.spacing(5),
			paddingTop:"3em",
			paddingBottom:"3em",
		},
	},
	container:{
		width:"100%",
		maxWidth:"1400px",
		position:"relative",
		overflow:"hidden",
		[theme.breakpoints.down('xs')]: {
			paddingLeft:'5vw',
			paddingRight:'5vw',
		},
		[theme.breakpoints.up('sm')]: {
			paddingLeft:theme.spacing(5),
			paddingRight:theme.spacing(5),
		},
		[theme.breakpoints.up('md')]: {
			paddingLeft:theme.spacing(5),
			paddingRight:theme.spacing(5),
		},
		[theme.breakpoints.up('lg')]: {
			paddingLeft:theme.spacing(10),
			paddingRight:theme.spacing(10),
		},
		[theme.breakpoints.up('xl')]: {
			paddingLeft:theme.spacing(15),
			paddingRight:theme.spacing(15),
		},

	},
}));

export default Container
