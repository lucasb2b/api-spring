"use client";
import { useState, useEffect } from "react";
import { Pessoa } from "@/types/Pessoa";
import Link from "next/link";

export default function DataTable() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [pessoaSelecionada, setPessoaSelecionada] = useState<{
    id: number;
    nome: string;
    endereco?: string;
    telefone?: string;
    ativo?: boolean;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPessoas() {
      try {
        const response = await fetch("http://localhost:8080/api/pessoas");
        const data: Pessoa[] = await response.json();
        setPessoas(data);
      } catch (error) {
        console.error("Erro ao buscar pessoas: ", error);
      } finally {
        setLoading(false);
      }
    }
    getPessoas();
  }, []);

  const handleDelete = async () => {
    if (!pessoaSelecionada) return;

    try {
      const res = await fetch(
        `http://localhost:8080/api/pessoas/${pessoaSelecionada.id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        alert("Pessoa apagada com sucesso!");
        setPessoas((prev) => prev.filter((p) => p.id !== pessoaSelecionada.id));
      } else {
        alert("Erro ao apagar pessoa");
      }
    } catch (err) {
      console.error("Erro ao apagar pessoa: ", err);
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
    <>
      <table className="table table-dark table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nome</th>
            <th scope="col">Endereco</th>
            <th scope="col">Telefone</th>
            <th scope="col">Ativo</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {pessoas.map((pessoa) => (
            <tr key={pessoa.id}>
              <th>{pessoa.id}</th>
              <td
                style={{ cursor: "pointer" }}
                data-bs-toggle="modal"
                data-bs-target="#detalhesModal"
                onClick={() => setPessoaSelecionada(pessoa)}
              >
                {pessoa.nome}
              </td>
              <td>{pessoa.endereco.substring(0, 10)}</td>
              <td>{pessoa.telefone}</td>
              <td>{pessoa.ativo ? "Ativo" : "Inativo"}</td>
              <td>
                <Link
                  href={`/pessoas/${pessoa.id}/edit`}
                  className="btn btn-warning btn-sm"
                >
                  Editar
                </Link>
                &nbsp;
                <button
                  className="btn btn-danger btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#confirmDeleteModal"
                  onClick={() =>
                    setPessoaSelecionada({ id: pessoa.id, nome: pessoa.nome })
                  }
                >
                  Apagar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        className="modal fade"
        id="detalhesModal"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Detalhes da Pessoa</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              {pessoaSelecionada ? (
                <div>
                  <p>
                    <strong>ID:</strong> {pessoaSelecionada.id}
                  </p>
                  <p>
                    <strong>Nome:</strong> {pessoaSelecionada.nome}
                  </p>
                  <p>
                    <strong>Endereço:</strong> {pessoaSelecionada.endereco}
                  </p>
                  <p>
                    <strong>Telefone:</strong> {pessoaSelecionada.telefone}
                  </p>
                  <p>
                    <strong>Ativo:</strong>{" "}
                    {pessoaSelecionada.ativo ? "Sim" : "Não"}
                  </p>
                </div>
              ) : (
                <p>Nenhuma pessoa selecionada.</p>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="confirmDeleteModal"
        tabIndex={-1}
        aria-labelledby="confirmDeleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="confirmDeleteModalLabel">
                Confirmar Exclusão
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Tem certeza que deseja apagar{" "}
              <strong>{pessoaSelecionada?.nome}</strong>?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDelete}
                data-bs-dismiss="modal"
              >
                Sim, apagar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
