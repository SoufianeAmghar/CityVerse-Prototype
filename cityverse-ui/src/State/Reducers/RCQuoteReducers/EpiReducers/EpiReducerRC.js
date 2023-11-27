const initState = {
  deviceRC: "DMA",
  uniteRC: 1,
  indiceActualisationRC: "Morocco CPI WB",
  indiceExpoRC: "EPI",
  dataEpiRC: [
  {
    annee: 2012,
    epi: 200549679,
    nb_polices: 0,
  },
  {
    annee: 2013,
    epi: 247657253,
    nb_polices: 0,
  },
  {
    annee: 2014,
    epi: 206655573,
    nb_polices: 0,
  },
  {
    annee: 2015,
    epi: 238765272,
    nb_polices: 0,
  },
  {
    annee: 2016,
    epi: 252384774,
    nb_polices: 0,
  },
  {
    annee: 2017,
    epi: 258227312,
    nb_polices: 0,
  },
  {
    annee: 2018,
    epi: 278143342,
    nb_polices: 0,
  },
  {
    annee: 2019,
    epi: 293031458,
    nb_polices: 0,
  },
],
};

const EpiReducerRC = (state = initState, action) => {
  switch (action.type) {
    case "deviceRC":
      return {
        ...state,
        deviceRC: action.deviceRC,
      };
    case "uniteRC":
      return {
        ...state,
        uniteRC: action.uniteRC,
      };
    case "indiceActualisationRC":
      return {
        ...state,
        indiceActualisationRC: action.indiceActualisationRC,
      };
    case "indiceExpoRC":
      return {
        ...state,
        indiceExpoRC: action.indiceExpoRC,
      };
    case "dataEpiRC":
      return {
        ...state,
        dataEpiRC: action.dataEpiRC,
      };
    default:
      return state;
  }
};

export default EpiReducerRC;