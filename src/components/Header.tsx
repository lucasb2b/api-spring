import Link from "next/link";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          SpringAPI
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" href="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" href="/criar">
                Cadastrar
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Editar
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Apagar
              </a>
            </li>
          </ul>
          <span className="navbar-text">
            API com Spring, PostgreSQL e React(Next.js)
          </span>
        </div>
      </div>
    </nav>
  );
}
