import React, { useEffect } from 'react' 
import '@fontsource/roboto'
import Navbar from './navbar'
import Container from './container'
import { theme } from '../styles/theme'
import { makeStyles } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/core/styles'
import { createTheme } from '@material-ui/core/styles'

export default function Layout (props){
	
	return (
		<ThemeProvider theme={createTheme(theme)}>
			<Navbar />
			<Container>{props.children}</Container>
		</ThemeProvider>
	)
}
