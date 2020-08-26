import React, { Component } from 'react'


class DisplayMovies extends Component{
    render(){
        return(
        <div>
            <li>{this.props.movie.Title}{" ("+this.props.movie.Year+")"}</li>&nbsp;
        </div>
        )
    }
}

export default DisplayMovies;