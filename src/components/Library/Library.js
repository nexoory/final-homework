import React from "react";
import Container from "../Container/Container";

const Library = props => {

    const books = props.books.map(book => {
        return (
            <div className="library__book" key={book.id}>
                <div>{book.title}</div>
                <div>{book.info}</div>
            </div>
        )
    })

    return (
        <Container.Item>
            <div className="library">
                {books}
            </div>
        </Container.Item>
    )
}

export default Library