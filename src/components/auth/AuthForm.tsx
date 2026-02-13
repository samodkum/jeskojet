'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                router.push('/'); // Redirect to home on success
            } else {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                });
                if (error) throw error;
                alert('Check your email for the confirmation link!');
            }
        } catch (error: any) {
            console.error('Authentication error:', error);
            alert(error.message || 'Authentication failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md bg-black/50 backdrop-blur-xl border border-white/10 p-10 rounded-2xl shadow-2xl">
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-light text-white tracking-widest uppercase mb-2">
                    {isLogin ? 'Welcome Back' : 'Join the Elite'}
                </h2>
                <p className="text-neutral-400 text-sm">
                    {isLogin ? 'Access your personal flight concierge.' : 'Begin your journey with Jesko Jets.'}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors"
                        placeholder="name@example.com"
                        required
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors"
                        placeholder="••••••••"
                        required
                    />
                </div>

                <button
                    disabled={isLoading}
                    className="w-full bg-white text-black font-bold uppercase tracking-widest py-4 hover:bg-neutral-200 transition-colors disabled:opacity-50"
                >
                    {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Request Access')}
                </button>
            </form>

            <div className="mt-8 text-center">
                <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-xs text-neutral-500 hover:text-white transition-colors uppercase tracking-widest"
                >
                    {isLogin ? "New here? Apply for membership" : "Already a member? Sign in"}
                </button>
            </div>
        </div>
    );
}
