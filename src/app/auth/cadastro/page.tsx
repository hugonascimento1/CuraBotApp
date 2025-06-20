'use client'

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseclient";
import LogoAzulCuraBot from "@/components/LogoAzulCuraBot";

export default function CadastroPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleCadastro = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (password !== confirmPassword) {
            setError('As senhas devem ser iguais.');
            setLoading(false);
            return;
        }

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        setLoading(false);

        if (error) {
            setError(error.message);
        } else {
            router.push('/auth/login');
        }

    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center">

            <LogoAzulCuraBot />

            <h2 className="text-center fs-4 fw-bold h-4">Cadastre-se</h2>

            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={handleCadastro} className="d-flex flex-column" style={{ gap: '1rem', width: '75%' }}>
                <div className="d-flex flex-column gap-2">
                    <label htmlFor="email" className="text-azul-custom fw-semibold fs-4">Email</label>
                    <input
                        className="border border-azul-custom rounded p-1"
                        style={{ height: '50px', fontSize: '18px' }}
                        id="email"
                        type="email"
                        placeholder="Insira seu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="d-flex flex-column gap-2">
                    <label htmlFor="password" className="text-azul-custom fw-semibold fs-4">Senha</label>
                    <input
                        className="border border-azul-custom rounded p-1"
                        style={{ height: '50px', fontSize: '18px' }}
                        id="password"
                        type="password"
                        placeholder="Insira sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="d-flex flex-column gap-2">
                    <label htmlFor="confirmPassword" className="text-azul-custom fw-semibold fs-4">Confirmar Senha</label>
                    <input
                        className="border border-azul-custom rounded p-1"
                        style={{ height: '50px', fontSize: '18px' }}
                        id="confirmPassword"
                        type="password"
                        placeholder="Insira sua senha"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                <button
                    className="btn btn-azul-custom text-white rounded p-1"
                    style={{ height: '50px', fontSize: '1.25rem', marginTop: '0.5rem' }}
                    type="submit"
                    disabled={loading}
                >
                    {loading ? 'Cadastrando...' : 'Cadastrar'}
                </button>

                <p className="mt-2 text-center">
                    Já tem uma conta? <a href="/auth/login" className="text-blue-700 hover:text-azul">Faça login!</a>
                </p>
            </form>
        </div>
    )
}