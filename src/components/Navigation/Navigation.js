import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {Link} from 'react-router-dom'
import {compose} from 'redux';
import {
    AppBar,
    Button,
    Typography,
    Toolbar,
    List,
    Divider,
    ListItem,
    ListItemIcon,
    ListItemText,
    Drawer,
    IconButton,
    ClickAwayListener
} from '@material-ui/core';
import {logoutUser} from "../../actions/sessionActions";
import {bindActionCreators} from "redux";
import MenuIcon from '@material-ui/icons/Menu';
import CompareArrows from '@material-ui/icons/CompareArrows';
import AccountCircle from '@material-ui/icons/AccountCircle';
import BankIcon from '@material-ui/icons/AccountBalance';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {withStyles} from '@material-ui/core/styles';
import {translate} from "react-i18next";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const drawerWidth = 240;

const styles = theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }
});

class Navigation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false
        };

        this.toggleDrawer = this.toggleDrawer.bind(this);
    }

    toggleDrawer(state) {
        this.setState({
            open: state,
        });
    };

    render() {
        const {classes} = this.props;

        return <Fragment>
            <AppBar position="static" color='default' style={{marginBottom: 20}}>
                <Toolbar>
                    <IconButton onClick={() => {
                        this.toggleDrawer(true)
                    }} style={{
                        marginLeft: -12,
                        marginRight: 20,
                    }} color="inherit" aria-label="Menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" color="inherit" style={{
                        flexGrow: 1,
                    }}>
                        {this.props.t('app.title')}
                    </Typography>
                    <Button color="inherit" onClick={() => this.props.actions.logoutUser()}>{this.props.t('app.logout')}</Button>
                </Toolbar>
            </AppBar>
            <ClickAwayListener onClickAway={() => this.toggleDrawer(false)}>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={this.state.open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={() => this.toggleDrawer(false)}>
                            <ChevronLeftIcon/>
                        </IconButton>
                    </div>
                    <Divider/>
                    <List onClick={() => this.toggleDrawer(false)}>
                        <ListItem button key='overview' component={Link} to="/">
                            <ListItemIcon><BankIcon/></ListItemIcon>
                            <ListItemText primary={this.props.t('app.overview')} />
                        </ListItem>
                        <ListItem button key='account' component={Link} to="/account">
                            <ListItemIcon><AccountCircle/></ListItemIcon>
                            <ListItemText primary={this.props.t('app.account')}/>
                        </ListItem>
                        <ListItem button key='transfer' component={Link} to="/transfer">
                            <ListItemIcon><CompareArrows/></ListItemIcon>
                            <ListItemText primary={this.props.t('app.transfer')}/>
                        </ListItem>
                    </List>
                    <Divider/>
                    <List onClick={() => this.toggleDrawer(false)}>
                        <ListItem button key='github' target='_blank' component={'a'} href="http://github.com/mattadox/kontist-web">
                            <ListItemIcon><FontAwesomeIcon  icon={['fab', 'github']} /></ListItemIcon>
                            <ListItemText primary={this.props.t('app.github')}/>
                        </ListItem>
                    </List>
                </Drawer>
            </ClickAwayListener>
        </Fragment>
            ;
    }
}

function mapStateToProps(state) {
    return {}
}

const mapDispatchToProps = (dispatch) => {

    return {
        actions: bindActionCreators({logoutUser}, dispatch),
    }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    translate(),
    withStyles(styles))(Navigation);