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
        <div className="d-flex flex-column justify-content-center align-items-center">
            
            <LogoAzulCuraBot />

            <h5 className="text-center fs-4 fw-bold h-4">Login</h5>

            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={handleLogin} className="d-flex flex-column" style={{ gap: '1rem', width: '75%' }}>
                <div className="d-flex flex-column gap-2">
                    <label htmlFor="email" className="text-azul-custom fw-semibold fs-4">Email</label>
                    <input
                        type="text"
                        placeholder="Insira seu email"
                        className="border border-azul-custom rounded p-1"
                        style={{ height: '50px', fontSize: '18px' }}
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                
                <div className="d-flex flex-column gap-2">
                    <label htmlFor="password" className="text-azul-custom fw-semibold fs-4">Senha</label>
                    <input
                        type="password"
                        placeholder="Insira sua senha"
                        className="border border-azul-custom rounded p-1"
                        style={{ height: '50px', fontSize: '18px' }}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                
                <button 
                type="submit" 
                disabled={loading}
                className="btn btn-azul-custom text-white rounded p-1"
                style={{ height: '50px', fontSize: '1.25rem', marginTop: '0.5rem' }}
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