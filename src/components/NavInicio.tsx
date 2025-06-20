import LogoBrancaCuraBot from "./LogoBrancaCuraBot";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { BiLogOut } from "react-icons/bi";

import { supabase } from "@/utils/supabaseclient";

export default function NavInicio() {
    const router = useRouter();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/auth/login')
    }

    return (
        <div className="bg-azul-custom w-100 d-flex flex-row px-4 py-4 shadow-lg align-items-center justify-content-between" style={{ height: '10rem' }}>
            <div className="d-flex flex-column justify-content-center align-items-start gap-3">
                <LogoBrancaCuraBot />
                <p className="text-white fs-5 mb-0">Bem-vindo(a) Paciente!</p>
            </div>

            <button
                className="d-flex flex-row align-items-center gap-2 btn btn-dark bg-transparent border border-2 border-white px-4 py-2 rounded text-white"
                onClick={handleLogout}
            >
                <BiLogOut style={{ width: '1.5rem', height: '1.5rem' }} />
                Sair
            </button>
        </div>
    )
}