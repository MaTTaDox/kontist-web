import React, {Component,} from 'react';
import {connect} from "react-redux";
import {Grid, Card, CardContent, Button, CardActions, TextField, CardHeader, Typography, Divider} from '@material-ui/core';
import {bindActionCreators, compose} from "redux";
import {loginUser, resetLogin} from "../../actions/sessionActions";
import background from '../../images/banking.jpg';
import {translate, Trans} from "react-i18next";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

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

        return <div className='container login' style={{backgroundImage: `url(${background})`}}>
            <Grid container spacing={16} justify="center">
                <Grid item xs={5}>
                    <form onSubmit={this.loginUser}>
                        <Card>
                            <CardHeader title={this.props.t('app.title')}/>
                            <CardContent>
                                {message}
                                <TextField
                                    margin="normal"
                                    fullWidth={true}
                                    name='email'
                                    value={this.state.email}
                                    onChange={this.onTextChange}
                                    label={this.props.t('app.email')}
                                />
                                <TextField
                                    margin="normal"
                                    fullWidth={true}
                                    value={this.state.password}
                                    label={this.props.t('app.password')}
                                    type="password"
                                    name='password'
                                    onChange={this.onTextChange}
                                />
                                <Button type='submit' variant="contained" color="primary" size='large' fullWidth={true}
                                        onClick={this.loginUser} disabled={this.props.auth.isFetching}>
                                    {this.props.t('app.login')}
                                </Button>
                                <Divider style={{margin: '20px 0'}}/>
                                <Typography variant='subtitle1' align='center' color='textSecondary'>
                                    <Trans i18nKey={'app.loginMessage'}>
                                        Webinterface für <a className='link' href='https://kontist.com' target='_blank'>Kontist</a>
                                    </Trans>
                                </Typography>
                                <div className='center'>
                                    <Button component='a'  href='https://github.com/mattadox/kontist-web' target='_blank'>
                                        <FontAwesomeIcon icon={['fab', 'github']}/>&nbsp;{this.props.t('app.github')}
                                    </Button>
                                    <Button component='a'  href='https://twitter.com/mattadoxx' target='_blank'>
                                        <FontAwesomeIcon icon={['fab', 'twitter']}/>&nbsp;{this.props.t('app.twitter')}
                                    </Button>
                                </div>
                            </CardContent>
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