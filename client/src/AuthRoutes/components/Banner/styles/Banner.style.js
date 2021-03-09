import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	image: {
		backgroundImage: 'url(/images/banner.png)',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	},
	content: {
		color: '#fff',
		margin: theme.spacing(4, 4),
		fontSize: '2rem',
		display: 'flex',
		justifyContent: 'flex-end',
	},
	btn: {
		padding: '0.7rem 2rem',
		borderRadius: '0',
		marginLeft: '1.5rem',
		textTransform: 'capitalize',
	},
	txt: {
		lineHeight: '3rem',
		fontWeight: '400',
	},
	link: {
		textDecoration: 'none',
	},
}));

export default useStyles;
