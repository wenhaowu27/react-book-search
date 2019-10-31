import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import SavedResult from "../components/SavedResult"

class SaveBook extends Component {
    state = {
        savedBooks: []
    };

    //when this component mounts, grab all books that were save to the database 
    componentDidMount() {
        API.getBooks()
            .then(res => this.setState({ savedBooks: res.data }))
            .catch(err => console.log(err))
    }

    //function to remove book by id
    handleDeleteButton = id => {
        API.deleteBook(id)
            .then(res => this.componentDidMount())
            .catch(err => console.log(err))
    }

    render() {
        return (
            <Container fluid className="container">
            <Jumbotron>
                <h1 className="text-black">Find Your Saved Books</h1>
                <a className="text-info" href="/"><h4>Search Books Page</h4></a>
            </Jumbotron>
                <Container>
                    <SavedResult savedBooks={this.state.savedBooks} handleDeleteButton={this.handleDeleteButton} />
                </Container>
            </Container>
        )
    }
}



export default SaveBook 