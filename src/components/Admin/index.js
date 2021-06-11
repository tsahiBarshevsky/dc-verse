import React, { useState } from 'react';
import { Paper, Button, FormControl, Input, InputAdornment } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Background from '../../images/328974.jpg';
// import firebase from '../firebase';

const styles = theme => ({
	main: 
	{
		width: 'auto',
		height: 320,
		display: 'block',
		borderRadius: 20,
		marginLeft: theme.spacing(3),
		marginRight: theme.spacing(3),
		backgroundImage: `url(${Background})`,
		backgroundPosition: 'center', 
		backgroundRepeat: 'no-repeat',
        backgroundSize: 700,
		[theme.breakpoints.up(400 + theme.spacing(6))]: {
			width: 400,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: 
	{
		height: 320,
		borderRadius: 20,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		boxShadow: '2px 2px 5px 0px rgba(0, 0, 0, 0.5)',
		backgroundColor: 'rgba(18, 18, 18, 0.75)',
		padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
	},
	input:
	{
		backgroundColor: 'rgba(255, 255, 255, 0.65)',
        height: 40,
        borderRadius: 20
	},
	submit: 
	{
		color: 'white',
		fontSize: 17,
		textTransform: 'capitalize',
		width: 130,
		height: 40,
		border: '2px solid white',
		backgroundColor: 'transparent',
		borderRadius: '25px',
		marginTop: theme.spacing(3),
		"&:hover": 
		{
			color: 'black',
			backgroundColor: 'white'
		}
	}
});

function Admin(props) {
    
	const { classes } = props;
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	// if (firebase.getCurrentUsername())
	// {
	// 	props.history.replace('/dashboard');
	// 	return null;
	// }

	return (
		<div className="admin-container">
			<main className={classes.main}>
                <Paper className={classes.paper}>
                    <form onSubmit={e => e.preventDefault() && false}>
                        <h3>כתובת אימייל:</h3>
                        <FormControl margin="normal" required fullWidth>
                            <Input 
                                className={classes.input}
                                disableUnderline
                                id="email" name="email" 
                                autoFocus 
                                value={email} 
                                onChange={e => setEmail(e.target.value)}
                                startAdornment={<InputAdornment className="adornment" position="start" />} />
                        </FormControl>
                        <h3>סיסמה:</h3>
                        <FormControl margin="normal" required fullWidth>
                            <Input 
                                className={classes.input}
                                disableUnderline
                                name="password" id="password"
                                type={showPassword ? 'text' : 'password'} 
                                autoComplete="off" 
                                value={password} 
                                onChange={e => setPassword(e.target.value)}
                                startAdornment={<InputAdornment className="adornment" position="start" />}
                                endAdornment={
                                    <InputAdornment className="visibility" position="end"
                                        onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                    </InputAdornment>
                                } />
                        </FormControl>
                        <Button
                            type="submit"
                            // onClick={login}
                            className={classes.submit}>
                            כניסה
                        </Button>
                    </form>
                </Paper>
		    </main>
		</div>
	)

    // async function login() 
	// {
	// 	try 
	// 	{
	// 		await firebase.login(email, password);
    //         props.history.replace('/dashboard');
	// 	} 
	// 	catch(error) 
	// 	{
	// 		setOpen(true);
	// 		setError(error.message);
	// 	}
	// }
}

export default withRouter(withStyles(styles)(Admin));