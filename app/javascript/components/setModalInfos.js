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
  }
}

export default setModalInfos;
