import { PiStethoscope } from "react-icons/pi";

export default function LogoBrancaCuraBot() {
  return (
    <div className="fs-3 fw-semibold text-white border border-3 rounded-5 p-3 text-center d-flex align-items-center">
      <h3 className="mb-0">Cura</h3>
      <div className="d-flex flex-row align-items-end">
        <h3 className="mb-0">Bot</h3>
        <PiStethoscope className="text-purple-200 ms-1" style={{ width: '32px', height: '32px' }} />
      </div>
    </div>
  )
}