import React, {Component, Fragment,} from 'react';
import {connect} from "react-redux";
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
    TableBody
} from '@material-ui/core';
import {bindActionCreators, compose} from "redux";
import {translate} from "react-i18next";
import {fetchAccounts} from "../../actions/accountActions";
import {fetchTransactions} from "../../actions/transactionActions";
import moment from 'moment';
import 'moment/locale/de';

moment.locale('de');

class Account extends Component {

    constructor(props) {
        super(props);

        this.state = {
            accountId: 0
        };

        this.onAccountChange = this.onAccountChange.bind(this);
        this.fetchTransactions = this.fetchTransactions.bind(this);
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

    render() {

        let options = [];
        if (this.props.accounts.accounts) {
            options = this.props.accounts.accounts.map((account) => {
                return <MenuItem key={account.id} value={account.id}>{account.iban}</MenuItem>
            })
        }

        let transactions = [];
        if (this.props.transactions.transactions)
            transactions = this.props.transactions.transactions.results.map((transaction) => {

                const date = moment(transaction.date);

                return <TableRow hover key={transaction.id}>
                    <TableCell>{date.format('Do MMMM YYYY')}</TableCell>
                    <TableCell>{transaction.name}</TableCell>
                    <TableCell numeric style={{
                        color: transaction.to ? 'green' : 'red'
                    }}>{transaction.amount / 100}€</TableCell>
                </TableRow>
            });

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
                    </Grid>
                </CardContent>
            </Card>
            <Paper style={{
                width: '100%',
                marginTop: '20px',
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
    connect(mapStateToProps, mapDispatchToProps))(Account);