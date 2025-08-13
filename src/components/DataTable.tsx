"use client";
import { useState, useEffect } from "react";
import { Pessoa } from "@/types/Pessoa";
import Link from "next/link";

export default function DataTable() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
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
        {
          pessoas.map(pessoa => (
            <tr key={pessoa.id}>
              <th>{pessoa.id}</th>
              <td>{pessoa.nome}</td>
              <td>{pessoa.endereco.substring(0, 10)}</td>
              <td>{pessoa.telefone}</td>
              <td>{pessoa.ativo ? "Ativo" : "Inativo"}</td>
              <td><Link href={`/pessoas/${pessoa.id}/edit`} className="btn btn-warning">Editar</Link> | Apagar</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}
