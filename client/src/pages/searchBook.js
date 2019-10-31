import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import SearchForm from "../components/SearchForm";
import SearchResult from "../components/SearchResult"


class SearchBook extends Component {
    //create state
    state = {
        search: "",
        books: [],
        error: "",
        message: ""
    };

    

    //function to take value of what enter in the search bar
    handleInputChange = event => {
        this.setState({ search: event.target.value })
    }

    //function to control the submit button of the search form
    handleFormSubmit = event => {
        event.preventDefault();
        // once it clicks it connects to the google book api with the search value
        API.getGoogleSearchBook(this.state.search)
            .then(res => {
                console.log("this res.data ",res.data.items)
                if (res.data.items === "error") {
                    throw new Error(res.data.items);
                }
                else {
                    // store response in a array
                    let results = res.data.items
                    //map through the array
                    results = results.map(result => {
                        //store each book information in a new object
                        result = {
                            key: result.id,
                            id: result.id,
                            title: result.volumeInfo.title,
                            author: result.volumeInfo.authors.toString(),
                            description: result.volumeInfo.description,
                            image: result.volumeInfo.imageLinks.thumbnail,
                            link: result.volumeInfo.infoLink
                        }
                        return result;
                    })
                    // reset the sate of the empty books array to the new arrays of objects with properties geting back from the response
                    this.setState({ books: results, error: "" })
                    console.log("this state", this.state);
                }
            })
            .catch(err => this.setState({ error: err.items }));
    }

    handleSavedButton = event => {
        event.preventDefault();      
        let savedBooks = this.state.books.filter(books => books.id === event.target.id)
        // alert("this is save book", savedBooks);
        API.saveBook(savedBooks)
            .then(this.setState({ message: console.log("Your book is saved", savedBooks) }))
            .catch(err => console.log(err))
    }
    render() {
        return (
            <Container fluid>
                <Jumbotron>
                    <h1 className="text-black">Find Your Favorite Books</h1>
                    <a className="text-info" href="/saved"><h4>Saved Books Page</h4></a>
                    
                </Jumbotron>
                <Container>
                    <Row>
                        <Col size="12">
                            <SearchForm
                                handleFormSubmit={this.handleFormSubmit}
                                handleInputChange={this.handleInputChange}
                            />
                        </Col>
                    </Row>
                </Container>
                <br></br>
                <Container>
                    <SearchResult books={this.state.books} handleSavedButton={this.handleSavedButton} />
                </Container>
            </Container>
        )
    }


}

export default SearchBook