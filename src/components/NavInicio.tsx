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
        <div className="bg-azul-custom w-100 d-flex flex-row p-4 shadow-lg h-40 justify-content-between align-items-center gap-3">
            <div className="d-flex flex-column justify-content-center align-items-start gap-3">
                <LogoBrancaCuraBot />
                <p className="text-white h4">Bem-vindo(a) Paciente!</p>
            </div>

            <button
                className="d-flex align-items-center gap-1 btn btn-outline-light px-4 py-2 rounded"
                onClick={handleLogout}
            >
                <BiLogOut className="w-6 h-6" style={{ width: '28px', height: '28px' }} />
                Sair
            </button>

            {/* <h1 className="text-2xl text-white">Bem-vindo!</h1> */}
        </div>
    )
}