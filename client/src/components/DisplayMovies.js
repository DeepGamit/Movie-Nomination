import React, { Component } from 'react';
import { addNomination } from '../actions/addNomination';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';


class DisplayMovies extends Component{

    handleOnClick = (event) =>{
        this.props.addNomination(this.props.movie);
    }

    render(){

        return(
        <div className="displayMovie">
            <li>{this.props.movie.Title}{" ("+this.props.movie.Year+")"}</li>&nbsp;&nbsp;&nbsp;
            {
                (this.props.pageState.nominations.find(movie => { return movie.imdbID === this.props.movie.imdbID}) === undefined) ? 
                (
                    <Button variant="light" size="sm" onClick={this.handleOnClick}>Nominate</Button>
                ):
                (
                    <Button variant="light" size="sm" disabled>Nominate</Button>
                )
            }    
        </div>
        )
    }
}

const mapStateToProps = (state) => ({
    pageState : state.pageState
})

export default connect(mapStateToProps, {addNomination})(DisplayMovies);