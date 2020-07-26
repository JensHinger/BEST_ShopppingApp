import React, { Component } from 'react';
import { Snackbar , IconButton , Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

class ErrorDialog extends Component {
    
    constructor(props){
        super(props)

        this.state = {
            open : true
        }
    }

    handleOpen = () => {
        this.setState({open : true})
    }

    handleClose = () => {
        this.props.handleErrorClose()
        this.setState({open : false})
    }

    render(){
        return(
            <div>
                <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                    }}
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    message={this.props.errorMessage}
                    action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                    }
                />
            </div>

        )
    }
}

export default ErrorDialog