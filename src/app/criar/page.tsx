"use client";
import { useState } from "react";

export default function CriarPessoa() {
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [ativo, setAtivo] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const novaPessoa = {
      nome,
      endereco,
      telefone,
      ativo,
    };

    try {
      const response = await fetch("http://localhost:8080/api/pessoas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novaPessoa),
      });

      if (response.ok) {
        alert("Pessoa criada com sucesso!");
        setNome("");
        setEndereco("");
        setTelefone("");
        setAtivo(true);
      } else {
        alert("Erro ao criar uma pessoa");
      }
    } catch (error) {
      console.error("Erro na requisição: ", error);
      alert("Erro ao conectar com o servidor");
    }
  };

  return (
    <div className="container p-2">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name-form">Nome</label>
          <input type="text" className="form-control" id="name-form" value={nome} onChange={(e) => setNome(e.target.value)} />

          <label htmlFor="name-address">Endereço</label>
          <input type="text" className="form-control" id="name-address" value={endereco} onChange={(e) => setEndereco(e.target.value)}/>

          <label htmlFor="name-phone">Telefone</label>
          <input type="text" className="form-control" id="name-phone" value={telefone} onChange={(e) => setTelefone(e.target.value)}/>
        </div>
        <div className="mb-3">
          Ativo por padrão?
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="radioDefault"
              id="radioDefault1"
              checked={!ativo}
              onChange={() => setAtivo(false)}
            />
            <label className="form-check-label" htmlFor="radioDefault1">
              Não
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="radioDefault"
              checked={ativo}
              onChange={() => setAtivo(true)}
            />
            <label className="form-check-label" htmlFor="radioDefault2">
              Sim
            </label>
          </div>
        </div>
        <div className="mb-3 text-center">
          <button type="submit" className="btn btn-primary">
            <i className="bi bi-send"></i> Enviar
          </button>
        </div>
      </form>
    </div>
  );
}
