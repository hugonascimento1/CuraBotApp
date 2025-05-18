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
        <div className="flex flex-col justify-center items-center pb-16">
            <NavPages nome="Acompanhamentos" />

            {loading ? (
                <p>Carregando acompanhamentos...</p>
            ) : acompanhamentos.length === 0 ? (
                <p>Você ainda não registrou nenhum acompanhamento diário.</p>
            ) : (
                <ul className="flex flex-col gap-3 w-11/12 p-1 mb-8 overflow-auto rounded-md">
                    {acompanhamentos.map((acompanhamento) => (
                        <li key={acompanhamento.data_hora_interacao} className="bg-gray-300 p-2 font-normal">
                            <p>
                                <strong>Data do Acompanhamento:</strong>{' '}
                                {new Date(acompanhamento.data_hora_interacao).toLocaleDateString('pt-BR', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </p>
                            <p>
                                <strong>Procedimento:</strong> {acompanhamento.nome_procedimento}
                            </p>
                            <p>
                                <strong>Data do Procedimento:</strong>{' '}
                                {new Date(acompanhamento.data_procedimento).toLocaleDateString('pt-BR')}
                            </p>
                            <div className="mt-2">
                                <strong>Resposta do Bot:</strong>
                                <div className="whitespace-pre-line">
                                    <ReactMarkdown>{acompanhamento.resposta_bott}</ReactMarkdown>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <BottomNavigation />
        </div>
    )
}