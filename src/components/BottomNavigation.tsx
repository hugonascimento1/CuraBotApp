'use client'

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
        <div className='mt-5 d-flex flex-row bg-white w-100 h-20 text-primary justify-content-around fixed-bottom' style={{ width: '100%', height: '80px' }}>
            <Link
                href='/'
                className={`d-flex flex-column justify-content-center align-items-center ${isActive('/') ? 'bg-light rounded my-2' : 'hover:text-secondary'}` }
                style={{ width: '25%', }}
            >
                <PiHouse className="w-8 h-8" style={{ width: '32px', height: '32px' }} />
            </Link>

            <Link
                href='/chatbot'
                className={`d-flex flex-column justify-content-center align-items-center ${isActive('/chatbot') ? 'bg-light rounded my-2' : 'hover:text-secondary'}`}
                style={{ width: '25%', }}
            >
                <PiRobot className="w-8 h-8" style={{ width: '32px', height: '32px' }} />
            </Link>

            <Link
                href='/acompanhamentos/novo'
                className={`d-flex flex-column justify-content-center align-items-center ${isActive('/acompanhamentos/novo') ? 'bg-light rounded my-2' : 'hover:text-secondary'}`}
                style={{ width: '25%', }}
            >
                <PiCalendarPlus className="w-8 h-8" style={{ width: '32px', height: '32px' }} />
            </Link>

            <Link
                href='/acompanhamentos'
                className={`d-flex flex-column justify-content-center align-items-center ${isActive('/acompanhamentos') ? 'bg-light rounded my-2' : 'hover:text-secondary'}`}
                style={{ width: '25%', }}
            >
                <PiFolderOpen className="w-8 h-8" style={{ width: '32px', height: '32px' }} />
            </Link>
        </div>
    )
}