import * as types from '../actions/types';
import { AnalyzeImageAction } from '../actions';

export interface AnalyzeImageState {
  loading: boolean;
  results: any;
}

const initialState: Readonly<AnalyzeImageState> = {
  loading: false,
  results: {}
};

export default (state: AnalyzeImageState = initialState, action: AnalyzeImageAction): AnalyzeImageState => {
  switch (action.type) {
    case types.ANALYZE_IMAGE_START:
      return {...state, loading: true};
    case types.ANALYZE_IMAGE_SUCCESS:
      return {...state, results: action.payload, loading: false};
    case types.ANALYZE_IMAGE_FAILED:
      return {...state, loading: false};
    default:
      return state;
  }
}