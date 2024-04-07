const auth = {
  signUp(
    email: string,
    first_name: string,
    last_name: string,
    password: string,
    password2: string
  ) {
    const data = fetch(`${process.env.NEXT_FABERLIC_API}/accounts/register/`, {
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
    });
    return data;
  },
  login(email: string, password: string) {
    const data = fetch(`${process.env.NEXT_FABERLIC_API}/accounts/login/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    return data;
  },
  verify(otp: string) {
    const data = fetch(
      `${process.env.NEXT_FABERLIC_API}/accounts/verify-email/`,
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
