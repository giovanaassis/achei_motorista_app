export function getErrorMessage(status: number) {
  switch (status) {
    case 400:
      return "Dados inválidos.";
    case 404:
      return "Recurso não encontrado.";
    case 401:
      return "Você precisa estar logado.";
    case 403:
      return "Você não tem permissão para acessar.";
    case 500:
      return "Erro interno do servidor.";
    default:
      return "Algo deu errado :(";
  }
}
