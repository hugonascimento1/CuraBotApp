'use client'

import { useEffect, useState } from "react";
import BottomNavigation from "@/components/BottomNavigation";
import NavPages from "@/components/NavPages";
import { Standard } from "@typebot.io/nextjs";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { supabase } from "@/utils/supabaseclient";

export default function ChatbotPage() {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();
    const pathname = usePathname();
    const typebotId = process.env.NEXT_PUBLIC_TYPEBOT_ID;
    const typebotApiHost = process.env.NEXT_PUBLIC_TYPEBOT_APIHOST;

    useEffect(() => {
        const fetchSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user);
            if (!session?.user) {
                router.push('/auth/login');
            }
        };

        fetchSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user);
            if (!session?.user) {
                router.push('/auth/login');
            }
        });

        return () => subscription?.unsubscribe();
    }, [router]);

    if (!user?.id) {
        return <div>Carregando informações do usuário...</div>
    }

    const prefilledVariables = {
        userId: user.id,
    };

    return(
        <div className="bg-[#d9d9d9]">
            <NavPages nome="Chatbot" />
            <Standard 
                typebot={typebotId}
                apiHost={typebotApiHost}
                style={{ width: "100%", height: "650px", marginBottom: "8px" }}
                prefilledVariables={prefilledVariables}
            />
            <BottomNavigation />
        </div>
    )
}
