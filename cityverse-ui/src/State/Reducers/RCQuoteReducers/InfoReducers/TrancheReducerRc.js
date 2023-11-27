const initState = {
  dataTrancheRC: [
    {
      nom: "A PRO",
      code_scr: "MA0002",
      epi: 0,
      garantie: 47500000,
      priorite: 12500000,
      aad: 0,
      aal: 0,
      num_rec: 2,
      pourcent_tx_rec: "100;100",
    },
  ],
  idTrancheRC: null,
  TrancheResultatInfoRC: [],
};

const TrancheReducerRc = (state = initState, action) => {
  switch (action.type) {
    case "dataTrancheRC":
      return {
        ...state,
        dataTrancheRC: action.dataTrancheRC,
      };
    case "TrancheResultatInfoRC":
      return {
        ...state,
        TrancheResultatInfoRC: action.TrancheResultatInfoRC,
      };
    case "idTrancheRC":
      return {
        ...state,
        idTrancheRC: action.idTrancheRC,
      };
    default:
      return state;
  }
};

export default TrancheReducerRc;