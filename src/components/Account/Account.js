import React, {Component, Fragment,} from 'react';
import {connect} from "react-redux";
import {Grid, CardContent, CardHeader, Card, Typography} from '@material-ui/core';
import {logoutUser} from "../../actions/sessionActions";
import {bindActionCreators, compose} from "redux";
import {fetchUser} from "../../actions/userActions";
import {translate} from "react-i18next";

class Account extends Component {

    render() {
        const user = this.props.user.user;

        let gender = '';

        if (user.gender === 'male') {
            gender = 'Herr'
        } else if (user.gender === 'female') {
            gender = 'Frau'
        }

        return <Grid container spacing={16}>
            <Grid item xs={6}>
                <Card>
                    <CardHeader title={this.props.t('app.userAccount')}/>
                    <CardContent>
                        <div className='account-group'>
                            <Typography color='textSecondary'>
                                {this.props.t('app.name')}
                            </Typography>
                            <Typography variant='title'>
                                {gender} {user.firstName} {user.lastName}
                            </Typography>
                        </div>
                        <div className='account-group'>
                            <Typography color='textSecondary' gutterBottom>
                                {this.props.t('app.email')}
                            </Typography>
                            <Typography variant='title'>
                                {user.email}
                            </Typography>
                        </div>
                        <div className='account-group'>
                            <Typography color='textSecondary' gutterBottom>
                                {this.props.t('app.companyType')}
                            </Typography>
                            <Typography variant='title'>
                                {user.companyType}
                            </Typography>
                        </div>
                        <div className='account-group'>
                            <Typography color='textSecondary' gutterBottom>
                                {this.props.t('app.economicSector')}
                            </Typography>
                            <Typography variant='title'>
                                {user.economicSector}
                            </Typography>
                        </div>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card>
                    <CardHeader title={this.props.t('app.cards')}/>
                    <CardContent>

                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card>
                    <CardHeader title={this.props.t('app.accounts')}/>
                    <CardContent>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>;
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
    connect(mapStateToProps, mapDispatchToProps))(Account);