const initState = {
  idSinOrg: null,
  idSinIndexe: null,
  id_Ldf_Triangle: null,
  id_nbsin_triangle: null,
  id_extrapolation: null,
  id_modele_cout_rc: null,
  id_modele_nb_sin_rc: null,
  idEpiRC: null,
  idBcostRC: null,
  idSimulationRC: null,
};

const idReducersRC = (state = initState, action) => {
  switch (action.type) {
    case "idEpiRC":
      return {
        ...state,
        idEpiRC: action.idEpiRC,
      };
    case "idSinOrg":
      return {
        ...state,
        idSinOrg: action.idSinOrg,
      };
    case "idSinIndexe":
      return {
        ...state,
        idSinIndexe: action.idSinIndexe,
      };
    case "id_Ldf_Triangle":
      return {
        ...state,
        id_Ldf_Triangle: action.id_Ldf_Triangle,
      };
    case "id_nbsin_triangle":
      return {
        ...state,
        id_nbsin_triangle: action.id_nbsin_triangle,
      };
    case "id_extrapolation":
      return {
        ...state,
        id_extrapolation: action.id_extrapolation,
      };
    case "id_modele_cout_rc":
      return {
        ...state,
        id_modele_cout_rc: action.id_modele_cout_rc,
      };
    case "id_modele_nb_sin_rc":
      return {
        ...state,
        id_modele_nb_sin_rc: action.id_modele_nb_sin_rc,
      };
    case "idBcostRC":
      return {
        ...state,
        idBcostRC: action.idBcostRC,
      };
    case "idSimulationRC":
      return {
        ...state,
        idSimulationRC: action.idSimulationRC,
      };
    default:
      return state;
  }
};

export default idReducersRC;
