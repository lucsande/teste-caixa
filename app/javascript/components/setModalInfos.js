const setModalInfos = (modalType) => {
  switch (modalType) {
    case 'signUpModal':
      return {
        title: 'Cadastro de novo usuário',
        submitURL: "http://localhost:3000/registrations",
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
        submitURL: "http://localhost:3000/sessions",
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
