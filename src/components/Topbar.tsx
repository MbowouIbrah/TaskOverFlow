import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/src/store/useAuthStore';

export function Topbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="fixed top-0 z-50 flex h-16 w-full items-center justify-between border-b border-black/5 bg-white/60 px-6 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <Link to="/portail" className="flex items-center gap-2 group">
          <div className="h-8 w-8 rounded-lg bg-black flex items-center justify-center transition-transform group-hover:scale-110">
            <span className="font-bold text-white">T</span>
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground group-hover:text-foreground/80 transition-colors uppercase">Task<span className="text-primary italic">OverFlow</span></span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-black/[0.03] border border-black/5 backdrop-blur-md shadow-sm">
          <Avatar className="h-7 w-7 border border-black/10">
            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.firstName} ${user?.lastName}`} />
            <AvatarFallback>{user?.firstName?.[0]}{user?.lastName?.[0]}</AvatarFallback>
          </Avatar>
          <div className="hidden flex-col md:flex">
            <span className="text-xs font-medium text-foreground">{user?.firstName} {user?.lastName}</span>
            <span className="text-[10px] text-foreground/40 uppercase tracking-wider">{user?.role?.replace('_', ' ')}</span>
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleLogout}
          className="text-foreground/40 hover:text-foreground hover:bg-black/5 rounded-full"
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
