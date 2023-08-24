import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

function App() {

  //Declaração de variavel, pegando os dados da API
  const [veiculos, setVeiculos] = useState([]);
  const [modeloInput, setModeloInput] = useState('');
  const [montadoraInput, setMontadoraInput] = useState('');
  const [placaInput, setPlacaInput] = useState('');
  const [anoInput, setAnoInput] = useState('');


    //A cada ação na pagina, o UseEffect é ativado
    useEffect(() => {
      fetchVeiculos();
    }, []);


    //Pega o JSON do link referido, nesse caso um [ ], portanto, pega a array vazia do Java, onde iremos acrescentar coisas
    const fetchVeiculos = async () => {
      try {
        const response = await axios.get('http://localhost:8090/veiculos');
        setVeiculos(response.data);
      } catch (error) {
        console.error('Erro ao buscar veículos:', error);
      }
    };


    //Envia tudo o que foi adicionado no input para o localHost
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        let novoVeiculo = {
          placa: placaInput,
          montadora: montadoraInput,
          modelo: modeloInput,
          ano: anoInput,
        }
        await axios.post('http://localhost:8090/veiculos', novoVeiculo);
        fetchVeiculos();
        setPlacaInput('');
        setMontadoraInput('');
        setModeloInput('');
        setAnoInput('');
  
      } catch (error) {
        console.error('Erro ao criar veículo:', error);
      }
    };
  


    //Deleta conteudo
    const handleDelete = async (id) => {
      try {
        await axios.delete(`http://localhost:8090/veiculos/${id}`);
        fetchVeiculos();
      } catch (error) {
        console.error('Erro ao excluir veículo:', error);
      }
    };

    //Atualiza o veiculo selecionado
    const handleUpdate = async (id, veiculoAtualizado) => {
      try {
        await axios.put(`http://localhost:8090/veiculos/${id}`, veiculoAtualizado);
        fetchVeiculos();
      } catch (error) {
        console.error('Erro ao atualizar veículo:', error);
      }
    };

    
    return (
      <div>
        {/* Cabeçalho */}
        <h1>Gerenciamento de Veículos</h1>
  
        {/* Formulário de adição de veículo */}
        <form onSubmit={handleSubmit}>
          {/* Campo para a placa */}
          <input
            type="text"
            name="placa"
            placeholder="Placa"
            value={placaInput}
            onChange={(event) => setPlacaInput(event.target.value)}
          />
          {/* Campo para a montadora */}
          <input
            type="text"
            name="montadora"
            placeholder="Montadora"
            value={montadoraInput}
            onChange={(event) => setMontadoraInput(event.target.value)}
          />
          {/* Campo para o modelo */}
          <input
            type="text"
            name="modeloInput"
            placeholder="Modelo"
            value={modeloInput}
            onChange={(event) => setModeloInput(event.target.value)}
          />
  
  
          {/* Campo para o ano */}
          <input
            type="number"
            name="ano"
            placeholder="Ano"
            value={anoInput}
            onChange={(event) => setAnoInput(event.target.value)}
          />
          {/* Botão de envio do formulário */}
          <button type="submit">Adicionar Veículo</button>
        </form>
  
        {/* Lista de veículos */}
        <ul>
          {/* Mapeamento dos veículos */}
          {veiculos.map((veiculo) => (
            <li key={veiculo.id}>
              {/* Exibição dos detalhes do veículo */}
              {veiculo.placa} - {veiculo.montadora} {veiculo.modelo} ({veiculo.ano})
  
              {/* Botão de exclusão */}
              <button onClick={() => handleDelete(veiculo.id)}>Excluir</button>
  
              {/* Botão de atualização */}
              <button
                onClick={() =>
                  handleUpdate(veiculo.id, {
                    ...veiculo,
                    modelo: modeloInput !== '' ? modeloInput : veiculo.modelo,
                    montadora: montadoraInput !== '' ? montadoraInput : veiculo.montadora,
                    ano: anoInput !== '' ? anoInput : veiculo.ano,
                    placa: placaInput !== '' ? placaInput : veiculo.placa,
                  })
                }
              >
                Atualizar
              </button>
  
            </li>
          ))}
        </ul>
      </div>
    );
  
}

export default App
