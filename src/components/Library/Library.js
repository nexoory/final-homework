import React from "react";
import Container from "../Container/Container";
import List from "../List/List";
import BookInline from "../BookInline/BookInline";
import AuthorInline from "../AuthorInline/AuthorInline";
import MemberInline from "../MemberInline/MemberInline";

const Library = props => {
    const {page, books, authors, members} = props

    let list = []
    let template
    let elemClass
    let keyField

    if(page === 'books') {
        template = BookInline
        elemClass = "library__book"
        keyField = 'id'
        list = books.list.map(book => {
            let author = "Loading..."
            if(authors.list !== null) {
                const a = authors.list[authors.idToIndex[book.authorId]]
                author = `${a.firstName} ${a.lastName}`
            }
            return {
                ...book,
                author: author
            }
        })
    }

    if(page === 'authors') {
        template = AuthorInline
        elemClass = "library__author"
        keyField = 'id'
        list = authors.list.map(author => {
            let bookTitles = ["Loading..."]
            if(books.list !== null) {
                bookTitles = author.books.map(book => {
                    return books.list[books.idToIndex[book.id]].title
                })
            }
            return {
                ...author,
                bookTitles: bookTitles
            }
        })
    }

    if(page === 'members') {
        template = MemberInline
        elemClass = "library__member"
        keyField = 'id'
        list = members.list.map(member => {
            let bookTitles = ["Loading..."]
            if(books.list !== null) {
                bookTitles = member.books.map(book => {
                    return books.list[books.idToIndex[book.id]].title
                })
            }
            return {
                ...member,
                bookTitles: bookTitles
            }
        })
    }

    return (
        <Container.Item>
            <main className="library">
                <List elemClass={elemClass} keyField={keyField} list={list} template={template}/>
            </main>
        </Container.Item>
    )
}

export default Library