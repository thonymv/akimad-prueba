import { blue, lightBlue, green, deepPurple, grey , red, blueGrey, pink } from '@material-ui/core/colors'

const primaryPurple = {
	light:deepPurple[300],
	main:deepPurple[300],
	dark:deepPurple[500],
}

const danger = {
	light:red[700],
	main:red[800],
	dark:red[900],
}


const success = {
	light:green.A400,
	main:green[800],
	dark:green[900],
	contrastText:"#fff",
}

const primaryBlue = {
	light:lightBlue[600],
	main:lightBlue[600],
	dark:lightBlue[800],
	contrastText:"#fff",
}



const lineColor = grey[200]

/*-----------------------------------theme secondary-----------------------------------------------------------*/
const labelColor = grey[200]


const secondary = {
	light:blueGrey[50],
	main:"#fff",
	contrastText:grey[600],
}

const info = {
	light:pink['A200'],
	main:pink['A400'],
	dark:"#eb0052",
	contrastText:"#fff",
}



const breakpoints = {
	values: {
		xs: 0,
		sm: 450,
		md: 600,
		lg: 960,
		xl: 1280
	},
}

const theme = {
	palette: {
		primary: primaryPurple,
		secondary,
		error:danger,
		success,
		info
	},
	breakpoints:breakpoints,
	labelColor,
	lineColor
}

export { theme }
