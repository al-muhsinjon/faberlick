const auth = {
  signUp(
    email: string,
    ism: string,
    familiya: string,
    parol: string,
    parolTasdiq: string
  ) {
    const data = fetch(`https://faberlick.pythonanywhere.com/accounts/register/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        ism,
        familiya,
        parol,
        parolTasdiq,
      }),
    });
    return data;
  },
  login(email: string, parol: string) {
    const data = fetch(`https://faberlick.pythonanywhere.com/accounts/login/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        parol,
      }),
    });
    return data;
  },
  verify(otp: string) {
    const data = fetch(
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
