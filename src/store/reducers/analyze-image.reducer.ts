import * as types from '../actions/types';
import { AnalyzeImageAction } from '../actions';
import { ImageResults } from '../../models/image-results.model';

export interface AnalyzeImageState {
  loading: boolean;
  results: ImageResults;
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
    case types.CLEAR_RESULTS:
      return {...state, results: {}};
    default:
      return state;
  }
}