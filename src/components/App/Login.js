import React, {Component,} from 'react';
import {connect} from "react-redux";
import {Grid, Card, CardContent, Button, CardActions, TextField, CardHeader} from '@material-ui/core';
import {bindActionCreators} from "redux";
import {loginUser} from "../../actions/sessionActions";

class Login extends Component {

    constructor(props)
    {
        super(props);

        this.state = {
            email: '',
            password: ''
        };

        this.onTextChange = this.onTextChange.bind(this);
        this.loginUser = this.loginUser.bind(this);
    }

    onTextChange(event)
    {
        const state = this.state;

        state[event.target.name] = event.target.value;

        this.setState(state);
    }

    loginUser()
    {
        this.props.actions.loginUser({
            email: this.state.email,
            password: this.state.password
        })
    }

    render() {

        return <div className='container' style={{paddingTop: '200px'}}>
            <Grid container spacing={16} justify="center">
                <Grid item xs={3}>
                    <Card>
                        <CardContent>
                            <CardHeader title='Login'/>
                            <TextField
                                margin="normal"
                                fullWidth={true}
                                name='email'
                                onChange={this.onTextChange}
                                label="Email"
                            />
                            <TextField
                                margin="normal"
                                fullWidth={true}
                                label="Password"
                                type="password"
                                name='password'
                                onChange={this.onTextChange}
                            />
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" color="primary" size='large' fullWidth={true} onClick={this.loginUser} >
                                Login
                            </Button>
                        </CardActions>
                    </Card>
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
        actions: bindActionCreators({loginUser}, dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);