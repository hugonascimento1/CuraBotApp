import { PiStethoscope } from "react-icons/pi";

export default function LogoAzulCuraBot() {
    return (
        <div className="text-4xl font-semibold text-azul border-3 rounded-3xl p-5 text-center mt-28 mb-8 flex items-center">
            <h1>Cura</h1>
            <div className="flex flex-row items-end">
                <h1>Bot</h1>
                <PiStethoscope className="text-roxo w-8 h-8" />
            </div>
        </div>
    )
}