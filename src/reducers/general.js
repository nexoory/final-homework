const initialState = {
    pages: [
        {name: 'books', link: "/books"},
        {name: 'authors', link: "/authors"},
        {name: 'members', link: "/members"},
    ]
}

const generalReducer = (state = initialState, action) => {
    switch(action.type) {
        default:
            return state
    }
}

export default generalReducer