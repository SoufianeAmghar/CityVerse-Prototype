const initState = {
    idOutil: "",
    countries: "6555",   
 

};

const OutilReducer = (state = initState, action) => {
    switch (action.type) {
        case "idOutil":
            return {
                ...state,
                idOutil: action.idOutil,
            }
                
        default:
            return state;
    }
};

export default OutilReducer;
