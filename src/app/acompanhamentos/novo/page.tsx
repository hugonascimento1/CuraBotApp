'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BottomNavigation from "@/components/BottomNavigation";
import NavPages from "@/components/NavPages";

import { supabase } from "@/utils/supabaseclient";

import { toast, Toaster } from "sonner";

export default function NovoAcompanhamentoPage() {
    const [user, setUSer] = useState<any>(null);
    const [surgeryDate, setSurgeryDate] = useState('');
    const [reportDate, setReportDate] = useState('');
    const [painLevel, setPainLevel] = useState<number | ''>('');
    const [wellbeing, setWellbeing] = useState('');
    const [fever, setFever] = useState('');
    const [woundAppearance, setWoundAppearance] = useState('');
    const [dailyActivities, setDailyActivities] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUSer(session?.user);
            if (!session?.user) {
                router.push('/auth/login');
            }
        };

        fetchSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUSer(session?.user);
            if (!session?.user) {
                router.push('/auth/login');
            }
        });

        return () => subscription?.unsubscribe();
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!user?.id) {
            setError('Usuário não autenticado.');
            setLoading(false);
            return;
        }

        const { data, error } = await supabase.from('daily_report').insert({
            user_id: user.id,
            surgery_date: surgeryDate,
            report_date: reportDate,
            pain_level: painLevel,
            wellbeing: wellbeing || null,
            fever: fever || null,
            wound_appearance: woundAppearance || null,
            daily_activities: dailyActivities || null
        });

        setLoading(false);

        if (error) {
            console.error('Erro ao salvar o acompanhamento: ', error);
            setError('Ocorreu um erro ao salvar o acompanhamento.');
            console.log('Objeto de erro completo: ', error)
        } else {
            toast.success('Acompanhamento diário registrado com sucesso!')
            // router.push('/acompanhamentos')
        }
    };

    if (!user) {
        return <p>Carregando...</p>
    }

    return (
        <div className="flex flex-col items-center justify-content-center">
            <NavPages nome="Adicionar Acompanhamento" />

            <Toaster
                position="top-center"
                toastOptions={{
                    style: {
                        background: '#22C55E',
                        color: '#FFFFFF',
                    },
                }}
            />

            {error && <p className="text-red-600">{error}</p>}

            <form onSubmit={handleSubmit} className="flex flex-col gap-3 justify-content-center items-center w-11/12 md:w-2/3 px-4 mt-4">
                <div className="flex flex-row gap-3 w-full">
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="surgery_date">Data da Cirurgia:</label>
                        <input
                            className="border-2 rounded h-9"
                            type="date"
                            id="surgery_date"
                            value={surgeryDate}
                            onChange={(e) => setSurgeryDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="report_date">Data de Hoje:</label>
                        <input
                            className="border-2 rounded h-9"
                            type="date"
                            id="report_date"
                            value={reportDate}
                            // defaultValue={new Date().toISOString().split('T')[0]}
                            onChange={(e) => setReportDate(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2 w-[100%]">
                    <label htmlFor="wellbeing">Bem-estar:</label>
                    <select className="border-2 rounded h-9" id="wellbeing" value={wellbeing} onChange={(e) => setWellbeing(e.target.value)}>
                        <option value="">Selecione</option>
                        <option value="muito bem">Muito bem</option>
                        <option value="bem">Bem</option>
                        <option value="regular">Regular</option>
                        <option value="mal">Mal</option>
                        <option value="muito mal">Muito mal</option>
                    </select>
                </div>

                <div className="flex flex-col gap-2 w-[100%]">
                    <label htmlFor="wound_appearance">Aparência da Ferida:</label>
                    <select
                        className="border-2 rounded h-9"
                        id="wound_appearance"
                        value={woundAppearance}
                        onChange={(e) => setWoundAppearance(e.target.value)}
                    >
                        <option value="">Selecione</option>
                        <option value="sem alterações">Sem alterações</option>
                        <option value="vermelha">Vermelha</option>
                        <option value="inchada">Inchada</option>
                        <option value="com secreção">Com secreção</option>
                        <option value="não consigo verificar">Não consigo verificar</option>
                    </select>
                </div>

                <div className="flex flex-row gap-3 w-full">
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="pain_level">Nível de dor (0-10):</label>
                        <select
                            className="border-2 rounded h-9"
                            id="pain_level"
                            value={painLevel}
                            onChange={(e) => setPainLevel(e.target.value === '' ? '' : parseInt(e.target.value, 10))}
                        >
                            <option value="">Selecione</option>
                            {Array.from({ length: 11 }, (_, i) => (
                                <option key={i} value={i}>
                                    {i}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="fever">Febre:</label>
                        <select className="border-2 rounded h-9" id="fever" value={fever} onChange={(e) => setFever(e.target.value)}>
                            <option value="">Selecione</option>
                            <option value="sim">Sim</option>
                            <option value="não">Não</option>
                            <option value="não verifiquei">Não verifiquei</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-col gap-2 w-[100%]">
                    <label htmlFor="daily_activities">Atividades Diárias:</label>
                    <select
                        className="border-2 rounded h-9"
                        id="daily_activities"
                        value={dailyActivities}
                        onChange={(e) => setDailyActivities(e.target.value)}
                    >
                        <option value="">Selecione</option>
                        <option value="sim">Sim</option>
                        <option value="com alguma dificuldade">Com alguma dificuldade</option>
                        <option value="não consegui">Não consegui</option>
                    </select>
                </div>

                <button type="submit" disabled={loading} className="bg-green-800 rounded p-4 flex text-center justify-center items-center text-white mt-3 h-12">
                    {loading ? 'Salvando...' : 'Salvar Acompanhamento'}
                </button>
            </form>

            <BottomNavigation />
        </div>
    )

}