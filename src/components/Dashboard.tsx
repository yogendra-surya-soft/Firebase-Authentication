import { History } from 'history';
import React from 'react';
import { connect } from 'react-redux';
import { UserData, setCurrentUser } from '../actions';
import { signOut } from '../EmailAuth';
import { StoreState } from '../reducers';

interface DashboardProps {
    history: History;
    currentUser: UserData | null;
    setCurrentUser: Function;
}

function Dashboard(props: DashboardProps) {
    const { history, currentUser, setCurrentUser: setUser } = props;

    const signOutUser = async () => {
        await signOut();
        setUser();
    };

    if (!currentUser) {
        history.push('/login');
        return <div />;
    }
    if (!currentUser.user.emailVerified) {
        return (
            <>
                <div>Please Verify Your Email Address</div>
                <button type="button" onClick={signOutUser}>
                    Sign Out
                </button>
            </>
        );
    }
    return (
        <>
            <div>{currentUser.user.email}</div>
            <button type="button" onClick={signOutUser}>
                Sign Out
            </button>
        </>
    );
}

const mapStateToProps = ({ currentUser }: StoreState): { currentUser: UserData | null } => {
    return { currentUser };
};

export default connect(mapStateToProps, { setCurrentUser })(Dashboard);
