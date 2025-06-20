'use client'

import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import BottomNavigation from "@/components/BottomNavigation";
import NavPages from "@/components/NavPages";

import { supabase } from "@/utils/supabaseclient";

import ReactMarkdown from 'react-markdown';

interface BotInteraction {
    id: string;
    user_id: string;
    data_hora_interacao: string;
    nome_procedimento: string;
    resposta_bott: string;
    data_procedimento: string;
    created_at: string;
}

export default function AcompanhamentosPage() {
    const [user, setUser] = useState<any>(null);
    const [acompanhamentos, setAcompanhamentos] = useState<BotInteraction[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchSessionAndData = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user);

            if (!session?.user) {
                router.push('/auth/login');
            } else {
                fetchAcompanhamentos(session.user.id);
            }
        };

        fetchSessionAndData();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                setUser(session?.user);
                if (!session?.user) {
                    router.push('/auth/login');
                } else {
                    fetchAcompanhamentos(session.user.id);
                }
            });

        return () => subscription?.unsubscribe();
    }, [router]);

    const fetchAcompanhamentos = async (userId: string) => {
        setLoading(true);
        const { data, error } = await supabase
            .from('bot_interactions')
            .select('*')
            .eq('user_id', userId)
            .order('data_hora_interacao', { ascending: false });

        if (error) {
            console.error('Erro ao buscar acompanhamentos:', error);
            // Tratar o erro adequadamente
        } else {
            setAcompanhamentos(data || []);
        }
        setLoading(false);
    };

    if (!user) {
        return <p>Carregando informações do usuário</p>;
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center pb-5" style={{ paddingBottom: '4rem' }}>
            <NavPages nome="Acompanhamentos" />

            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '16rem' }}>
                    <div className="spinner-border text-azul-custom" style={{ width: '3rem', height: '3rem', borderWidth: '0.2rem' }} role="status">
                        <span className="visually-hidden">Carregando...</span>
                    </div>
                </div>
            ) : acompanhamentos.length === 0 ? (
                <div className="text-center p-5 bg-blue-50 rounded-3 mx-auto" style={{ maxWidth: '32rem' }}>
                    <svg className="d-block mx-auto mb-3" style={{ width: '3rem', height: '3rem', color: 'var(--azul)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <p className="text-secondary">Você ainda não registrou nenhum acompanhamento diário.</p>
                </div>
            ) : (
                <ul className="d-flex flex-column gap-3 w-100 mb-4" style={{ maxWidth: '48rem' }}>
                    {[...acompanhamentos].reverse().map((acompanhamento) => {
                        const mensagem = acompanhamento.resposta_bott;
                        const monitoramento = mensagem.split('Monitoramento:')[1]?.split('Acompanhamento:')[0]?.trim();
                        const acompanhamentoMsg = mensagem.split('Acompanhamento:')[1]?.split('Sinais de Alerta:')[0]?.trim();
                        const sinaisAlerta = mensagem.split('Sinais de Alerta:')[1]?.trim();
                        const dataAcompanhamentoMatch = mensagem.match(/Data do Acompanhamento:\s*\*\*(.+?)às/);
                        const dataAcompanhamento = dataAcompanhamentoMatch ? dataAcompanhamentoMatch[1] : "Data não disponível";

                        return (
                            <li key={acompanhamento.data_hora_interacao} className="bg-white rounded-3 shadow-sm overflow-hidden border border-light-subtle" style={{ transition: 'box-shadow 0.2s ease' }}>
                                <div className="bg-azul-custom px-4 py-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h3 className="text-white fw-semibold fs-5">{acompanhamento.nome_procedimento}</h3>
                                        <span className="bg-blue-800 text-white fs-7 px-2 py-1 rounded-pill">
                                            {dataAcompanhamento.split(' às ')[0]}
                                        </span>
                                    </div>
                                    <p className="text-black-50 fs-7 mt-1">
                                        Cirugia realizada: {new Date(acompanhamento.data_procedimento).toLocaleDateString('pt-BR')}
                                    </p>
                                </div>

                                <div className="p-3" style={{ '--bs-gap': '1rem' } as React.CSSProperties}>
                                    {acompanhamentoMsg && (
                                        <div className="mb-3">
                                            <h5 className="fw-normal text-body mb-1 d-flex align-items-center fs-6">
                                                <svg className="me-1" style={{ width: '0.875rem', height: '0.875rem', color: 'var(--success)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                                                </svg>
                                                Acompanhamento
                                            </h5>
                                            <div className="bg-green-50 p-2 rounded-1 text-body small" style={{ backgroundColor: 'rgba(25, 135, 84, 0.1)' }}>
                                                <ReactMarkdown>{acompanhamentoMsg}</ReactMarkdown>
                                            </div>
                                        </div>
                                    )}

                                    {sinaisAlerta && (
                                        <div>
                                            <h5 className="fw-normal text-body mb-1 d-flex align-items-center fs-6">
                                                <svg className="me-1" style={{ width: '0.875rem', height: '0.875rem', color: 'var(--danger)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                                                </svg>
                                                Sinais de Alerta
                                            </h5>
                                            <div className="bg-red-50 p-2 rounded-1 text-body small" style={{ backgroundColor: 'rgba(220, 53, 69, 0.1)' }}>
                                                <ReactMarkdown>{sinaisAlerta}</ReactMarkdown>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}

            <BottomNavigation />
        </div>
    )
}