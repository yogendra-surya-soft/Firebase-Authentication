import LocalizedStrings from 'react-localization';

const AuthMessages = new LocalizedStrings({
    en: {
        signIn: 'Sign In',
        signUp: 'Sign Up',
        signOut: 'Sign Out',
        email: 'Email',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        errorMailFormat: 'Email must have @ and .',
        errorPasswordLength: 'Passwords must have atleast 8 characters',
        errorPasswordMatch: 'Passwords do not match',
        signUpMessage: 'Create a new Account? Sign Up',
        signInMessage: 'Already have an account? Sign in'
    }
});

export default AuthMessages;
