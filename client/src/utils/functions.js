//this function will grab all information from localstorage

export const isAuth = () => {
    if (localStorage.getItem("auth")) {
      return localStorage.getItem("auth");
    } else {
      return "";
    }
  };
  