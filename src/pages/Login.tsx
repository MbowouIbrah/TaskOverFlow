import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'motion/react';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuthStore } from '@/src/store/useAuthStore';
import apiClient from '@/src/api/apiClient';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();
  const { setAuth, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/portail');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.post('/auth/login', { email, password });
      const { user, token } = response.data;
      setAuth(user, token);
      navigate('/portail');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Identifiants incorrects');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-background px-6 overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-20 -top-20 h-[600px] w-[600px] rounded-full bg-blue-500/[0.05] blur-[120px]" />
        <div className="absolute -right-20 -bottom-20 h-[600px] w-[600px] rounded-full bg-orange-500/[0.05] blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-multiply" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-white shadow-2xl transition-transform hover:scale-105">
            <span className="text-2xl font-black italic">TF</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground uppercase">Task<span className="text-primary italic">OverFlow</span> SSO</h1>
          <p className="mt-2 text-foreground/40">Portail d'accès sécurisé pour Trigenys Group</p>
        </div>

        <Card className="rounded-2xl bg-white/30 border border-white/60 backdrop-blur-sm shadow-xl ring-0">
          <form onSubmit={handleLogin}>
            <CardHeader className="space-y-2 pb-8">
              <CardTitle className="text-2xl font-black text-foreground">Authentification</CardTitle>
              <CardDescription className="text-sm font-medium text-foreground/50">
                Saisissez vos identifiants pour accéder au cockpit.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {error && (
                <div className="rounded-lg bg-red-500/10 p-3 text-xs font-bold text-red-500 border border-red-500/20">
                  {error}
                </div>
              )}

              <div className="space-y-2.5">
                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-foreground/50">Identifiant Unique (Email)</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="prenom@trigenys.com" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 border-white/20 bg-white/50 px-4 text-sm font-medium text-foreground placeholder:text-foreground/30 focus:border-primary/50 focus:bg-white/80 focus:ring-4 focus:ring-primary/10 transition-all rounded-xl"
                />
              </div>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-foreground/50">Mot de passe</Label>
                  <button type="button" className="text-[10px] font-bold uppercase tracking-widest text-primary/60 hover:text-primary transition-colors">Oublié ?</button>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••"
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 border-white/20 bg-white/50 px-4 text-sm font-medium text-foreground placeholder:text-foreground/30 focus:border-primary/50 focus:bg-white/80 focus:ring-4 focus:ring-primary/10 transition-all rounded-xl"
                />
              </div>
            </CardContent>
            <CardFooter className="pt-4">
              <Button 
                type="submit" 
                className="group w-full h-12 rounded-xl bg-black text-white hover:bg-black/80 transition-all active:scale-[0.98] font-bold uppercase tracking-widest shadow-lg shadow-black/10" 
                disabled={isLoading}
              >
                {isLoading ? "Vérification en cours..." : (
                  <span className="flex items-center gap-2">
                    Accéder au Cockpit
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <p className="mt-8 text-center text-xs text-foreground/20 uppercase tracking-widest font-bold">
          &copy; 2026 Trigenys Group. Systèmes Protégés.
        </p>
      </motion.div>
    </div>
  );
}
