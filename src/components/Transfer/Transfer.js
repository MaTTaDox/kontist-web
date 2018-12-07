import React, {Component} from 'react';
import {connect} from "react-redux";
import {
    Grid, CardContent, CircularProgress, Card, TextField,
    InputLabel, FormControl, Input, InputAdornment, CardHeader,
    Stepper, Step, StepLabel, CardActions, Button, Select, MenuItem
} from '@material-ui/core';
import {bindActionCreators, compose} from "redux";
import {translate} from "react-i18next";
import {withStyles} from "@material-ui/core/styles";
import {confirmTransfer, initTransfer} from "../../actions/transferActions";
import {fetchAccounts} from '../../actions/accountActions';

const styles = theme => ({
    wrapper: {
        margin: theme.spacing.unit,
        position: 'relative',
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
});

class Transfer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            accountId: 0,
            recipient: '',
            iban: '',
            amount: '',
            activeStep: 0,
            note: '',
            code: ''
        };
        this.onTextChange = this.onTextChange.bind(this);
        this.onAmountChange = this.onAmountChange.bind(this);
        this.onIbanChange = this.onIbanChange.bind(this);
        this.initTransfer = this.initTransfer.bind(this);
        this.confirmTransfer = this.confirmTransfer.bind(this);
        this.getCurrentStep = this.getCurrentStep.bind(this);
        this.resetTransfer = this.resetTransfer.bind(this);
    }

    componentDidMount() {
        this.props.actions.fetchAccounts();
    }

    initTransfer() {
        this.props.actions.initTransfer(
            this.state.accountId,
            {
                recipient: this.state.recipient,
                iban: this.state.iban,
                amount: Number.parseInt(this.state.amount * 100),
                note: this.state.note
            }
        );
    }

    confirmTransfer() {

        const link = this.props.initTransfer.transfer.links.self.split('/');
        const id = link[link.length -1];

        this.props.actions.confirmTransfer(
            id,
            this.state.accountId,
            {
                recipient: this.state.recipient,
                iban: this.state.iban,
                amount: Number.parseInt(this.state.amount * 100),
                note: this.state.note,
                authorizationToken: this.state.code
            }
        );
    }

    resetTransfer() {
        this.setState({
            recipient: '',
            iban: '',
            amount: '',
            activeStep: 0,
            code: ''
        })
    }

    onAmountChange(event) {
        const state = this.state;

        state[event.target.name] = event.target.value;

        this.setState(state);
    }

    onIbanChange(event) {
        const state = this.state;
        state[event.target.name] = event.target.value.replace(/ /g, '');

        this.setState(state);
    }

    onTextChange(event) {
        const state = this.state;
        state[event.target.name] = event.target.value;

        this.setState(state);
    }

    componentDidUpdate(prevProps, prevState) {

        if (this.props.accounts.accounts && this.props.accounts.accounts.length && this.state.accountId === 0) {
            const account = this.props.accounts.accounts[0];
            this.setState({accountId: account.id});
        }

        if(
            prevProps.initTransfer.isFetching === true &&
            this.props.initTransfer.isFetching === false &&
            this.props.initTransfer.success
        )
        {
            this.setState({activeStep: 1})
        }

        if(
            prevProps.confirmTransfer.isFetching === true &&
            this.props.confirmTransfer.isFetching === false &&
            this.props.confirmTransfer.success
        )
        {
            this.setState({activeStep: 2})
        }
    }

    getCurrentStep() {
        const classes = this.props.classes;

        switch (this.state.activeStep) {
            case 0:
                const transferLoading = this.props.initTransfer.isFetching;

                let options = [];
                if (this.props.accounts.accounts) {
                    options = this.props.accounts.accounts.map((account) => {
                        return <MenuItem key={account.id} value={account.id}>{account.iban}</MenuItem>
                    })
                }

                return <Card>
                    <CardContent>
                        <FormControl fullWidth={true}>
                            <InputLabel>{this.props.t('app.bankaccount')}</InputLabel>
                            <Select name='accountId' value={this.state.accountId} onChange={this.onTextChange}>
                                {options}
                            </Select>
                        </FormControl>
                        <TextField
                            margin="normal"
                            fullWidth={true}
                            name='recipient'
                            value={this.state.recipient}
                            onChange={this.onTextChange}
                            label={this.props.t('app.recipient')}
                        />
                        <TextField
                            margin="normal"
                            fullWidth={true}
                            name='iban'
                            value={this.state.iban}
                            onChange={this.onIbanChange}
                            label={this.props.t('app.iban')}
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>{this.props.t('app.amount')}</InputLabel>
                            <Input
                                name='amount'
                                type='number'
                                value={this.state.amount}
                                onChange={this.onAmountChange}
                                endAdornment={<InputAdornment position="start">€</InputAdornment>}
                            />
                        </FormControl>
                        <TextField
                            margin="normal"
                            fullWidth={true}
                            name='note'
                            value={this.state.note}
                            onChange={this.onTextChange}
                            label={this.props.t('app.note')}
                        />
                    </CardContent>
                    <CardActions className='right'>
                        <div className={classes.wrapper}>
                            <Button disabled={transferLoading || !this.state.accountId} onClick={this.initTransfer} variant="contained"
                                    color="primary" size='large'>
                                {this.props.t('app.send')}
                            </Button>
                            {transferLoading && <CircularProgress size={24} className={classes.buttonProgress}/>}
                        </div>
                    </CardActions>
                </Card>;
            case 1:

                let confirmLoading = this.props.confirmTransfer.isFetching;

                return <Card>
                    <CardContent>
                        <TextField
                            margin="normal"
                            fullWidth={true}
                            name='code'
                            value={this.state.code}
                            onChange={this.onTextChange}
                            label={this.props.t('app.code')}
                        />
                    </CardContent>
                    <CardActions className='right'>
                        <Button onClick={this.resetTransfer} variant="contained" size='large'>
                            {this.props.t('app.reset')}
                        </Button>
                        <div className={classes.wrapper}>
                            <Button disabled={confirmLoading} onClick={this.confirmTransfer} variant="contained"
                                    color="primary" size='large'>
                                {this.props.t('app.confirm')}
                            </Button>
                            {transferLoading && <CircularProgress size={24} className={classes.buttonProgress}/>}
                        </div>
                    </CardActions>
                </Card>;
            case 2:
                return <Card>
                    <CardHeader title={this.props.t('app.transferSuccess')}>
                    </CardHeader>
                    <CardActions className='center'>
                        <Button fullWidth onClick={this.resetTransfer} variant="contained" color='primary' size='large'>
                            {this.props.t('app.newTransfer')}
                        </Button>
                    </CardActions>
                </Card>
        }
    }


    render() {

        return <Grid container spacing={16}>
            <Grid item xs={12}>
                <Stepper activeStep={this.state.activeStep} style={{marginBottom: 20}}>
                    <Step key='data'>
                        <StepLabel>{this.props.t('app.data')}</StepLabel>
                    </Step>
                    <Step key='confirm'>
                        <StepLabel>{this.props.t('app.confirm')}</StepLabel>
                    </Step>
                    <Step key='overview'>
                        <StepLabel>{this.props.t('app.overview')}</StepLabel>
                    </Step>
                </Stepper>
                {this.getCurrentStep()}
            </Grid>
        </Grid>;
    }
}

function mapStateToProps(state) {

    const {accounts, initTransfer, confirmTransfer} = state;

    return {accounts, initTransfer, confirmTransfer}
}

const mapDispatchToProps = (dispatch) => {

    return {
        actions: bindActionCreators({initTransfer, confirmTransfer, fetchAccounts}, dispatch),
    }
};

export default compose(
    translate(),
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps))(Transfer);