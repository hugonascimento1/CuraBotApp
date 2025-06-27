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
            .order('created_at', { ascending: false });

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
        <div className="flex flex-col justify-center items-center pb-16">
            <NavPages nome="Acompanhamentos" />

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : acompanhamentos.length === 0 ? (
                <div className="text-center p-8 bg-blue-50 rounded-lg max-w-md mx-auto">
                    <svg className="w-12 h-12 mx-auto text-blue-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <p className="text-gray-600">Você ainda não registrou nenhum acompanhamento diário.</p>
                </div>
            ) : (
                <ul className="flex flex-col gap-4 w-11/12 max-w-3xl mb-8">
                    {acompanhamentos.map((acompanhamento) => {

                        // Extrair as partes da mensagem do bot
                        const mensagem = acompanhamento.resposta_bott;
                        const monitoramento = mensagem.split('Monitoramento:')[1]?.split('Acompanhamento:')[0]?.trim();
                        const acompanhamentoMsg = mensagem.split('Acompanhamento:')[1]?.split('Sinais de Alerta:')[0]?.trim();
                        const sinaisAlerta = mensagem.split('Sinais de Alerta:')[1]?.trim();
                        const dataAcompanhamentoMatch = mensagem.match(/Data do Acompanhamento:\s*\*\*(.+?)às/);
                        const dataAcompanhamento = dataAcompanhamentoMatch ? dataAcompanhamentoMatch[1] : "Data não disponível";

                        return (
                            <li key={acompanhamento.data_hora_interacao} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-200">
                                <div className="bg-azul px-4 py-3">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-white font-semibold text-lg">{acompanhamento.nome_procedimento}</h3>
                                        <span className="bg-blue-800 text-white text-xs px-2 py-1 rounded-full">
                                            {dataAcompanhamento.split(' às ')[0]}
                                        </span>
                                    </div>
                                    <p className="text-blue-100 text-sm mt-1">
                                        Cirugia realizada: {new Date(acompanhamento.data_procedimento).toLocaleDateString('pt-BR')}
                                    </p>
                                </div>

                                <div className="p-4 space-y-4">
                                    {/* {monitoramento && (
                                        <div>
                                            <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                                                <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                </svg>
                                                Monitoramento
                                            </h4>
                                            <div className="bg-blue-50 p-3 rounded-md whitespace-pre-line text-gray-700">
                                                <ReactMarkdown>{monitoramento}</ReactMarkdown>
                                            </div>
                                        </div>
                                    )} */}

                                    {acompanhamentoMsg && (
                                        <div>
                                            <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                                                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                                                </svg>
                                                Acompanhamento
                                            </h4>
                                            <div className="bg-green-50 p-3 rounded-md whitespace-pre-line text-gray-700">
                                                <ReactMarkdown>{acompanhamentoMsg}</ReactMarkdown>
                                            </div>
                                        </div>
                                    )}

                                    {sinaisAlerta && (
                                        <div>
                                            <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                                                <svg className="w-4 h-4 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                                                </svg>
                                                Sinais de Alerta
                                            </h4>
                                            <div className="bg-red-50 p-3 rounded-md whitespace-pre-line text-gray-700">
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