export default (history: any) => (dispatch: any) => {
  localStorage.removeItem("token");
  dispatch({
    type: "LOGOUT_USER",
  });
  history.push("/");
};