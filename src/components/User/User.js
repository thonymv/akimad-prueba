import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles'
import Layout from '../layout'
const useStyles = makeStyles((theme) => ({
	root: {
		width:"100%",
	},
}));
	

const User = (props) => {	

	const classes = useStyles();

	return(
		<Layout>
			<div className={classes.root}>
				User Component
			</div>
		</Layout>
	)
};

User.propTypes = {};

User.defaultProps = {};

export default User;
