import { Model } from '../core/model';
import { Funcionario } from './funcionario.model';

export class Movimentacao extends Model {
    funcionario: Funcionario;
    dataHora: Date;
    status: string;
    descricao: string;
}
