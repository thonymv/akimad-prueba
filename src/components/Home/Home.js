import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles'
import Layout from '../layout'
import ListUser from '../listUser'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../../features/users/usersSlice'

const useStyles = makeStyles((theme) => ({
	root: {
		width:"100%",
	},
}));
	
const Home = (props) => {	

	const classes = useStyles();

	return(
		<Layout>
			<div className={classes.root}>
				<ListUser />
			</div>
		</Layout>
	)
};

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
