const initState = {
  stat_sinistres: 2,
  nsin: 0,
  start: 2020,
  end: 2020,
  min: 0,
  max: 0,

  e_seuil: 5000,
  e_nsin: 0,
  e_moy: 0,
  e_stdev: 0,
  e_max: 0,

  p_seuil: 5000,
  p_nsin: 0,
  p_prob: 0,
  p_alpha_mx: 0,
  p_alpha_manuel: 0,
  p_pas_alpha: 0,

  l_seuil: 5000,
  l_nsin: 0,
  l_prob: 0,
  l_moy: 0,
  l_stdev: 0,
  l_moy_manuel: 0,
  l_stdev_manuel: 0,
  l_pas_moy: 0,
  l_pas_stdev: 0,
};

const ModeleCoutRC = (state = initState, action) => {
  switch (action.type) {
    case "stat_sinistres":
      return {
        ...state,
        stat_sinistres: action.stat_sinistres,
      };
    case "nsin":
      return {
        ...state,
        nsin: action.nsin,
      };
    case "start":
      return {
        ...state,
        start: action.start,
      };
    case "end":
      return {
        ...state,
        end: action.end,
      };
    case "min":
      return {
        ...state,
        min: action.min,
      };
    case "max":
      return {
        ...state,
        max: action.max,
      };
    case "e_seuil":
      return {
        ...state,
        e_seuil: action.e_seuil,
      };
    case "p_seuil":
      return {
        ...state,
        p_seuil: action.p_seuil,
      };
    case "p_alpha_manuel":
      return {
        ...state,
        p_alpha_manuel: action.p_alpha_manuel,
      };
    case "p_pas_alpha":
      return {
        ...state,
        p_pas_alpha: action.p_pas_alpha,
      };
    case "l_seuil":
      return {
        ...state,
        l_seuil: action.l_seuil,
      };
    case "l_moy_manuel":
      return {
        ...state,
        l_moy_manuel: action.l_moy_manuel,
      };
    case "l_stdev_manuel":
      return {
        ...state,
        l_stdev_manuel: action.l_stdev_manuel,
      };
    case "l_pas_moy":
      return {
        ...state,
        l_pas_moy: action.l_pas_moy,
      };
    case "l_pas_stdev":
      return {
        ...state,
        l_pas_stdev: action.l_pas_stdev,
      };
    default:
      return state;
  }
};

export default ModeleCoutRC;
