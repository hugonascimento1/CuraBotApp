import { PiStethoscope } from "react-icons/pi";

export default function LogoBrancaCuraBot() {
    return (
        <div className="text-center p-4 border-white border border-3 border-white rounded w-170 d-flex text-2xl font-semibold text-white">
          <h1 className="">Cura</h1>
          <div className="d-flex flex-row align-items-end">
            <h1>Bot</h1>
            <PiStethoscope className="text-roxo-custom w-8 h-8" style={{ width: '32px', height: '32px' }} />
          </div>
        </div>
    )
}