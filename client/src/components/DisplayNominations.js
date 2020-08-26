import React, { Component } from 'react';
import { Button } from 'react-bootstrap'
import { deleteNomination } from '../actions/deleteNomination'
import { connect } from 'react-redux';

class DisplayNominations extends Component{
   
    handleOnClick = (e) =>{
        this.props.deleteNomination(this.props.movie);
    }
        
    render() {
        return (
            <div className="displayNomination">
                <li>{this.props.movie.Title}{" ("+this.props.movie.Year+")"}</li>&nbsp;&nbsp;&nbsp;
                <Button variant="dark" size="sm" onClick={this.handleOnClick}>Remove</Button>          
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    pageState: state.pageState
});

export default connect(mapStateToProps,{ deleteNomination })(DisplayNominations)
