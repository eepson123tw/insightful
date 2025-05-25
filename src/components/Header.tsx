import { Link } from '@tanstack/react-router'
import {  Triangle } from 'lucide-react';

export default function Header() {
  return (
    <header className=" bg-[#151122]  flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#2d2447] px-10 py-3">
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
    </header>
  )
}
