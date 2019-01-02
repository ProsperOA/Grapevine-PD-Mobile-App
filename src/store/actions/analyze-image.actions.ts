import { AxiosResponse, AxiosError } from 'axios';
import { ActionCreator, Dispatch } from 'redux';

import * as types from './types';
import axios from '../../shared/axios';

export interface IAnalyzeImageStart {
  type: types.ANALYZE_IMAGE_START
}

export interface IAnalyzeImageSuccess {
  type: types.ANALYZE_IMAGE_SUCCESS,
  payload: any;
}

export interface IAnalyzeImageFailed {
  type: types.ANALYZE_IMAGE_FAILED
}

export type AnalyzeImageAction =
  | IAnalyzeImageSuccess
  | IAnalyzeImageFailed
  | IAnalyzeImageStart;

const analyzeImageStart : ActionCreator<IAnalyzeImageStart> =
 (): IAnalyzeImageStart => ({
   type: types.ANALYZE_IMAGE_START
});

const analyzeImageSuccess: ActionCreator<IAnalyzeImageSuccess> =
 (results: any): IAnalyzeImageSuccess => ({
   type: types.ANALYZE_IMAGE_SUCCESS,
   payload: results
});

const analyzeImageFailed: ActionCreator<IAnalyzeImageFailed> =
 (): IAnalyzeImageFailed => ({
   type: types.ANALYZE_IMAGE_FAILED
});

export const analyzeImage = (image: any): any =>
  (dispatch: Dispatch<AnalyzeImageAction>): void => {
    dispatch(analyzeImageStart());

    const data: FormData = new FormData();
    data.append('image', image);

    axios.post('/analyze', data)
      .then(({ data }: AxiosResponse) => dispatch(analyzeImageSuccess(data.data)))
      .catch(() => dispatch(analyzeImageFailed()));
};