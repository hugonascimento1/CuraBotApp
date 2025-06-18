'use client'

import {
  useState,
  useEffect,
} from "react";
import { createClient } from "@supabase/supabase-js";
import {
  usePathname,
  useRouter
} from "next/navigation";
import {
  PiStethoscope,
  PiHouse,
  PiRobot,
  PiCalendarPlus,
  PiFolderOpen
} from "react-icons/pi";
import BottomNavigation from "@/components/BottomNavigation";
import NavInicio from "@/components/NavInicio";

import { supabase } from "@/utils/supabaseclient";
import { RiRobot2Line } from "react-icons/ri";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user);
      if (!session?.user) {
        router.push('auth/login')
      }
    };

    fetchSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user);
      if (!session?.user) {
        router.push('/auth/login')
      }
    });

    return () => subscription?.unsubscribe();
  }, [router])

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <NavInicio />
      {/* <h1>Bem-vindo(a), {user?.email || 'Paciente'}!</h1> */}

      <div className="d-flex flex-column w-75 gap-4 justify-content-center align-items-center mt-4 mb-4" style={{ width: '90%' }}>
        <button
          onClick={() => router.push('/chatbot')}
          className="btn-rosa-custom w-100 h-32 p-5 rounded-2xl text-white text-lg font-normal d-flex justify-content-center align-items-center gap-2 rounded"
        >
          <RiRobot2Line className="w-7 h-7" style={{ width: '28px', height: '28px' }} />
          Curabot Acompanhamento
        </button>

        <button
          onClick={() => router.push('/acompanhamentos')}
          className="btn-rosa-custom h-32 p-5 rounded text-white text-lg font-normal d-flex justify-content-center align-items-center gap-3 flex-grow-1"
          style={{}}
        >
          <PiFolderOpen className="w-7 h-7" style={{ width: '28px', height: '28px' }} />
          <p className="text-start mb-0">Ver Acompanhamentos</p>
        </button>

        {/* <div className="d-flex flex-row w-100 gap-4 flex-wrap" style={{ width: '100%', height: '' }}>
          <button
            onClick={() => router.push('/acompanhamentos/novo')}
            className="btn-rosa-custom h-32 p-5 rounded text-white text-lg font-normal d-flex justify-content-center align-items-center gap-3 flex-grow-1"
            style={{}}
          >
            <PiCalendarPlus className="w-7 h-7" style={{ width: '28px', height: '28px' }} />
            <p className="text-start mb-0">Novo Registro</p>
          </button>


        </div> */}

      </div>

      <BottomNavigation />
    </div>
  );
}
