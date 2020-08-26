import React, { Component } from 'react'
import {InputGroup ,FormControl, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import DisplayMovies from './DisplayMovies';
import axios from 'axios';
import Loading from '../loading.gif'

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
                    <h4 style={{}}>Results for "{keyword}"</h4>
                    <ul>
                    {
                        movies.map(movie => {
                            return(
                                <DisplayMovies movie={movie}/>
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

    render(){

        return (
            <div>
                <div className="searchContainer">
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

                        <h4>Nominations</h4>
                        {
                        
                            // !(this.props.mainPageState.nominations.length) ? (
                            //     <p>No nominations added. Please search for a movie and add them.</p>
                            // ):(
                            //     this.renderNominations()
                            // )
                        }
                    
                    </div>


                </div>
                
                

                {this.state.error && <h3 className="message">{this.state.error}</h3> }

                <img  src={Loading} className={`loading ${this.state.isLoading ? 'show' : 'hide' }`}  alt="loading"/>
                   
            </div>

                
        );
        
    }
}

export default SearchBar;

