import { Link } from '@tanstack/react-router'
import { Triangle, Github, ExternalLink } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-[#151122] flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#2d2447] px-10 py-3">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-4 text-white">
          <div className="size-4">
            <Triangle className="w-4 h-4 fill-current" />
          </div>
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">Insightful</h2>
        </div>
        <nav className="flex items-center gap-9">
          <Link className="text-white text-sm font-medium leading-normal hover:text-[#a093c8] transition-colors" to="/">Home</Link>
          <Link className="text-white text-sm font-medium leading-normal hover:text-[#a093c8] transition-colors" to="/setting">Setting</Link>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <a
          href="https://github.com/eepson123tw/insightful#%E7%B9%81%E9%AB%94%E4%B8%AD%E6%96%87"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-[#a093c8] transition-colors"
          aria-label="Visit GitHub Repository"
        >
          <Github className="w-5 h-5" />
        </a>
        <a
          href="https://bento.me/routing-in-the-dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-[#a093c8] transition-colors"
          aria-label="Visit Bento Profile"
        >
          <ExternalLink className="w-5 h-5" />
        </a>
      </div>
    </header>
  )
}
