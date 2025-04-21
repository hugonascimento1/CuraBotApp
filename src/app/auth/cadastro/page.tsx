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
        <div className="flex flex-col justify-content-center items-center">

            <LogoAzulCuraBot />

            <h1 className="text-2xl font-bold text-center text-gray-700">Cadastre-se</h1>

            {error && <p className="text-red-600 text-sm italic mb-4 ">{error}</p>}
            <form onSubmit={handleCadastro} className="flex flex-col gap-4 w-3/4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-azul font-semibold text-2xl">Email</label>
                    <input
                        className="border-2 border-azul rounded-xl p-1 h-[50px] text-[18px]"
                        id="email"
                        type="email"
                        placeholder="Insira seu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="text-azul font-semibold text-2xl">Senha</label>
                    <input
                        className="border-2 border-azul rounded-xl p-1 h-[50px] text-[18px]"
                        id="password"
                        type="password"
                        placeholder="Insira sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="confirmPassword" className="text-azul font-semibold text-2xl">Confirmar Senha</label>
                    <input
                        className="border-2 border-azul rounded-xl p-1 h-[50px] text-[18px]"
                        id="confirmPassword"
                        type="password"
                        placeholder="Insira sua senha"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                <button
                    className="bg-azul text-white rounded-xl p-1 text-xl h-[50px] mt-2"
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