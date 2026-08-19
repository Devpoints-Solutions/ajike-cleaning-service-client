import { Link } from "wouter";

function Brand() {
  return (
    <Link href="/" className="brand" data-testid="link-brand-home">
      <span className="brand-mark" aria-hidden="true" />
      Ajike Pest Control
    </Link>
  );
}

export default Brand;
