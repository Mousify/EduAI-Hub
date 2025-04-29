export function HeroImage() {
  return (
    <div className="relative w-full max-w-lg">
      <div className="absolute -top-4 -right-4 h-72 w-72 rounded-full bg-blue-100 mix-blend-multiply blur-xl filter"></div>
      <div className="absolute -bottom-8 -left-4 h-72 w-72 rounded-full bg-purple-100 mix-blend-multiply blur-xl filter"></div>
      <div className="relative">
        <div className="rounded-2xl border bg-white p-8 shadow-lg">
          <div className="mb-6 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8 text-blue-600"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-2 w-3/4 rounded bg-gray-200"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-24 rounded bg-blue-50 p-4">
                <div className="h-2 w-1/2 rounded bg-blue-200"></div>
                <div className="mt-2 h-12 rounded bg-blue-100"></div>
              </div>
              <div className="h-24 rounded bg-purple-50 p-4">
                <div className="h-2 w-1/2 rounded bg-purple-200"></div>
                <div className="mt-2 h-12 rounded bg-purple-100"></div>
              </div>
            </div>
            <div className="h-2 w-1/2 rounded bg-gray-200"></div>
            <div className="flex space-x-2">
              <div className="h-6 w-16 rounded bg-blue-500"></div>
              <div className="h-6 w-16 rounded bg-gray-200"></div>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute -right-4 -top-12 h-24 w-24 rounded-lg bg-yellow-100 p-2 shadow-md">
          <div className="h-2 w-12 rounded bg-yellow-300"></div>
          <div className="mt-2 h-12 rounded bg-yellow-200"></div>
        </div>
        <div className="absolute -bottom-12 -left-8 h-28 w-28 rounded-lg bg-green-100 p-2 shadow-md">
          <div className="h-2 w-16 rounded bg-green-300"></div>
          <div className="mt-2 h-16 rounded bg-green-200"></div>
        </div>
        <div className="absolute -right-12 bottom-8 h-20 w-20 rounded-lg bg-purple-100 p-2 shadow-md">
          <div className="h-2 w-10 rounded bg-purple-300"></div>
          <div className="mt-2 h-10 rounded bg-purple-200"></div>
        </div>
      </div>
    </div>
  )
}
