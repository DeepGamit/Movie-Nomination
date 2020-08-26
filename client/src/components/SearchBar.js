import React, { Component } from 'react'
import {InputGroup ,FormControl, Form, Alert} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import DisplayMovies from './DisplayMovies';
import axios from 'axios';
import Loading from '../loading.gif'
import { connect } from 'react-redux';
import DisplayNominations from './DisplayNominations';

class SearchBar extends Component{

    constructor(props){
        super(props);
            this.state = {
                movies: [],
                error: '',
                keyword: '',
                isLoading : false,
                showAlert: false
            }

        
    }

    handleOnChange = (event) => {
        const input = event.target.value

        if(input === ""){

            this.setState({
                keyword: input,
                movies : [],
                error: '',
                isLoading: false,
            });

        } else {

            this.setState({
                keyword: input,
                isLoading: true,
                error: ''},
                () =>{
                    this.fetchMovies(input);
            });


        }
        
    }

    fetchMovies = (keyword) => {

        const url = `https://www.omdbapi.com/?s=${keyword}&apikey=4646bbea`;

        axios.get(url)
        .then(response => {

            console.log(response);
            if(response.data.Response === "True"){
                this.setState({ 
                    movies: response.data.Search,
                    error: '',
                    isLoading: false
                });  
                
            } else {
                this.setState({ 
                    movies: [],
                    error: response.data.Error,
                    isLoading: false
                });
            }
            
        })
        .catch(error => {
            console.log(error);
        });
        

    }

    handleOnSubmit = (event) => {

        event.preventDefault();
        
    }

    renderResult = () => {
        
        const {movies,keyword, error} = this.state;
        if(movies !== undefined){

            return(
                <div className="resultContainer">
                    <h3>Results for "{keyword}"</h3>
                    <ul>
                    {
                        movies.map(movie => {
                            return(
                                <React.Fragment key={movie.imdbID}>
                                    <DisplayMovies movie={movie}/>
                                </React.Fragment>
                            )
                        })
                    }
                    </ul>

                   
                </div>
            )

        } 

        if(error === "Too many results."){
            return(
                <img  src={Loading} alt="loader"/>
            )
        }

    }

    renderNomination = () =>{
        const { nominations } = this.props.pageState
        if(nominations !== undefined){
            return(
                <div>
                    <ul>
                        {nominations.map( movie =>{
                            return(
                                <React.Fragment key={movie.imdbID}>
                                    <DisplayNominations movie={movie}/>
                                </React.Fragment>
                            )
                        })}
                    </ul>
                </div>
            )
        }
    }


    render(){

        return (
            <div>
                <div className="searchContainer">
                {
                    this.props.pageState.nominations.length >= 5 &&
                    <Alert variant="warning">
                        <Alert.Heading>Alert Banner</Alert.Heading>
                        <p>You have nominated 5 Movies</p>
                    </Alert>
                }

                <Form onSubmit={this.handleOnSubmit}>
                    <InputGroup className="mb-4">
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faSearch} />
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl type="text" placeholder="Movie Title" onChange={this.handleOnChange} />   
                    </InputGroup>
                </Form>

                </div>

                <div className="comboContainer">

                    {this.state.keyword !== "" && this.renderResult()}

                    <div className="nominationContainer">

                        <h3>Your Nomination List</h3>
                        {
                        
                            !(this.props.pageState.nominations.length) ? (

                                <div>

                                  <p>No movies added.</p> 
                                  <p>Please search for the movie and add to your nomination list</p>

                                </div>
                                
                            ):(
                                this.renderNomination()
                            )
                        }
                    
                    </div>


                </div>
                
                

                {this.state.error && <h3 className="message">{this.state.error}</h3> }

                <img  src={Loading} className={`loading ${this.state.isLoading ? 'show' : 'hide' }`}  alt="loading"/>
                   
            </div>

                
        );
        
    }
}

const mapStateToProps = (state) => ({
    pageState: state.pageState
});

export default connect(mapStateToProps)(SearchBar)
