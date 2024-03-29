/*
 *
 *  University di Pisa - Master's Degree in Computer Science and Networking
 *
 *  Final Project for the course of Peer to Peer Systems and Blockchains
 *
 *  Teacher: Prof. Laura Ricci
 *
 *  Candidate: Orlando Leombruni, matricola 475727
 *
 *  File: TransactionConfirmation.js
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import BN from 'bn.js';
import {
    withStyles,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from '@material-ui/core';
import { prettifyWei } from "../Utils";
import { TransactionConfirmationStyle as styles } from "../styles/MaterialCustomStyles";

/*
 * TransactionConfirmation Class
 *
 * A React Component that shows to the user a dialog window that contains information about the transaction
 * they're going to perform: estimated gas cost, estimated transaction cost and current account balance.
 * The user can then choose to perform or decline the transaction.
 */
class TransactionConfirmation extends React.Component {

    render() {
        const { classes, gas, gasPrice, balance, ok, cancel } = this.props;
        const valid = gas * gasPrice < balance;
        return (
            <Dialog
                open={true}
                keepMounted
                onBackdropClick={cancel}
                onEscapeKeyDown={cancel} >
                <DialogTitle>{valid ? "Perform the transaction?" : "Insufficient funds"}</DialogTitle>
                <DialogContent>
                        <ul>
                            <li><DialogContentText>Estimated gas is {gas}</DialogContentText></li>
                            <li><DialogContentText>Estimated transation cost is {prettifyWei(new BN(gasPrice).mul(new BN(gas)).toString())}</DialogContentText></li>
                            {valid ?
                                <li><DialogContentText>Account balance is {prettifyWei(balance)}</DialogContentText></li>:
                                <li><DialogContentText>Insufficient funds in the account ({prettifyWei(balance)})</DialogContentText></li>}
                        </ul>
                </DialogContent>
                <DialogActions>
                    <Button color={"primary"} disabled={!valid} className={classes.buttonOk} onClick={ok}>Ok</Button>
                    <Button color={"inherit"} className={classes.buttonNo} onClick={cancel}>Cancel</Button>
                </DialogActions>
            </Dialog>
        );
    }

}

TransactionConfirmation.propTypes = {
    classes: PropTypes.object.isRequired,
    gas: PropTypes.string.isRequired,
    gasPrice: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired,
    ok: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
};

export default withStyles(styles)(TransactionConfirmation);