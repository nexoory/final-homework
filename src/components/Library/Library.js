import React from "react";
import Container from "../Container/Container";
import List from "../List/List";

const Library = props => {
    const {page, books, authors} = props
    const listToWork = props[page].list

    let list = listToWork.map(item => {

        let title, subTitle, info, subInfo, status, link

        switch (page) {
            case "books":

                subTitle = "Loading..."
                if(authors.list !== null) {
                    const {firstName, lastName} = authors.list[authors.idToIndex[item.authorId]]
                    subTitle = `${firstName} ${lastName}`
                }

                title = item.title
                info = item.info
                subInfo = ''
                status = item.userId === null ? "Available" : "Not available"
                link = `/${page}/${item.id}`
                break;
            case "authors":

                let authorBooks = ["Loading..."]
                if(books.list !== null) {
                    authorBooks = item.books.map(book => {
                        return books.list[books.idToIndex[book.id]].title
                    })
                }

                title = `${item.firstName} ${item.lastName}`
                subTitle = new Date(item.birthday).toLocaleDateString()
                info = item.info
                subInfo = `Books: ${authorBooks.join(' | ')}`
                status = ''
                link = false
                break;
            case "members":

                let memberBooks = ["Loading..."]
                if(books.list !== null) {
                    memberBooks = item.books.map(book => {
                        return books.list[books.idToIndex[book.id]].title
                    })
                }

                title = `${item.firstName} ${item.lastName}`
                subTitle = `${item.email} | ${item.phone}`
                info = ''
                subInfo = `Books: ${memberBooks.length ? memberBooks.join(' | ') : "none"}`
                status = ''
                link = `/${page}/${item.id}`
                break;
            default:
                title = ''
                subTitle = ''
                info = ''
                subInfo = ''
                status = ''
                link = false
        }

        return {
            key: item.id,
            title: title,
            subTitle: subTitle,
            info: info,
            subInfo: subInfo,
            status: status,
            link: link
        }
    })

    return (
        <Container.Item>
            <main className="library">
                <List list={list}/>
            </main>
        </Container.Item>
    )
}

export default Library