import React, {Component, Fragment,} from 'react';
import {connect} from "react-redux";
import {Grid, CircularProgress} from '@material-ui/core';
import {logoutUser} from "../../actions/sessionActions";
import {bindActionCreators, compose} from "redux";
import Navigation from "../Navigation/Navigation";
import {fetchUser} from "../../actions/userActions";
import {Route, Switch} from 'react-router';
import NoMatch from "../NoMatch/NoMatch";
import Overview from "../Overview/Overview";
import {translate} from "react-i18next";
import Account from "../Account/Account";
import Transfer from "../Transfer/Transfer";

class App extends Component {

    componentDidMount() {
        this.props.actions.fetchUser();
    }

    render() {

        const match = this.props.match;

        const user = this.props.user;
        if (!user.user || user.isFetching) {
            return <div className='container center' style={{paddingTop: 150}}>
                <CircularProgress size={200}/>
            </div>
        }

        return <Fragment>
            <Navigation/>
            <div className='container'>
                <Grid container spacing={16}>
                    <Grid item xs={12}>
                        <Switch>
                            <Route path={match.url + 'account'} component={Account}/>
                            <Route path={match.url + 'transfer'} component={Transfer}/>
                            <Route path={match.url} exact component={Overview}/>
                            <Route component={NoMatch}/>
                        </Switch>
                    </Grid>
                </Grid>
            </div>
        </Fragment>;
    }
}

function mapStateToProps(state) {

    const {user} = state;

    return {user}
}

const mapDispatchToProps = (dispatch) => {

    return {
        actions: bindActionCreators({logoutUser, fetchUser}, dispatch),
    }
};

export default compose(
    translate(),
    connect(mapStateToProps, mapDispatchToProps))(App);