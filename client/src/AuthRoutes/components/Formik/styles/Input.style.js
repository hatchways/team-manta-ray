import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	formGroup: {
		marginBottom: 20,
	},
	label: {
		fontWeight: 900,
		fontSize: 12,
	},
	input: {
		margin: '3px 0',
		borderRadius: '0',
	},
}));

export default useStyles;
