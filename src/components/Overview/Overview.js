import React, {Component, Fragment,} from 'react';
import {connect} from 'react-redux';
import {
    Grid,
    FormControl,
    Select,
    Card,
    CardContent,
    MenuItem,
    InputLabel,
    Table,
    TableHead,
    TableRow,
    TableCell,
    Paper,
    TableBody,
    Typography,
    TextField,
    CardActions,
    Divider,
    Button
} from '@material-ui/core';
import {bindActionCreators, compose} from 'redux';
import {translate} from 'react-i18next';
import {fetchAccounts} from '../../actions/accountActions';
import {fetchTransactions} from '../../actions/transactionActions';
import moment from 'moment';
import 'moment/locale/de';

moment.locale('de');

class Overview extends Component {

    constructor(props) {
        super(props);

        this.state = {
            accountId: 0,
            selectedTransaction: null
        };

        this.onAccountChange = this.onAccountChange.bind(this);
        this.fetchTransactions = this.fetchTransactions.bind(this);
        this.closeTransaction = this.closeTransaction.bind(this);
        this.selectTransaction = this.selectTransaction.bind(this);
    }

    componentDidMount() {
        this.props.actions.fetchAccounts();
    }

    componentDidUpdate(prevProps, prevState) {

        if (this.props.accounts.accounts && this.props.accounts.accounts.length && this.state.accountId === 0) {
            const account = this.props.accounts.accounts[0];
            this.setState({accountId: account.id});

        }

        if (prevState.accountId !== this.state.accountId && this.state.accountId > 0) {
            this.fetchTransactions()
        }
    }

    onAccountChange(event) {
        this.setState({accountId: event.target.value})
    }

    fetchTransactions() {
        this.props.actions.fetchTransactions(this.state.accountId);
    }

    selectTransaction(id) {
        this.setState({
            selectedTransaction: id
        })
    }

    closeTransaction() {
        this.setState({
            selectedTransaction: null
        })
    }

    render() {

        let account = {};
        if (this.props.accounts.accounts && this.props.accounts.accounts.length && this.state.accountId > 0) {
            account = this.props.accounts.accounts.find((account) => {
                return account.id === this.state.accountId
            })
        }

        let options = [];
        if (this.props.accounts.accounts) {
            options = this.props.accounts.accounts.map((account) => {
                return <MenuItem key={account.id} value={account.id}>{account.iban}</MenuItem>
            })
        }

        let transactions = [];
        let selectedTransaction;
        if (this.props.transactions.transactions)
            transactions = this.props.transactions.transactions.results.map((transaction) => {

                let selected = false;
                if (transaction.id === this.state.selectedTransaction) {
                    selectedTransaction = transaction;
                    selected = true;
                }

                const date = moment(transaction.date);

                return <TableRow selected={selected} hover={!selected} key={transaction.id} onClick={() => {
                    this.selectTransaction(transaction.id)
                }}>
                    <TableCell>{date.format('Do MMMM YYYY')}</TableCell>
                    <TableCell>{transaction.name}</TableCell>
                    <TableCell numeric style={{
                        color: transaction.to ? 'green' : 'red'
                    }}>{ transaction.to ? '' : '- '}{transaction.amount / 100}€</TableCell>
                </TableRow>
            });

        let transactionGrid = null;
        if (selectedTransaction) {

            const date = moment(selectedTransaction.date);

            const details = [];

            details.push(<TableRow key={0}>
                <TableCell>
                    {this.props.t('app.date')}
                </TableCell>
                <TableCell>{date.format('Do MMMM YYYY')}</TableCell>
            </TableRow>);

            if (selectedTransaction.purpose) {
                details.push(<TableRow key={1}>
                    <TableCell>
                        {this.props.t('app.purpose')}
                    </TableCell>
                    <TableCell>{selectedTransaction.purpose}</TableCell>
                </TableRow>);
            }

            transactionGrid = <Grid item xs={4}>
                <Card>
                    <CardContent>
                        <Typography color='textSecondary' gutterBottom>
                            {this.props.t('app.amount')}
                        </Typography>
                        <Typography variant='h5' component='h2' numeric style={{
                            color: selectedTransaction.to ? 'green' : 'red'
                        }}>{ selectedTransaction.to ? '' : '- '}{selectedTransaction.amount / 100}€
                        </Typography>
                        <Typography color='textSecondary' gutterBottom>
                            {this.props.t('app.name')}
                        </Typography>
                        <Typography variant='h5' component='h2'>
                            {selectedTransaction.name}
                        </Typography>
                    </CardContent>
                    <Divider/>
                    <Table>
                        <TableHead>
                        </TableHead>
                        <TableBody>
                            {details}
                        </TableBody>
                    </Table>
                    <CardActions>
                        <Button size='small' onClick={() => this.closeTransaction()}>
                            {this.props.t('app.dismiss')}
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        }

        return <Fragment>
            <Card>
                <CardContent>
                    <Grid container spacing={16}>
                        <Grid item xs={6}>
                            <FormControl fullWidth={true}>
                                <InputLabel>{this.props.t('app.bankaccount')}</InputLabel>
                                <Select value={this.state.accountId} onChange={this.onAccountChange}>
                                    {options}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth={true} label={this.props.t('app.balance')}
                                       value={(account.balance ? account.balance / 100 : 0) + ' €'} InputProps={{
                                readOnly: true,
                            }}/>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Grid container spacing={16} style={{
                marginTop: '20px'
            }}>
                <Grid item xs={selectedTransaction ? 8 : 12}>
                    <Paper style={{
                        width: '100%',
                        overflowX: 'auto',
                    }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>{this.props.t('app.date')}</TableCell>
                                    <TableCell>{this.props.t('app.name')}</TableCell>
                                    <TableCell numeric>{this.props.t('app.amount')}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {transactions}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
                {transactionGrid}
            </Grid>
        </Fragment>;
    }
}

function mapStateToProps(state) {

    const {accounts, transactions} = state;

    return {accounts, transactions}
}

const mapDispatchToProps = (dispatch) => {

    return {
        actions: bindActionCreators({fetchAccounts, fetchTransactions}, dispatch),
    }
};

export default compose(
    translate(),
    connect(mapStateToProps, mapDispatchToProps))(Overview);