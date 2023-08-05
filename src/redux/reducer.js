
const firstState={
    quote:'',
    author:''
}
const reducer = (state=firstState,action) => {
    switch(action.type){
        case "ADD":
            return{
                quote: action.payload.quote,
                author: action.payload.author
            }
        default:
            return state
    }
}


export default reducer;