import url from "./url"

const setModalInfos = (modalType) => {
  switch (modalType) {
    case 'signUpModal':
      return {
        title: 'Cadastro de novo usuário',
        submitURL: `${url()}/registrations`,
        error: 'CPF inválido ou já cadastrado',
        nameInputClass: "",
        nameRequirement: "required",
        passwordInputClass: "d-none ",
        passwordRequirement: "",
        submitText: 'Cadastrar'
      }
    case 'loginModal':
      return {
        title: 'Identificação',
        submitURL: `${url()}/sessions`,
        error: 'Credenciais incorretas',
        nameInputClass: "d-none ",
        nameRequirement: "",
        passwordInputClass: "",
        passwordRequirement: "required",
        submitText: 'Entrar'
      }
    case 'depositModal':
      return {
        title: 'Depósito em própria conta',
        submitURL: `${url()}/users`,
        error: 'Credenciais incorretas',
        submitText: 'Fazer depósito'
      }
    case 'withdrawalModal':
      return {
        title: 'Saque de dinheiro',
        submitURL: `${url()}/users`,
        error: 'Credenciais incorretas',
        submitText: 'Sacar quantia'
      }
  }
}

export default setModalInfos;
