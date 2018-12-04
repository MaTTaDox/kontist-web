import React, {Component, Fragment,} from 'react';
import {connect} from "react-redux";
import {Grid, AppBar, IconButton, Button, Typography, Toolbar} from '@material-ui/core';
import {logoutUser} from "../../actions/sessionActions";
import {bindActionCreators} from "redux";

class App extends Component {

    render() {

        return <Fragment>
            <AppBar position="static" color='default' style={{marginBottom: 20}}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" style={{
                        flexGrow: 1,
                    }}>
                        Kontist
                    </Typography>
                    <Button color="inherit" onClick={() => this.props.actions.logoutUser()}>Logout</Button>
                </Toolbar>
            </AppBar>
            <div className='container'>
                <Grid container spacing={16}>
                    <Grid item xs={6}>
                        <Button variant="contained" color="primary">
                            Hello World
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" color="primary">
                            Hello World
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </Fragment>;
    }
}

function mapStateToProps(state) {

    const {transactions} = state;

    return {transactions}
}

const mapDispatchToProps = (dispatch) => {

    return {
        actions: bindActionCreators({logoutUser}, dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);