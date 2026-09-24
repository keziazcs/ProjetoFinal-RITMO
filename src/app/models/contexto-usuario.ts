export interface ContextoUsuario {
  tempoDisponivel: number;

  energia: 'baixa' | 'media' | 'alta';

  orcamento: number;

  companhia:
    | 'sozinho'
    | 'casal'
    | 'amigos'
    | 'familia';

  interesses: string[];

  preferePoucaCaminhada: boolean;
}