import {
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';
import Editora from '../../models/editora.js';

describe('Testando o modelo Editora', () => {
  const objetoEditora = {
    nome: 'CDC',
    cidade: 'São Paulo',
    email: 'c@c.com',
  };

  it('Deve instanciar uma nova editora', () => {
    const editora = new Editora(objetoEditora);
    expect(editora).toEqual(
      expect.objectContaining(objetoEditora),
    );
  });

  it.skip('Deve salvar editora no BD', () => {
    const editora = new Editora(objetoEditora);
    editora.salvar().then((dados) => {
      expect(dados.nome).toBe('CDC');
    });
  });

  it('Deve salvar no BD usando a sintaxe moderna', async () => {
    const editora = new Editora(objetoEditora);
    const dados = await editora.salvar();
    const retornado = await Editora.pegarPeloId(dados.id);

    expect(retornado).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...objetoEditora,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      }),
    );
  });

  it('Deve fazer uma chamada simulada ao BD', () => {
    const editora = new Editora(objetoEditora);
    editora.salvar = () => {
      console.log('Editora salva no DB');
    };

    editora.salvar = jest.fn().mockReturnValue({
      id: 10,
      nome: 'CDC',
      cidade: 'São Paulo',
      email: 'c@c.com',
      created_at: '2021-08-01T00:00:00.000Z',
      updated_at: '2021-08-01T00:00:00.000Z',
    });

    const retorno = editora.salvar();

    expect(retorno).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...objetoEditora,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      }),
    );
  });
});
