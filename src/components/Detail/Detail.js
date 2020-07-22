import React from "react"
import "./Detail.scss"
import Container from "../Container/Container";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";

const Detail = props => {

    const {page, entity, book, author, member} = props
    const detail = {
        title: '',
        info: '',
        additional: ''
    }
    if(entity === 'book') {
        detail.title = book.title
        detail.info = book.info

        let authorName = "Loading..."
        let memberName = 'Loading...'

        if(author) {authorName = `${author.firstName} ${author.lastName}`}
        if(member) {
            memberName = `${member.firstName} ${member.lastName}`
        } else {
            memberName = "Now nobody uses the book and it is available"
        }

        detail.additional = (
            <>
                <Container.Item heading={'author'}>{authorName}</Container.Item>
                <Container.Item heading={'Current user'}>{memberName}</Container.Item>
            </>
        )
    }

    return (
        <main className={entity}>
            <Breadcrumbs page={page} title={detail.title}/>
            <Container.Item heading={entity}>
                <div className="detail">
                    <h1 className="detail__title">{detail.title}</h1>
                    <div className="detail__info">{detail.info}</div>
                </div>
            </Container.Item>
            {detail.additional}
        </main>
    )
}

export default Detail
