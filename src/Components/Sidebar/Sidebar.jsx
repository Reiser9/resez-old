import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import {makeStyles} from '@mui/styles';

import {useStyles} from '../../theme/gstyle.js';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Preloader from '../../common/Preloaders/Preloader/Preloader.jsx';
import SidebarNoAuth from './SidebarNoAuth/SidebarNoAuth.jsx';
import SidebarAuth from './SidebarAuth/SidebarAuth.jsx';
import Social from '../../common/Social/Social.jsx';

import {reqIsAuth, reqLoadAuth} from '../../redux/user-selectors.js';

const useLocalStyles = makeStyles(theme => ({
	menu: {
		width: 35,
		height: 35,
		borderRadius: '50%',
		display: 'flex',
		position: 'fixed',
		top: 10,
		left: 10,
		zIndex: 15,
		cursor: 'pointer',
		background: '#fff',
		border: '1px solid var(--mainC)',
		transition: '.2s linear',
		'&:hover': {
			background: '#e7e7e7'
		},
		'&.disable': {
			opacity: 0,
			transform: 'translateX(-30px)'
		}
	},
	close: {
		position: 'relative',
		top: 0,
		left: 0,
	},
	logoInner: {
		padding: '1rem 2rem',
		borderBottom: '15px solid #fff',
		'@media (max-width: 998px)': {
		    justifyContent: 'space-between'
		},
	},
	sidebar: {
		maxWidth: 0,
		flexShrink: 0,
		background: theme.palette.lightblue.main,
		height: '100vh',
		overflowX: 'hidden',
		overflowY: 'auto',
		transition: '.2s linear',
	    position: 'relative',
	    '@media (max-width: 998px)': {
		    position: 'absolute',
		    top: 0,
		    left: 0,
		    zIndex: 10
		},
	},
	disable: {
		opacity: 0,
		transform: 'translateX(-30px)'
	},
	active: {
		maxWidth: '320px'
	}
}));

const Sidebar = ({isAuth, loadAuth}) => {
	const gstyle = useStyles();
	const localStyle = useLocalStyles();
	const [open, setOpen] = React.useState($(window).width() < 998 ? false : true);

	const showSidebar = () => {
		setOpen(true);
	}

	const hideSidebar = () => {
		setOpen(false);
	}

	return(
		<>
			<Box className={`${gstyle.flex} ${localStyle.menu} ${open && localStyle.disable}`} onClick={showSidebar}>
				<img src="/assets/img/menu.svg" alt="Меню" className={gstyle.imgRes} />
			</Box>
			
			<Box className={`${gstyle.flexstart} ${localStyle.sidebar} ${open && localStyle.active}`}>
				{loadAuth
				? <Preloader />
				: <>
					<Box className={`${gstyle.w100} ${gstyle.flexbet} ${localStyle.logoInner} ${gstyle.sidebarComponent}`}>
					    <Typography component={Link} variant="h1" to={'/'} sx={{color: 'var(--mainC)'}}>
					        ResEz
					    </Typography>

					    <Box className={`${gstyle.flex} ${localStyle.menu} ${localStyle.close}`} onClick={hideSidebar}>
					    	<img src="/assets/img/close.svg" alt="Закрыть" className={gstyle.imgRes} />
					    </Box>
					</Box>

					{isAuth && <SidebarAuth />}

					<SidebarNoAuth />

					<Box className={`${gstyle.sidebarComponent}`} sx={{p: 2}}>
						<Social />
					</Box>
				</>}
			</Box>
		</>
	)
}

const mapStateToProps = (state) => {
	return{
		isAuth: reqIsAuth(state),
		loadAuth: reqLoadAuth(state)
	}
}

export default connect(mapStateToProps, {})(Sidebar);