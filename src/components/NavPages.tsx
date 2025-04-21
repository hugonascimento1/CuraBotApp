import { BiArrowBack, BiArrowFromLeft, BiArrowFromRight } from "react-icons/bi";
import { LuChevronLeft, LuChevronsLeft } from "react-icons/lu";
import Link from "next/link";

interface NavPagesProps {
    nome: string;
}

export default function NavPages({ nome }: NavPagesProps) {
    return (
        <div className="bg-azul w-full h-24 flex flex-row justify-start items-center gap-4 shadow-xl text-white mb-4 pl-4">
            <Link href={'/'}>
                <LuChevronLeft className="text-4xl" />
            </Link>
            <h1 className="text-xl">{nome}</h1>

        </div>
    )
}