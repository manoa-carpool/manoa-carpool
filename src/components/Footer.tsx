import Link from 'next/link';

const Footer = () => (
  <footer className="site-footer">
    <span>Manoa Carpool · UH Mānoa community rides</span>
    <Link href="/auth/signup">Join the community</Link>
  </footer>
);

export default Footer;
