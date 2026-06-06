import React from 'react'

interface Step { label: string; index: number }
const STEPS: Step[] = [
  { label: 'Details', index: 0 },
  { label: 'Address', index: 1 },
  { label: 'Team',    index: 2 },
]

interface OnboardingStepperProps { current: 0 | 1 | 2 }

export const OnboardingStepper: React.FC<OnboardingStepperProps> = ({ current }) => {
  return (
    <div className="relative flex items-start justify-between mb-10 px-2">
      {/* connector line */}
      <div className="absolute top-[18px] left-0 right-0 h-[2px] bg-gray-300 z-0" />

      {STEPS.map((step) => {
        const done   = step.index < current
        const active = step.index === current
        return (
          <div key={step.index} className="relative z-10 flex flex-col items-center gap-2" style={{ flex: 1 }}>
            {/* dot */}
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all
                ${active ? 'bg-cyan-400 border-cyan-400 shadow-lg shadow-cyan-200'
                : done   ? 'bg-cyan-400 border-cyan-400'
                :          'bg-gray-300 border-gray-300'}`}
            >
              {done ? (
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <div className={`w-3 h-3 rounded-full ${active ? 'bg-white' : 'bg-gray-400'}`} />
              )}
            </div>
            {/* label */}
            <span className={`text-sm font-semibold ${active ? 'text-cyan-500' : 'text-gray-500'}`}>
              {step.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
