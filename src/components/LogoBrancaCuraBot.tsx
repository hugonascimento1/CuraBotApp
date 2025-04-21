import { PiStethoscope } from "react-icons/pi";

export default function LogoBrancaCuraBot() {
    return (
        <div className="text-2xl font-semibold text-white border-3 rounded-3xl p-5 text-center flex items-center w-[170px]">
          <h1>Cura</h1>
          <div className="flex flex-row items-end">
            <h1>Bot</h1>
            <PiStethoscope className="text-purple-200 w-8 h-8" />
          </div>
        </div>
    )
}