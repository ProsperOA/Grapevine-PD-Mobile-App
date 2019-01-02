export {
  AuthAction,
  IAuthUserSuccess,
  IAuthUserFailed,
  ILoginSuccess,
  ILoginFailed,

  authUser,
  login,
} from './auth.actions';

export {
  AnalyzeImageAction,
  IAnalyzeImageSuccess,
  IAnalyzeImageFailed,
  IClearResults,

  analyzeImage,
  clearResults
} from './analyze-image.actions';