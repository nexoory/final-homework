import React, {useEffect} from "react"
import {connect} from "react-redux"
import {Redirect, useParams} from "react-router-dom"
import responder from "../utils/responder"
import Status from "../components/Status/Satatus"

import {
    updateRequest,
    updateSuccess,
    updateFailure,
    manualUpdate,
    resetErrors,
    sortDirectionChange
} from "../actions/LibraryActions";
import Library from "../components/Library/Library";
import Filter from "../components/Filter/Filter";

const LibraryContainer = props => {

    //Функции из редьюсера
    const {
        resetErrors,
        manualUpdate,
        updateRequest,
        updateSuccess,
        updateFailure,
        sortDirectionChange
    } = props
    //Флаги статуса загрузки данных
    const {updatingProcess, updatingError, listNeedToUpdate} = props.flags

    //Ошибка и ее описание, если есть
    const {error, description} = props.messages
    //Все три списка
    const {books, authors, members} = props

    //Список страниц, где ключ - страница, значение - массив с названиями списков, которые будет нужны
    const pages = {
        books: ['books', 'authors'],
        authors: ['books', 'authors'],
        members: ['books', 'members']
    }
    //Текущая страница. Этот параметр передает роутер с помощью хука useParams
    const {page} = useParams()
    //Првоеряем, относится ли текущий адрес к списку наших страниц
    const pageExist = page in pages
    //Определяем те списки, которые будут нам нужны
    const lists = pages[page]
    //Статус всех списков, загружены они или нет, чтобы не загружать по новой если они уже есть
    const listStatus = {
        books: books.list !== null,
        authors: authors.list !== null,
        members: members.list !== null
    }
    //Проверяем, пуст ли основной список для текущей страницы, на случай если список загружен, но просто пустой
    const isNull = !listStatus[page]
    const isEmpty = !isNull ? props[page].list.length === 0 : true

    //Функция загрузки данных
    async function libraryUpdate() {
        //Меняет флаг, говорящий о том, что список в данный момент обновляется
        updateRequest()

        //Узнаем, какие списки нам нужно загрузить. Для этого мы выбираем пустые списки из тех, что должны быть
        let listToUpdate = lists.filter(list => !listStatus[list]);
        //Отправляем список в специальную функцию. Она сделает по запросу на каждый элемент списка
        const response = await responder(listToUpdate)
        //Обрабатываем ответ.
        if(!response.error) {
            updateSuccess(listToUpdate, response.data)
        } else {
            updateFailure(listToUpdate, response.error, response.description)
        }
    }

    //Проверяем, нужно ли нам обновлять список
    function shouldLibraryUpdate() {
        //Существует ли страница, на которой мы в данный момент находимся?
        if(pageExist) {
            //Поднят ли флаг ручного обновления?
            if(listNeedToUpdate) {
                //Сбрасываем статус списков, чтобы обработчик считал их незагруженными
                // и разрешаем обновление
                for(let key of lists) {
                    listStatus[key] = false
                }
                return true
            } else {
                //Нельзя обновлять список если он уже обновляется или если предыдущая попытка вернула ошибку
                //иначе будет зацикливание
                if(!updatingProcess && !updatingError) {
                    //Проверяем статус каждого списка из тех, что должны быть у текущей страницы. Если хоть один из них
                    //пуст, разрешаем обновление
                    for(let key of lists) {
                        if(!listStatus[key]) {
                            return true
                        }
                    }
                }
            }
        }
        return false
    }

    useEffect(()=>{
        if(shouldLibraryUpdate()) {
            libraryUpdate()
        }
    })

    //Этот эффект сбрасывает ошибки, если страница поменялась, так как ошибки одной страницы могут быть
    //неактуальны для другой, и ее все еще можно будет отобразить.
    /* eslint-disable */
    useEffect(()=> {
        if(updatingError) {
            resetErrors()
        }
    }, [page])
    /* eslint-enable */

    if(pageExist) {
        if(updatingProcess) {
            return <Status />
        }

        if(updatingError) {
            return <Status buttonHandler={manualUpdate} status="error" heading={error} description={description}/>
        }

        if(isEmpty) {
            return <Status status="empty" buttonHandler={manualUpdate}/>
        }

        const {activeSortDirection} = props[page].options

        return (
            <>
                <Filter
                    manualUpdate={manualUpdate}
                    sortDirectionChange={() => sortDirectionChange(page)}
                    activeSortDirection={activeSortDirection}/>
                <Library page={page} books={books} authors={authors} members={members}/>
            </>
        )
    }

    return <Redirect to="/404"/>
}

const mapStateToProps = state => state.library

const mapDispatchToProps = dispatch => ({
    resetErrors: () => dispatch(resetErrors()),
    manualUpdate: () => dispatch(manualUpdate()),
    updateRequest: () => dispatch(updateRequest()),
    sortDirectionChange: (list) => dispatch(sortDirectionChange(list)),
    updateSuccess: (lists, data) => dispatch(updateSuccess(lists, data)),
    updateFailure: (page, error, description) => dispatch(updateFailure(page, error, description))
})

export default connect(mapStateToProps, mapDispatchToProps)(LibraryContainer)