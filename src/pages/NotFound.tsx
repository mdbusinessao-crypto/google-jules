import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="px-4 py-24 text-center">
      <h1 className="font-display text-7xl font-black text-gradient">404</h1>
      <p className="mt-4 text-lg text-cream/70">
        Esta página saiu do menu.
      </p>
      <Link to="/" className="btn-primary mt-8">
        Voltar ao início
      </Link>
    </div>
  );
}
