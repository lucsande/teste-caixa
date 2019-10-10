const url = () => {
  if (process.env.HEROKU) {
    return "https://teste-caixa-eletronico.herokuapp.com"
  } else {
    return "http://localhost:3000"
  }

}

export default url;
