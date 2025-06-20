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

      <div className="d-flex flex-column w-100 gap-3 justify-content-center align-items-center mt-5" style={{ maxWidth: '91.666%' }}>
        <button
          onClick={() => router.push('/chatbot')}
          className="btn btn-rosa-custom w-100 py-5 px-4 rounded-3xl text-white fs-5 fw-normal d-flex flex-row justify-content-center align-items-center gap-2"
          style={{ height: '128px' }}
        >
          <RiRobot2Line style={{ width: '28px', height: '28px' }} />
          Curabot Acompanhamento
        </button>

        <button
          onClick={() => router.push('/acompanhamentos')}
          className="btn btn-rosa-custom w-100 py-5 px-4 rounded-3xl text-white fs-5 fw-normal d-flex flex-row justify-content-center align-items-center gap-3 shadow-inner"
          style={{ height: '128px' }}
        >
          <PiFolderOpen style={{ width: '28px', height: '28px' }} />
          <p className="text-start mb-0">Ver Acompanhamentos</p>
        </button>

        {/* <div className="d-flex flex-row w-100 gap-3">
          <button
            onClick={() => router.push('/acompanhamentos/novo')}
            className="btn btn-rosa-custom w-100 py-5 px-4 rounded-3xl text-white fs-5 fw-normal d-flex flex-row justify-content-center align-items-center gap-3"
            style={{ height: '128px' }}
          >
            <PiCalendarPlus style={{ width: '28px', height: '28px' }} />
            <p className="text-start mb-0">Novo Registro</p>
          </button>
        </div> */}
      </div>

      <BottomNavigation />
    </div>
  );
}
