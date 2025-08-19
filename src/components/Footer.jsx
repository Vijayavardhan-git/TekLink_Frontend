import { FaTwitter, FaYoutube, FaFacebook, FaGithub, FaLinkedin, FaCode } from "react-icons/fa";
import { SiDevdotto } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="footer bg-gradient-to-r from-base-200 to-base-300 text-base-content border-t border-base-300 p-6 md:p-8">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FaCode className="text-primary text-2xl" />
              <span className="text-xl font-bold">
                <span className="text-primary">Tek</span>
                <span className="text-secondary">Lync</span>
              </span>
            </div>
            <p className="text-sm opacity-80">
              Connecting developers worldwide through innovative networking solutions.
            </p>
            <div className="flex gap-4">
              <a href="#" className="btn btn-ghost btn-sm p-2 hover:bg-base-100">
                <FaGithub className="text-xl" />
              </a>
              <a href="#" className="btn btn-ghost btn-sm p-2 hover:bg-base-100">
                <FaLinkedin className="text-xl" />
              </a>
              <a href="#" className="btn btn-ghost btn-sm p-2 hover:bg-base-100">
                <SiDevdotto className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-primary">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="link link-hover hover:text-secondary">Home</a></li>
              <li><a href="#" className="link link-hover hover:text-secondary">Discover</a></li>
              <li><a href="#" className="link link-hover hover:text-secondary">Connections</a></li>
              <li><a href="#" className="link link-hover hover:text-secondary">Premium</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-primary">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="link link-hover hover:text-secondary">Blog</a></li>
              <li><a href="#" className="link link-hover hover:text-secondary">Documentation</a></li>
              <li><a href="#" className="link link-hover hover:text-secondary">API</a></li>
              <li><a href="#" className="link link-hover hover:text-secondary">Community</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-primary">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="link link-hover hover:text-secondary">Terms of Use</a></li>
              <li><a href="#" className="link link-hover hover:text-secondary">Privacy Policy</a></li>
              <li><a href="#" className="link link-hover hover:text-secondary">Cookie Policy</a></li>
              <li><a href="#" className="link link-hover hover:text-secondary">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <div className="divider my-4"></div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-x-5">
          <aside className="flex items-center gap-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-current text-primary"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <p className="text-sm opacity-80">
              Copyright © {new Date().getFullYear()} TekLync - All rights reserved
            </p>
          </aside>

          <nav className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-secondary transition-colors">
              <FaTwitter className="text-xl" />
            </a>
            <a href="#" className="hover:text-secondary transition-colors">
              <FaYoutube className="text-xl" />
            </a>
            <a href="#" className="hover:text-secondary transition-colors">
              <FaFacebook className="text-xl" />
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;