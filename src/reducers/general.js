const initialState = {
    pages: [
        {title: 'books', link: "/books"},
        {title: 'authors', link: "/authors"},
        {title: 'members', link: "/members"},
    ]
}

const generalReducer = (state = initialState, action) => {
    switch(action.type) {
        default:
            return state
    }
}

export default generalReducer