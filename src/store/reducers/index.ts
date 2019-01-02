import { combineReducers, Reducer } from 'redux';
import AuthReducer, { AuthState } from './auth.reducer';
import AnalyzeImageReducer, { AnalyzeImageState } from './analyze-image.reducer';

export interface AppState {
  auth: AuthState,
  analyzeImage: AnalyzeImageState
}

const rootReducer: Reducer<AppState> = combineReducers<AppState>({
  auth: AuthReducer,
  analyzeImage: AnalyzeImageReducer
});

export default rootReducer;