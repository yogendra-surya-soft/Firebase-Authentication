import React, { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { History } from 'history';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { login } from '../EmailAuth/index';
import AuthMessages from '../Localization';
import { setCurrentUser } from '../actions';

interface LoginProps {
    history: History;
    setCurrentUser: Function;
}
interface LoginState {
    email: string;
    password: string;
    error: string;
    loading: boolean;
}

class Login extends React.Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: '',
            loading: false
        };
    }

    componentWillUnmount() {
        this.setState({ email: '', password: '', loading: false, error: '' });
    }

    validateSignIn = async (e: FormEvent) => {
        e.preventDefault();
        this.setState({ error: '' });
        const { email, password } = this.state;
        const { history, setCurrentUser: setUser } = this.props;

        if (!email.includes('@') || !email.includes('.')) {
            this.setState({ error: AuthMessages.errorMailFormat });
            return;
        }
        if (password.length < 8) {
            this.setState({ error: AuthMessages.errorPasswordLength });
            return;
        }

        try {
            this.setState({ loading: true });
            const response = await login(email, password);

            setUser(response);
            history.push('/');

            this.setState({ email: '', password: '', loading: false });
        } catch (err) {
            this.setState({ error: err.message, loading: false });
        }
    };

    render() {
        const { error, email, password, loading } = this.state;
        return (
            <>
                <Container
                    component="main"
                    maxWidth="xs"
                    style={{ display: 'flex', alignItems: 'center', height: '100vh' }}>
                    <div>
                        <Typography component="h1" variant="h5">
                            {AuthMessages.signIn}
                        </Typography>
                        <form noValidate>
                            <Typography color="error" component="h5">
                                {error}
                            </Typography>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label={AuthMessages.email}
                                name="email"
                                autoComplete="off"
                                onChange={(e) => {
                                    this.setState({ email: e.target.value });
                                }}
                                value={email}
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label={AuthMessages.password}
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => {
                                    this.setState({ password: e.target.value });
                                }}
                                autoComplete="off"
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={(e) => this.validateSignIn(e)}
                                disabled={loading}>
                                {AuthMessages.signIn}
                            </Button>
                            <Grid container>
                                <Grid item xs />
                                <Grid item>
                                    <Typography component="h5">
                                        <Link to="/register">{AuthMessages.signUpMessage}</Link>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                    <Box mt={8} />
                </Container>
            </>
        );
    }
}

export default connect(null, { setCurrentUser })(Login);
