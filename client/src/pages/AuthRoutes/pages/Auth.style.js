import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100vh',
	},
	paper: {
		margin: theme.spacing(3, 8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
	},
	margin: {
		margin: theme.spacing(4, 4),
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(2),
	},
	btn: {
		borderRadius: '0',
		width: '50%',
		height: theme.spacing(7),
		marginTop: theme.spacing(3),
		textTransform: 'capitalize',
	},
}));
export default useStyles;
