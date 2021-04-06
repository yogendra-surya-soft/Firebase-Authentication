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
import { register } from '../EmailAuth/index';
import AuthMessages from '../Localization';
import { setCurrentUser } from '../actions';

interface RegisterProps {
    history: History;
    setCurrentUser: Function;
}
interface RegisterState {
    email: string;
    password: string;
    confirmPassword: string;
    error: string;
    loading: boolean;
}

class Register extends React.Component<RegisterProps, RegisterState> {
    constructor(props: RegisterProps) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            error: '',
            loading: false
        };
    }

    componentWillUnmount() {
        this.setState({
            email: '',
            password: '',
            loading: false,
            confirmPassword: '',
            error: ''
        });
    }

    validateSignUp = async (e: FormEvent) => {
        e.preventDefault();
        this.setState({ error: '' });
        const { email, password, confirmPassword } = this.state;
        const { history, setCurrentUser: setUser } = this.props;

        if (!email.includes('@') || !email.includes('.')) {
            this.setState({ error: AuthMessages.errorMailFormat });
            return;
        }
        if (password !== confirmPassword) {
            this.setState({ error: AuthMessages.errorPasswordMatch });
            return;
        }
        if (password.length < 8) {
            this.setState({ error: AuthMessages.errorPasswordLength });
            return;
        }

        try {
            this.setState({ loading: true });
            const response = await register(email, password);

            setUser(response);
            history.push('/');

            this.setState({
                email: '',
                password: '',
                confirmPassword: '',
                loading: false
            });
        } catch (err) {
            this.setState({ error: err.message, loading: false });
        }
    };

    render() {
        const { error, email, password, confirmPassword, loading } = this.state;
        return (
            <>
                <Container
                    component="main"
                    maxWidth="xs"
                    style={{ display: 'flex', alignItems: 'center', height: '100vh' }}>
                    <div>
                        <Typography component="h1" variant="h5">
                            {AuthMessages.signUp}
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
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="Confirm password"
                                label={AuthMessages.confirmPassword}
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => {
                                    this.setState({ confirmPassword: e.target.value });
                                }}
                                id="confirmPassword"
                                autoComplete="off"
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={(e) => this.validateSignUp(e)}
                                disabled={loading}>
                                {AuthMessages.signUp}
                            </Button>
                            <Grid container>
                                <Grid item xs />
                                <Grid item>
                                    <Typography component="h5">
                                        <Link to="/login">{AuthMessages.signInMessage}</Link>
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

export default connect(null, { setCurrentUser })(Register);
