"use client";
import { useEffect, useReducer, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Pessoa } from "@/types/Pessoa";

export default function EditPessoaPage() {
  const { id } = useParams();
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [ativo, setAtivo] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPessoa() {
      try {
        const res = await fetch(`http://localhost:8080/api/pessoas/${id}`);
        const data: Pessoa = await res.json();
        setNome(data.nome);
        setEndereco(data.endereco);
        setTelefone(data.telefone);
        setAtivo(data.ativo);
      } catch (err) {
        console.error("Erro ao carregar pessoa: ", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPessoa();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const pessoaAtualizada = {
      id,
      nome,
      endereco,
      telefone,
      ativo,
    };

    try {
      const res = await fetch(`http://localhost:8080/api/pessoas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pessoaAtualizada),
      });

      if (res.ok) {
        alert("Pessoa atualizada com sucesso!");
        router.push("/");
      } else {
        alert("Erro ao atualizar pessoa");
      }
    } catch (err) {
      console.error("Erro na aquisição: ", err);
      alert("Erro ao conectar com o servidor");
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container p-2">
      <h4 className="text-center p-2 m-2">Editar dados da Pessoa</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name-form">Nome</label>
          <input
            type="text"
            className="form-control"
            id="name-form"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <label htmlFor="name-address">Endereço</label>
          <input
            type="text"
            className="form-control"
            id="name-address"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
          />

          <label htmlFor="name-phone">Telefone</label>
          <input
            type="text"
            className="form-control"
            id="name-phone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
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
            <i className="bi bi-send"></i> Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
