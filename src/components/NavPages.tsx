import { BiArrowBack, BiArrowFromLeft, BiArrowFromRight } from "react-icons/bi";
import { LuChevronLeft, LuChevronsLeft } from "react-icons/lu";
import Link from "next/link";

interface NavPagesProps {
    nome: string;
}

export default function NavPages({ nome }: NavPagesProps) {
    return (
        <div className="bg-azul-custom w-100 d-flex flex-row justify-content-start align-items-center gap-4 shadow-xl text-white mb-4 ps-4 " style={{ width: '100%', height: '80px' }}>
            <Link href={'/'}>
                <LuChevronLeft className="h2 text-white" />
            </Link>
            <h3 className="h3">{nome}</h3>

        </div>
    )
}