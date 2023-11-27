const initState = {
    idProgramme: null,
    programs: [],

    updatedProgram: [],

};

const ProgrammeReducer = (state = initState, action) => {
    switch (action.type) {
        case "programs":
            return {
                ...state,
                programs: action.programs,
            };
        case "idProgramme":
            return {
                ...state,
                idProgramme: action.idProgramme,
            }
        case "updatedProgram":
            return {
                ...state,
                updatedProgram: action.updatedProgram,
            }
        default:
            return state;
    }
};

export default ProgrammeReducer;
