import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  paper: {
    margin: theme.spacing(8, 8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  margin:{
    margin: theme.spacing(4, 4),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  btn:{
    borderRadius:'0',
    width:'50%',
    height: '3.5rem',
    marginTop:4,
    textTransform:'capitalize',
  }
}));
export default useStyles;