const initState = {
  dataTrancheSL: [
    {
      nom: "A PRO",
      code_scr: "MA0002",
      epi: 0,
      garantie: 47500000,
      priorite: 12500000,
    },
  ],
  TrancheResultatInfoSL: [],
};

const TrancheReducerSL = (state = initState, action) => {
  switch (action.type) {
    case "TrancheResultatInfoSL":
      return {
        ...state,
        TrancheResultatInfoSL: action.TrancheResultatInfoSL,
      };
    case "dataTrancheSL":
      return {
        ...state,
        dataTrancheSL: action.dataTrancheSL,
      };
    default:
      return state;
  }
};

export default TrancheReducerSL;
