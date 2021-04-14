import { GET_LIST_DATA , GET_LIST_DATA_LOADING , GET_LIST_DATA_ERROR } from "./listDataType"


const initialState = {
    loading : false ,
    data : [],

    countryData : [],
    isCountryDataLoading : false,

    graphData : [],
    isGraphDataLoading : false,
    isError :""
}

const listDataReducer = (state = initialState , action)=>{
    switch(action.type){
        case GET_LIST_DATA_LOADING :
            return{
                ...state,
                [action.keyName] : action.payload
            } 
        case GET_LIST_DATA :
            return{
                ...state,
                [action.keyName] : action.payload,
                isError :""
            } 
        case GET_LIST_DATA_ERROR :
            return{
                isError : action.payload,
                loading : false,
                data : []
            } 

        default :
        return state    
    }
}

export default listDataReducer