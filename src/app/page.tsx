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
    <div className="flex flex-col justify-content-center items-center min-h-screen">
      <NavInicio />
      {/* <h1>Bem-vindo(a), {user?.email || 'Paciente'}!</h1> */}

      <div className="flex flex-col w-11/12 gap-4 justify-center items-center mt-10">
        <button
          onClick={() => router.push('/chatbot')}
          className="bg-pink-800 hover:bg-pink-900 cursor-pointer w-full h-32 p-5 rounded-2xl text-white text-lg font-normal flex flex-row justify-center items-center gap-2"
        >
          <PiRobot className="w-7 h-7" />
          Curabot Acompanhamento
        </button>

        <button
          onClick={() => router.push('/acompanhamentos')}
          className="bg-pink-800 hover:bg-pink-900 cursor-pointer w-full shadow-inner h-32 p-5 rounded-2xl text-white text-lg font-normal flex flex-row justify-center items-center gap-4"
        >
          <PiFolderOpen className="w-7 h-7" />
          <p className="text-start">Ver Acompanhamentos</p>
        </button>

        {/* <div className="flex flex-row w-full gap-4">
          <button
            onClick={() => router.push('/acompanhamentos/novo')}
            className="bg-pink-800 hover:bg-pink-900 cursor-pointer w-full h-32 p-5 rounded-2xl text-white text-lg font-normal flex flex-row justify-center items-center gap-4"
          >
            <PiCalendarPlus className="w-7 h-7" />
            <p className="text-start">Novo Registro</p>
          </button>


        </div> */}

      </div>

      <BottomNavigation />
    </div>
  );
}
