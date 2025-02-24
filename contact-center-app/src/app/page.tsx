import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  return (
    <div className="container text-center">
      <h1 className="my-4">Contact Center</h1>
      <nav>
        <ul className="list-inline">
          <li className="list-inline-item mx-2">
            <Link href="/agents" className="btn btn-primary">Agentes</Link>
          </li>
          <li className="list-inline-item mx-2">
            <Link href="/clients" className="btn btn-secondary">Clientes</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;