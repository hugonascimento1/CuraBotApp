import { 
    usePathname, 
    useRouter 
} from "next/navigation"
import Link from "next/link"
import { 
    PiHouse, 
    PiRobot, 
    PiCalendarPlus, 
    PiFolderOpen 
} from "react-icons/pi";

export default function BottomNavigation() {
    const router = useRouter();
    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname === path;
    }

    return (
        <div className="mt-5 flex flex-row bg-white w-full h-20 text-azul justify-content-around fixed bottom-0">
            <Link
                href='/'
                className={`flex flex-col justify-center items-center w-1/4 ${isActive('/') ? 'bg-gray-200 rounded-full my-2' : 'hover:text-gray-500'}`}
            >
                <PiHouse className="w-8 h-8" />
            </Link>

            <Link
                href='/'
                className={`flex flex-col justify-center items-center w-1/4 ${isActive('/chatbot') ? 'bg-gray-200 rounded-full my-2' : 'hover:text-gray-500'}`}
            >
                <PiRobot className="w-8 h-8" />
            </Link>

            <Link
                href='/acompanhamentos/novo'
                className={`flex flex-col  justify-center items-center w-1/4 ${isActive('/acompanhamentos/novo') ? 'bg-gray-200 rounded-full my-2' : 'hover:text-gray-500'}`}
            >
                <PiCalendarPlus className="w-8 h-8" />
            </Link>

            <Link
                href='/acompanhamentos'
                className={`flex flex-col justify-center items-center w-1/4 ${isActive('/acompanhamentos') ? 'bg-gray-200 rounded-full my-2' : 'hover:text-gray-500'}`}
            >
                <PiFolderOpen className="w-8 h-8" />
            </Link>
        </div>
    )
}