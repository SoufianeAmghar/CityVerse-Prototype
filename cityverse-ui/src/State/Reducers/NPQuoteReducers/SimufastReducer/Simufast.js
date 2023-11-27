const initState = {
  idSimufast: "",
  gestion_sum: null,
  courtage_sum: null,
  ecart_type_sum: null,
  autres_chargements_sum: null,

  nb_annees_sum: null,
  seed_sum: null,
  sortie_donnes_sum: null,
  fichier_sortie_sum: null,

  loi_cout: "Poisson",
  parametre_loi_cout_1: null,
  parametre_loi_cout_2: null,
  seuil_cout: null,
  max_cout: null,

  loi_nombres: "Poisson",
  parametre_loi_nomb_1: null,
  parametre_loi_nomb_2: null,

  simufastTranche: [{
}],

  simifastTarification: [],
};

const Simufast = (state = initState, action) => {
  switch (action.type) {
    case "idSimufast":
      return {
        ...state,
        idSimufast: action.idSimufast,
      };
    case "gestion_sum":
      return {
        ...state,
        gestion_sum: action.gestion_sum,
      };
    case "courtage_sum":
      return {
        ...state,
        courtage_sum: action.courtage_sum,
      };
    case "ecart_type_sum":
      return {
        ...state,
        ecart_type_sum: action.ecart_type_sum,
      };
    case "autres_chargements_sum":
      return {
        ...state,
        autres_chargements_sum: action.autres_chargements_sum,
      };
    case "nb_annees_sum":
      return {
        ...state,
        nb_annees_sum: action.nb_annees_sum,
      };
    case "seed_sum":
      return {
        ...state,
        seed_sum: action.seed_sum,
      };
    case "sortie_donnes_sum":
      return {
        ...state,
        sortie_donnes_sum: action.sortie_donnes_sum,
      };
    case "fichier_sortie_sum":
      return {
        ...state,
        fichier_sortie_sum: action.fichier_sortie_sum,
      };
    case "loi_cout":
      return {
        ...state,
        loi_cout: action.loi_cout,
      };
    case "parametre_loi_cout_1":
      return {
        ...state,
        parametre_loi_cout_1: action.parametre_loi_cout_1,
      };
    case "parametre_loi_cout_2":
      return {
        ...state,
        parametre_loi_cout_2: action.parametre_loi_cout_2,
      };
    case "seuil_cout":
      return {
        ...state,
        seuil_cout: action.seuil_cout,
      };
    case "max_cout":
      return {
        ...state,
        max_cout: action.max_cout,
      };
    case "loi_nombres":
      return {
        ...state,
        loi_nombres: action.loi_nombres,
      };
    case "parametre_loi_nomb_1":
      return {
        ...state,
        parametre_loi_nomb_1: action.parametre_loi_nomb_1,
      };
    case "parametre_loi_nomb_2":
      return {
        ...state,
        parametre_loi_nomb_2: action.parametre_loi_nomb_2,
      };
    case "simufastTranche":
      return {
        ...state,
        simufastTranche: action.simufastTranche,
      };
    case "simufastTarification":
      return {
        ...state,
        simufastTarification: action.simufastTarification,
      };
    case 'reset':
        return initState;
    default:
      return state;
  }
};

export default Simufast;
