const auth = {
  async signUp(
    email: string,
    first_name: string,
    last_name: string,
    password: string,
    password2: string
  ) {
    const data = await fetch(
      `https://faberlick.pythonanywhere.com/accounts/register/`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          first_name,
          last_name,
          password,
          password2,
        }),
      }
    );
    return data;
  },
  async login(email: string, password: string) {
    const data = await fetch(
      `https://faberlick.pythonanywhere.com/accounts/login/`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );
    return data;
  },
  async logOut(refresh_token: string) {
    const data = await fetch(
      `https://faberlick.pythonanywhere.com/accounts/logout/`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh_token }),
      }
    );
    return data;
  },
  async verify(otp: string) {
    const data = await fetch(
      `https://faberlick.pythonanywhere.com/accounts/verify-email/`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otp,
        }),
      }
    );
    return data;
  },
};

export default auth;
