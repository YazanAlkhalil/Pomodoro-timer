const ADD= 'ADD';

const addQuote = (q,a) => {
    return{
        type: ADD,
        payload: {
            quote: q,
            author: a
        }
    }
}

export default addQuote;