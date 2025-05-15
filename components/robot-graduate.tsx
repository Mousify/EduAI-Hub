export function RobotGraduate() {
  return (
    <div className="relative w-full max-w-[500px] h-[400px] bg-white rounded-xl overflow-hidden shadow-sm border border-blue-50 flex items-center justify-center">
      <div className="w-[280px] h-[280px] relative">
        {/* Robot Body */}
        <svg width="280" height="280" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Robot Head */}
          <rect x="90" y="100" width="100" height="100" rx="12" fill="#3B82F6" />

          {/* Robot Eyes */}
          <circle cx="120" cy="130" r="12" fill="white" />
          <circle cx="160" cy="130" r="12" fill="white" />

          {/* Robot Mouth */}
          <rect x="115" y="160" width="50" height="10" rx="5" fill="white" />

          {/* Robot Body */}
          <rect x="105" y="210" width="70" height="50" rx="8" fill="#3B82F6" />

          {/* Robot Arms */}
          <rect x="60" y="220" width="40" height="10" rx="5" fill="#3B82F6" />
          <rect x="180" y="220" width="40" height="10" rx="5" fill="#3B82F6" />

          {/* Graduation Cap Base */}
          <rect x="80" y="80" width="120" height="10" fill="#1E40AF" />

          {/* Graduation Cap Top */}
          <rect x="110" y="50" width="60" height="30" fill="#1E40AF" />

          {/* Tassel */}
          <rect x="140" y="30" width="3" height="20" fill="#1E40AF" />
          <rect x="143" y="30" width="15" height="3" fill="#F59E0B" />
          <rect x="155" y="33" width="3" height="10" fill="#F59E0B" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-white p-4">
        <p className="text-sm font-medium text-center text-blue-800">
          Daugiamodalinis mokymasis su tekstu, vaizdais ir balsu
        </p>
      </div>
    </div>
  )
}
