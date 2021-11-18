export interface InitialState {
  isLoggedIn: boolean;
  access_token: string | null;
  client_id: string;
  redirect_uri: string;
  proxy_url: string;
}
export const initialState: InitialState = {
  isLoggedIn: false,
  access_token: localStorage.getItem("access_token")
    ? JSON.parse(localStorage.getItem("access_token")!)
    : null,
  client_id: process.env.REACT_APP_CLIENT_ID!,
  redirect_uri: process.env.REACT_APP_REDIRECT_URI!,
  proxy_url: process.env.REACT_APP_PROXY_URL!,
};
export type Action =
  | { type: "LOGIN"; payload: { isLoggedIn: boolean; access_token: string } }
  | { type: "LOGOUT" };
export const reducer = (state: InitialState, action: Action): InitialState => {
  switch (action.type) {
    case "LOGIN": {
      localStorage.setItem(
        "isLoggedIn",
        JSON.stringify(action.payload.isLoggedIn)
      );
      localStorage.setItem(
        "access_token",
        JSON.stringify(action.payload.access_token)
      );
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        access_token: action.payload.access_token,
      };
    }
    case "LOGOUT": {
      localStorage.clear();
      return {
        ...state,
        isLoggedIn: false,
        access_token: null,
      };
    }
    default:
      return state;
  }
};
