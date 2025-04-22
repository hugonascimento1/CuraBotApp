import { PiStethoscope } from "react-icons/pi";

export default function LogoAzulCuraBot() {
    return (
        // <div className="text-4xl font-semibold text-azul-custom border-3 rounded-3xl p-5 text-center mt-28 mb-8 flex items-center">
        <div className="display-4 font-weight-semibold text-azul-custom border border-azul-custom border-3 rounded p-4 text-center mt-5 mb-3 d-flex align-items-center">
            <h1>Cura</h1>
            <div className="d-flex flex-row align-items-end">
                <h1>Bot</h1>
                <PiStethoscope className="text-roxo-custom w-8 h-8"  />
            </div>
        </div>
    )
}