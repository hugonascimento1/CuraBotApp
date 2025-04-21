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
        <div className="bg-azul w-full flex flex-row px-4 py-4 shadow-xl h-40 justify-between items-center gap-3">
            <div className="flex flex-col justify-center items-start gap-3">
                <LogoBrancaCuraBot />
                <p className="text-white text-xl">Bem-vindo(a) Paciente!</p>
            </div>

            <button
                className="flex flex-row gap-1 bg-transparent border-2 border-white px-4 py-2 rounded text-white cursor-pointer"
                onClick={handleLogout}
            >
                <BiLogOut className="w-6 h-6" />
                Sair
            </button>

            {/* <h1 className="text-2xl text-white">Bem-vindo!</h1> */}
        </div>
    )
}