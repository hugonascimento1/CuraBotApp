import { PiStethoscope } from "react-icons/pi";

export default function LogoAzulCuraBot() {
   return (
    <div className="display-4 fw-semibold text-azul-custom border border-3 border-azul-custom rounded-pill p-4 text-center mt-5 mb-4 d-flex align-items-center justify-content-center">
        <h1 className="mb-0">Cura</h1>
        <div className="d-flex flex-row align-items-end">
            <h1 className="mb-0">Bot</h1>
            <PiStethoscope className="text-roxo-custom ms-1" style={{ width: '2rem', height: '2rem' }} />
        </div>
    </div>
)
}