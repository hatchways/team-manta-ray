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
		display: 'flex',
		justifyContent: 'flex-end',
	},
	btn: {
		padding: theme.spacing(1, 4),
		borderRadius: '0',
		marginLeft: theme.spacing(3),
		textTransform: 'capitalize',
	},
	txt: {
		fontWeight: '400',
		lineHeight: theme.spacing(0.3),
	},
	link: {
		textDecoration: 'none',
	},
}));

export default useStyles;
