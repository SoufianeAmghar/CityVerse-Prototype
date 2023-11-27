const initState = {
  CalculatedSlidingCommission: 0,
  SlidingCommission: 0,
  Min: 0,
  Max: 0,
  Pas: 0,
  loss_list: [],
}

const SlidingScaleCommissionReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CalculatedSlidingCommission':
      return {
        ...state,
        CalculatedSlidingCommission: action.CalculatedSlidingCommission,
      }
    case 'SlidingCommission':
      return {
        ...state,
        SlidingCommission: action.SlidingCommission,
      }
    case 'Min':
      return {
        ...state,
        Min: action.Min,
      }
    case 'Max':
      return {
        ...state,
        Max: action.Max,
      }
    case 'Pas':
      return {
        ...state,
        Pas: action.Pas,
      }

    case 'loss_list':
      return {
        ...state,
        loss_list: action.loss_list,
      }
    default:
      return state
  }
}

export default SlidingScaleCommissionReducer
