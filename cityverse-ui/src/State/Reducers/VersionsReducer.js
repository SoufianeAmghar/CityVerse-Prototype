const initState = {
    idVersion: null,
    versions: [],

    updatedVersion: [],

};

const VersionsReducer = (state = initState, action) => {
    switch (action.type) {
        case "versions":
            return {
                ...state,
                versions: action.versions,
            };
        case "idVersion":
            return {
                ...state,
                idVersion: action.idVersion,
            }
        case "updatedVersion":
            return {
                ...state,
                updatedVersion: action.updatedVersion,
            }
        default:
            return state;
    }
};

export default VersionsReducer;
