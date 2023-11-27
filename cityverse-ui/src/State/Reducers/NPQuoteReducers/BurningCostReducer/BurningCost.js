const initState = {
  idBcost: null,
  tranchesBcostNP: [],
  courtageBcost: 0,
  gestionBcost: 10,
  ecart_typeBcost: 20,
  autre_chargementBcost: 0,
  selectedTrancheBcost: 1,
  histo_bcost: [],

  b_chargements: 0,
  b_taux_moyen: 0,
  b_rapport_tx: 0,
  b_type_historique: "Indexe",
  b_erreur: 0,
  b_min_tx: 0,
  b_max_tx: 0,

  /** resultat burning cost */
  moy_bcost_index: 0.00,
  moy_bcost_obs: 0.00,
  prime_tranche_index: 0,
  prime_tranche_obs: 0,
  reduc_prime_rec_index: 0.00,
  reduc_prime_rec_obs: 0.00,
  rol_chargmnt_index: 0,
  rol_chargmnt_obs: 0,
  taux_chargmnt_index: 0.00,
  taux_chargmnt_obs: 0.00,
  ecart_type_bcost_index: 0.00,
  ecart_type_bcost_obs: 0.00,

  /**Autre info */
  annee_ignor: 0,
  duree_stat: "",
  sin_max_index: 0,
  sin_max_reel: 0,
  unused_cover_index: "",
  unused_cover_reel: "",

  /** Tableau rol */
  TarifDataRol: []
};

const BurningCost = (state = initState, action) => {
  switch (action.type) {
    case "b_min_tx":
      return {
        ...state,
        b_min_tx: action.b_min_tx,
      };
    case "idBcost":
      return {
        ...state,
        idBcost: action.idBcost,
      }
    case "b_max_tx":
      return {
        ...state,
        b_max_tx: action.b_max_tx,
      };
    case "annee_ignor":
      return {
        ...state,
        annee_ignor: action.annee_ignor,
      };
    case "histo_bcost":
      return {
        ...state,
        histo_bcost: action.histo_bcost,
      };
    case "duree_stat":
      return {
        ...state,
        duree_stat: action.duree_stat,
      };
    case "sin_max_index":
      return {
        ...state,
        sin_max_index: action.sin_max_index,
      };
    case "sin_max_reel":
      return {
        ...state,
        sin_max_reel: action.sin_max_reel,
      };
    case "unused_cover_index":
      return {
        ...state,
        unused_cover_index: action.unused_cover_index,
      };
    case "unused_cover_reel":
      return {
        ...state,
        unused_cover_reel: action.unused_cover_reel,
      };
    case "moy_bcost_index":
      return {
        ...state,
        moy_bcost_index: action.moy_bcost_index,
      };
    case "moy_bcost_obs":
      return {
        ...state,
        moy_bcost_obs: action.moy_bcost_obs,
      };
    case "prime_tranche_index":
      return {
        ...state,
        prime_tranche_index: action.prime_tranche_index,
      };
    case "prime_tranche_obs":
      return {
        ...state,
        prime_tranche_obs: action.prime_tranche_obs,
      };
    case "reduc_prime_rec_index":
      return {
        ...state,
        reduc_prime_rec_index: action.reduc_prime_rec_index,
      };
    case "reduc_prime_rec_obs":
      return {
        ...state,
        reduc_prime_rec_obs: action.reduc_prime_rec_obs,
      };
    case "rol_chargmnt_index":
      return {
        ...state,
        rol_chargmnt_index: action.rol_chargmnt_index,
      };
    case "rol_chargmnt_obs":
      return {
        ...state,
        rol_chargmnt_obs: action.rol_chargmnt_obs,
      };
    case "taux_chargmnt_index":
      return {
        ...state,
        taux_chargmnt_index: action.taux_chargmnt_index,
      };
    case "taux_chargmnt_obs":
      return {
        ...state,
        taux_chargmnt_obs: action.taux_chargmnt_obs,
      };
    case "ecart_type_bcost_index":
      return {
        ...state,
        ecart_type_bcost_index: action.ecart_type_bcost_index,
      };
    case "ecart_type_bcost_obs":
      return {
        ...state,
        ecart_type_bcost_obs: action.ecart_type_bcost_obs,
      };
    case "tranchesBcostNP":
      return {
        ...state,
        tranchesBcostNP: action.tranchesBcostNP,
      };
    case "courtageBcost":
      return {
        ...state,
        courtageBcost: action.courtageBcost,
      };
    case "gestionBcost":
      return {
        ...state,
        gestionBcost: action.gestionBcost,
      };
    case "ecart_typeBcost":
      return {
        ...state,
        ecart_typeBcost: action.ecart_typeBcost,
      };
    case "autre_chargementBcost":
      return {
        ...state,
        autre_chargementBcost: action.autre_chargementBcost,
      };
    case "selectedTrancheBcost":
      return {
        ...state,
        selectedTrancheBcost: action.selectedTrancheBcost,
      };
    case "b_chargements":
      return {
        ...state,
        b_chargements: action.b_chargements,
      };
    case "b_taux_moyen":
      return {
        ...state,
        b_taux_moyen: action.b_taux_moyen,
      };
    case "b_rapport_tx":
      return {
        ...state,
        b_rapport_tx: action.b_rapport_tx,
      };
    case "b_type_historique":
      return {
        ...state,
        b_type_historique: action.b_type_historique,
      };
    case "b_erreur":
      return {
        ...state,
        b_erreur: action.b_erreur,
      };
    case "TarifDataRol":
      return {
        ...state,
        TarifDataRol: action.TarifDataRol,
      }
    case 'reset':
        return initState;
    default:
      return state;
  }
};

export default BurningCost;
