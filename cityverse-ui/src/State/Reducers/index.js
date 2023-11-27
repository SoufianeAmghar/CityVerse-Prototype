import { combineReducers } from "redux";
import PricingInputsReducer from "./ProportionnalReducers/PricingInputsReducers/PricingInputsReducer";
import PremiumReducer from "./ProportionnalReducers/PricingInputsReducers/PremiumReducer";
import DeductionReducer from "./ProportionnalReducers/PricingInputsReducers/DeductionReducer";
import PcInfoReducer from "./ProportionnalReducers/PricingInputsReducers/PcInfoReducer";
import SlidingScaleCommissionReducer from "./ProportionnalReducers/PricingInputsReducers/SlidingScaleCommissionReducer";
import FinalNetPremiumReducer from "./ProportionnalReducers/PricingInputsReducers/FinalNetPremiumReducer";

import LossParticipationClauseReducer from "./ProportionnalReducers/NonCatElementReducers/LossParticipationClauseReducer";
import AttritionInputsReducer from "./ProportionnalReducers/NonCatElementReducers/AttritionInputsReducer";
import LargeLossInputReducer from "./ProportionnalReducers/NonCatElementReducers/LargeLossInputReducer";
import TotalsReducer from "./ProportionnalReducers/NonCatElementReducers/TotalsReducer";
import AttritionOutputReducer from "./ProportionnalReducers/NonCatElementReducers/AttritionOutputReducer";
import LossCapClauseReducer from "./ProportionnalReducers/NonCatElementReducers/LossCapClause";
import LossContributionReducer from "./ProportionnalReducers/NonCatElementReducers/LossContribution";
import AttritionOutputs from "./ProportionnalReducers/NonCatElementReducers/AttritionOutputs";
import LargeLossOutputs from "./ProportionnalReducers/NonCatElementReducers/LargeLossOutput";
import CommentAccountReducer from "./ProportionnalReducers/CatElementReducers/CommentAccount"

import ModelledAEPsReducer from "./ProportionnalReducers/CatElementReducers/ModelledAEPsReducer";
import CatPricingReducer from "./ProportionnalReducers/CatElementReducers/CatPricingReducer";
import CatCurveReducer from "./ProportionnalReducers/CatElementReducers/CatCurveReducer";
import CatLossesReducer from "./ProportionnalReducers/CatLosses/catLosses"
import YltRmsReducer from "./ProportionnalReducers/Yltrms/Yltrms"
import OutWardsRefactorReducer from "./ProportionnalReducers/Outwardsrefactors/OutwardsRefactore";

import ResultsReducer from "./ProportionnalReducers/ResultReducers/ResultsReducer";
import RatioReducer from "./ProportionnalReducers/ResultReducers/RatioReducer";
import ImpactofOutwardsRIReducer from "./ProportionnalReducers/ResultReducers/ImpactofOutwardsRIReducer";
import ChartReducer from "./ProportionnalReducers/ResultReducers/ChartReducer";
import InfoInputsReducer from "./NPQuoteReducers/InfoReducers/InfoInputsReducer";
import EpiReducer from "./NPQuoteReducers/EpiReducers/EpiReducer";
import TrancheReducer from "./NPQuoteReducers/InfoReducers/TrancheReducer";
import Sinistres from "./NPQuoteReducers/SinistresReducer/Sinistres";
import CourbeReducer from "./NPQuoteReducers/CourbeExpoReducers/CourbeReducer";
import Indices from "./NPQuoteReducers/IndicesReducer/Indices";
import Simufast from "./NPQuoteReducers/SimufastReducer/Simufast";
import StateSinistreReducer from "./NPQuoteReducers/ModeleNbSin/StateSinistreReducer";
import HistogrammeReducer from "./NPQuoteReducers/ModeleNbSin/HistogrammeReducer";
import Param from "./NPQuoteReducers/ParamReducer/Param";
import ChartModeleCoutReducer from "./NPQuoteReducers/ModeleCout/ChartModeleCoutReducer";
import ModeleCout from "./NPQuoteReducers/ModeleCout/ModeleCout";
import BurningCost from "./NPQuoteReducers/BurningCostReducer/BurningCost";
import ModeleReducer from "./NPQuoteReducers/ModeleNbSin/ModeleReducer";
import ParametresNbSinReducer from "./NPQuoteReducers/ModeleNbSin/ParametresNbSinReducer";
import ExpoReducer from "./NPQuoteReducers/ExpoQuoteReducer/ExpoReducer";
import Simulation from "./NPQuoteReducers/SimulationReducer/Simulation";
import GrapheReducer from "./NPQuoteReducers/SimulationReducer/GrapheReducer";
import SimulationReducer from "./NPQuoteReducers/SimulationReducer/Simulation";
import QuantilleReducer from "./NPQuoteReducers/SimulationReducer/QuantilleReducer";

import InfoInputsReducerRC from "./RCQuoteReducers/InfoReducers/InfoInputsReducerRC";
import TrancheReducerRc from "./RCQuoteReducers/InfoReducers/TrancheReducerRc";
import EpiReducerRC from "./RCQuoteReducers/EpiReducers/EpiReducerRC";
import SimulationReducerRC from "./RCQuoteReducers/SimulationReducer/Simulation";
import QuantilleReducerRC from "./RCQuoteReducers/SimulationReducer/QuantilleReducer";
import GrapheReducerRC from "./RCQuoteReducers/SimulationReducer/GrapheReducer";
import RetourGrapheReducer from "./RCQuoteReducers/SimulationReducer/RetourGrapheReducer";
import BurningCostRC from "./RCQuoteReducers/BurningCostReducer/BurningCostRC";
import StateSinistreReducerRC from "./RCQuoteReducers/ModeleNbSinReducers/StateSinistreReducerRC";
import HistogrammeReducerRC from "./RCQuoteReducers/ModeleNbSinReducers/HistogrammeReducerRC";
import ModeleReducerRC from "./RCQuoteReducers/ModeleNbSinReducers/ModeleReducerRC";
import ParametresNbSinReducerRC from "./RCQuoteReducers/ModeleNbSinReducers/ParametresNbSinReducerRC";
import ChartModeleCoutReducerRC from "./RCQuoteReducers/ModeleCout/ChartModeleCoutReducer";
import ModeleCoutRC from "./RCQuoteReducers/ModeleCout/ModeleCout";
import IndiceRcReducer from "./RCQuoteReducers/IndiceRcReducer/IndiceRcReducer"
import idReducersRC from './RCQuoteReducers/idRcReducer/idReducersRC'

/**SL QUOTE */
import TrancheReducerSL from './SLQuoteReducers/infoReducers/TrancheReducerSL'
import InfoInputsReducerSL from './SLQuoteReducers/infoReducers/InfoInputsReducer'
import BurningCostSL from './SLQuoteReducers/BurningCostReducers/BurningCost'
import HistogrammeReducerSL from './SLQuoteReducers/Modele/ModeleSLReducer'
import SimulationReducerSL from './SLQuoteReducers/Simulation/SimulationSL'
import  QuantilleReducerSL from './SLQuoteReducers/Simulation/QuantilleReducerSL'
import  GrapheReducerSL from "./SLQuoteReducers/Simulation/GrapheReducerSL"
import ModeleCatReducerSL from './SLQuoteReducers/ModeleCat/ModeleCatReducer'
import ModeleNonCatReducerSL from './SLQuoteReducers/ModeleNonCat/ModeleNonCatReducer'
import idReducersSL from './SLQuoteReducers/IdReducersSL'
import IndicesSL from './SLQuoteReducers/IndicesSL'
import EpiLossStatReducer from './SLQuoteReducers/EpiLossStat/EpiLossStatReducer'

//Xs Cat
import RpMultiPerilsReducer from './XSCat/NonModelled/RpMultiPerilsReducer'

import ProgrammeReducer from './ProgrammeReducer'
import VersionsReducer  from './VersionsReducer'
import TreatyReducer from './TreatyReducer'
import  OutilReducer from './OutilReducer'
import ParamReducer from './Params'
import FirstAuthReducer from './FirstAuthReducer'
import ExchangeReducer from "./ExchangeReducer";
import OutilTreatyReducer from "./OutilTreatyReducer";
import EquationReducer from "./EquationReducer";
import RecapReducer from "./RecapReducer";


import  riskReducer from "./xsr/riskSummary";

const allReducers = combineReducers({
  EquationReducer,
  FirstAuthReducer,
  ExchangeReducer,
  OutilTreatyReducer,
  RecapReducer,
  
  /*** Programmes */
  ProgrammeReducer,
  VersionsReducer,
  TreatyReducer,
  OutilReducer,
  ParamReducer,

  /***********Outils  *************/
  /** Proportionnal **/
  PricingInputsReducer,
  PremiumReducer,
  DeductionReducer,
  PcInfoReducer,
  SlidingScaleCommissionReducer,
  FinalNetPremiumReducer,

  LossParticipationClauseReducer,
  AttritionInputsReducer,
  AttritionOutputReducer,
  LargeLossInputReducer,
  LossCapClauseReducer,
  LossContributionReducer,
  AttritionOutputs,
  TotalsReducer,
  LargeLossOutputs,
 

  ModelledAEPsReducer,
  CatPricingReducer,
  CommentAccountReducer,
  CatCurveReducer,
  CatLossesReducer,
  OutWardsRefactorReducer,



  YltRmsReducer,

  ResultsReducer,
  RatioReducer,
  ImpactofOutwardsRIReducer,
  ChartReducer,

  /** NPQUOTE */
  InfoInputsReducer,
  EpiReducer,
  TrancheReducer,
  Sinistres,
  CourbeReducer,
  Indices,
  Simufast,
  StateSinistreReducer,
  HistogrammeReducer,
  Param,
  ChartModeleCoutReducer,
  ModeleCout,
  BurningCost,
  ModeleReducer,
  ParametresNbSinReducer,
  ExpoReducer,
  Simulation,
  GrapheReducer,
  QuantilleReducer,
  SimulationReducer,

  /**RCQuote */
  InfoInputsReducerRC,
  TrancheReducerRc,
  EpiReducerRC,
  SimulationReducerRC,
  QuantilleReducerRC,
  GrapheReducerRC,
  RetourGrapheReducer,
  BurningCostRC,
  StateSinistreReducerRC,
  HistogrammeReducerRC,
  ModeleReducerRC,
  ParametresNbSinReducerRC,
  ChartModeleCoutReducerRC,
  ModeleCoutRC,
  IndiceRcReducer,
  idReducersRC,

  /**SL QUOTE */
  TrancheReducerSL,
  InfoInputsReducerSL,
  BurningCostSL,
  HistogrammeReducerSL,
  SimulationReducerSL,
  QuantilleReducerSL,
  GrapheReducerSL, 
  ModeleCatReducerSL,
  ModeleNonCatReducerSL,
  idReducersSL,
  IndicesSL,
  EpiLossStatReducer,

  /* Xs Cat */
  RpMultiPerilsReducer,


  riskReducer,
});

export default (state, action) => {
  if (action.type === "RESET") {
    state = undefined;
  }
  return allReducers(state, action);
};
