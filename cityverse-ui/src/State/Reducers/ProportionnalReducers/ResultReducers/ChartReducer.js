
const initState = {
  data : [
      { x: 17.8, "L/R Probs": 0.3, Margin: 59.7 ,courbe3: 0},
      { x: 24.1, "L/R Probs": 2.7, Margin: 52.6 ,courbe3: 0},
      { x: 30.4, "L/R Probs": 7.0, Margin: 47.1 ,courbe3: 0},
      { x: 36.8, "L/R Probs": 11.2, Margin: 41.0 ,courbe3: 0},
      { x: 43.1, "L/R Probs": 12.6, Margin: 31.1 ,courbe3: 0},
      { x: 49.4, "L/R Probs": 12.3, Margin: 27.5 ,courbe3: 0},
      { x: 55.7, "L/R Probs": 10.5, Margin: 23.0 ,courbe3: 0},
      { x: 62.1, "L/R Probs": 7.8, Margin: 13.7 ,courbe3: 0},
      { x: 68.4, "L/R Probs": 6.3, Margin: 7.8 ,courbe3: 10},
      { x: 87.4, "L/R Probs": 2.5, Margin: -10.7 ,courbe3: 0},
      { x: 112.7, "L/R Probs": 1.2, Margin: -35.4 ,courbe3: 0},
      { x: 119.0, "L/R Probs": 1.2, Margin: -43.1 ,courbe3: 0},
      { x: 125.3, "L/R Probs": 0.7, Margin: -48.2 ,courbe3: 0},
      { x: 131.6, "L/R Probs": 0.8, Margin: -56.0 ,courbe3: 0},
      { x: 144.3, "L/R Probs": 0.5, Margin: -68.7 ,courbe3: 0},
      { x: 169.6, "L/R Probs": 0.5, Margin: -92.5 ,courbe3: 0},
      { x: 194.9, "L/R Probs": 0.3, Margin: -119.9 ,courbe3: 0},
  ],
  courbe1:[],
  courbe2: [],
  };

const ChartReducer = (state = initState, action) => {
    switch (action.type) {
        case "data" : 
        return{
          ...state,
          data: action.data,
        }
        case "courbe1" : 
        return{
          ...state,
          courbe1: action.courbe1,
        }
        case "courbe2" : 
        return{
          ...state,
          courbe2: action.courbe2,
        }
        case "courbe3" : 
        return{
          ...state,
          courbe3: action.courbe3,
        }
        default:
          return state;
      }
}

export default ChartReducer