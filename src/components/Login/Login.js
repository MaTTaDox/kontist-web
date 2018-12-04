import React, {Component,} from 'react';
import {connect} from "react-redux";
import {Grid, Card, CardContent, Button, CardActions, TextField, CardHeader, Typography} from '@material-ui/core';
import {bindActionCreators, compose} from "redux";
import {loginUser, resetLogin} from "../../actions/sessionActions";
import background from '../../images/banking.jpg';
import {translate} from "react-i18next";

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };

        this.onTextChange = this.onTextChange.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.dismissMessage = this.dismissMessage.bind(this);
    }

    onTextChange(event) {
        const state = this.state;

        state[event.target.name] = event.target.value;

        this.setState(state);
    }

    loginUser(e) {
        e.preventDefault();
        this.props.actions.loginUser({
            email: this.state.email,
            password: this.state.password
        })
    }

    dismissMessage() {
        this.props.actions.resetLogin()
    }

    render() {

        let message = null;
        if (this.props.auth.errorMessage) {
            message = <Card className='error'>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Error
                    </Typography>
                    <Typography component="p">
                        {this.props.auth.errorMessage}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size='small' onClick={this.dismissMessage}>
                        {this.props.t('app.dismiss')}
                    </Button>
                </CardActions>
            </Card>
        }

        return <div className='container login' style={{backgroundImage: `url(${background})`}} >
            <Grid container spacing={16} justify="center">
                <Grid item xs={3}>
                    <form onSubmit={this.loginUser}>
                        <Card>
                            <CardHeader title={this.props.t('app.loginTitle')}/>
                            <CardContent>
                                {message}
                                <TextField
                                    margin="normal"
                                    fullWidth={true}
                                    name='email'
                                    onChange={this.onTextChange}
                                    label={this.props.t('app.email')}
                                />
                                <TextField
                                    margin="normal"
                                    fullWidth={true}
                                    label={this.props.t('app.password')}
                                    type="password"
                                    name='password'
                                    onChange={this.onTextChange}
                                />
                            </CardContent>
                            <CardActions>
                                <Button type='submit' variant="contained" color="primary" size='large' fullWidth={true}
                                        onClick={this.loginUser} disabled={this.props.auth.isFetching}>
                                    {this.props.t('app.login')}
                                </Button>
                            </CardActions>
                        </Card>
                    </form>
                </Grid>
            </Grid>
        </div>;
    }
}

function mapStateToProps(state) {

    const {auth} = state;

    return {auth}
}

const mapDispatchToProps = (dispatch) => {

    return {
        actions: bindActionCreators({loginUser, resetLogin}, dispatch),
    }
};

export default compose(
    translate(),
    connect(mapStateToProps, mapDispatchToProps))(Login);