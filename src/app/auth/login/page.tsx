'use client'

import React, { useState } from "react";
import { createClient } from '@supabase/supabase-js';
import { useRouter } from "next/navigation";
import { PiStethoscope } from "react-icons/pi";
import LogoAzulCuraBot from "@/components/LogoAzulCuraBot";

import { supabase } from "@/utils/supabaseclient";

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        setLoading(false);

        if (error) {
            setError(error.message);
        } else {
            router.push('/')
        }
    };

    // 4844B6 azul

    // 9F3EB8 roxo
    return (
        <div className="flex flex-col justify-content-center items-center">
            
            <LogoAzulCuraBot />

            <h1 className="text-2xl font-bold text-center text-gray-700">Login</h1>

            {error && <p className="text-red-600">{error}</p>}
            <form onSubmit={handleLogin} className="flex flex-col gap-4 w-3/4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-azul font-semibold text-2xl">Email</label>
                    <input
                        type="text"
                        placeholder="Insira seu email"
                        className="border-2 border-azul rounded-xl p-1 h-[50px] text-[18px]"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                
                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="text-azul font-semibold text-2xl">Senha</label>
                    <input
                        type="password"
                        placeholder="Insira sua senha"
                        className="border-2 border-azul rounded-xl p-1 h-[50px] text-[18px]"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                
                <button 
                type="submit" 
                disabled={loading}
                className="bg-azul text-white rounded-xl p-1 text-xl h-[50px] mt-2"
                >
                    {loading ? 'Entrando...' : 'Entrar'}
                </button>
            </form>

            <p className="mt-2">
                Não tem uma conta? <a href="/auth/cadastro" className="text-blue-700 hover:text-azul">Cadastre-se</a>
            </p>
        </div>
    )
}

export default LoginPage;