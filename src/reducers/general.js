const initialState = {
    mainMenuLinks: [
        {title: 'Library', link: "/library"},
        {title: 'Authors', link: "/authors"},
        {title: 'Members', link: "/members"},
    ]
}

const generalReducer = (state = initialState, action) => {
    switch(action.type) {
        default:
            return state
    }
}

export default generalReducer