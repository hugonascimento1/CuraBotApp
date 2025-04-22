'use client'

import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import BottomNavigation from "@/components/BottomNavigation";
import NavPages from "@/components/NavPages";

import { supabase } from "@/utils/supabaseclient";

interface DailyReport {
    id: string;
    user_id: string;
    surgery_date: string;
    report_date: string;
    pain_level: number | null;
    wellbeing: string | null;
    fever: string | null;
    wound_appearance: string | null;
    daily_activities: string | null;
    created_at: string;
    updated_at: string;
}

export default function AcompanhamentosPage() {
    const [user, setUser] = useState<any>(null);
    const [reports, setReports] = useState<DailyReport[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchSessionAndData = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user);

            if (!session?.user) {
                router.push('/auth/login');
            } else {
                fetchDailyReports(session.user.id);
            }
        };

        fetchSessionAndData();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
            setUser(session?.user);
            if (!session?.user) {
                router.push('/auth/login');
            } else {
                fetchDailyReports(session.user.id);
            }
        });

        return () => subscription?.unsubscribe();
    }, [router]);

    const fetchDailyReports = async (userId: string) => {
        setLoading(true);
        const { data, error } = await supabase
            .from('daily_report')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Erro ao buscar acompanhamentos:', error);
            // Tratar o erro adequadamente
        } else {
            setReports(data || []);
        }
        setLoading(false);
    };

    if (!user) {
        return <p>Carregando informações do usuário</p>;
    }


    return (
        <div className="d-flex flex-column justify-content-center align-items-center pb-4">
            <NavPages nome="Acompanhamentos" />
        
            {loading ? (
                <p>Carregando acompanhamentos...</p>
            ) : reports.length === 0 ? (
                <p>Você ainda não registrou nenhum acompanhamento diário.</p>
            ) : (
                <ul className="d-flex flex-column gap-3 w-75 p-1 mb-3 overflow-auto rounded" style={{ marginBottom: '50px' }}>
                    {reports.map((report) => (
                        <li key={report.id} className="bg-light p-2 font-weight-normal">
                            <strong>Data do Relátorio:</strong>{' '}
                            {new Date(report.report_date).toLocaleDateString('pt-BR')}
                            <p>
                                <strong>Data da Cirurgia:</strong>{' '}
                                {new Date(report.surgery_date).toLocaleDateString('pt-BR')}
                            </p>
                            {report.pain_level !== null && (
                                <p>
                                    <strong>Nível de dor (0-10): </strong>{report.pain_level}
                                </p>
                            )}
                            {report.wellbeing && (
                                <p>
                                    <strong>Bem-estar:</strong> {report.wellbeing}
                                </p>
                            )}
                            {report.fever && (
                                <p>
                                    <strong>Teve Febre?: </strong>{report.fever}
                                </p>
                            )}
                            {report.wound_appearance && (
                                <p>
                                    <strong>Aparência da Ferida: </strong>{report.wound_appearance}
                                </p>
                            )}
                            {report.daily_activities && (
                                <p>
                                    <strong>Atividades Diárias: </strong>{report.daily_activities}
                                </p>
                            )}
                        </li>
                    ))}
                </ul>
            )}

            <BottomNavigation />
        </div>
    )
}