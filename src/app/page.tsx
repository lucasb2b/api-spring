import DataTable from "@/components/DataTable";

export default function Home() {
  return (
   <main className="container min-vh-100 p-2">
      <h1 className="text-center">Gerenciar Pessoas Cadastradas</h1>

      <DataTable />
   </main>
  );
}
