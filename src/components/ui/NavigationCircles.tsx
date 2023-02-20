import React, { useCallback, useEffect, useState } from "react"
import { CheckIcon } from "@heroicons/react/20/solid"

interface NavigationCirclesProps {
  numberOfSteps: number
  currentStepIndex: number
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

const NavigationCircles: React.FC<NavigationCirclesProps> = ({
  currentStepIndex,
  numberOfSteps,
}) => {
  return (
    <div className="mx-auto max-w-7xl p-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="align-center justify-items-center items-center text-center">
          <nav aria-label="Progress">
            <ol
              role="list"
              className="flex align-center justify-items-center text-center items-center"
            >
              {Array(numberOfSteps)
                .fill(0)
                .map((step, stepIdx) => {
                  const status =
                    stepIdx < currentStepIndex
                      ? "complete"
                      : stepIdx === currentStepIndex
                      ? "current"
                      : "upcoming"
                  return (
                    <li
                      key={`${step.name}-${stepIdx}`}
                      className={classNames(
                        stepIdx !== numberOfSteps - 1 ? "pr-8 sm:pr-20" : "",
                        "relative"
                      )}
                    >
                      {status === "complete" ? (
                        <>
                          <div
                            className="absolute inset-0 flex items-center"
                            aria-hidden="true"
                          >
                            <div className="h-0.5 w-full bg-purple-medium" />
                          </div>
                          <a
                            href="#"
                            className="relative flex h-8 w-8 items-center justify-center rounded-full bg-purple-medium hover:bg-purple-dark"
                          >
                            <CheckIcon
                              className="h-5 w-5 text-purple-medium"
                              aria-hidden="true"
                            />
                            <span className="sr-only">{step.name}</span>
                          </a>
                        </>
                      ) : status === "current" ? (
                        <>
                          <div
                            className="absolute inset-0 flex items-center"
                            aria-hidden="true"
                          >
                            <div className="h-0.5 w-full bg-purple-medium" />
                          </div>
                          <a
                            href="#"
                            className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-purple-medium bg-white"
                            aria-current="step"
                          >
                            <span
                              className="h-2.5 w-2.5 rounded-full bg-purple-medium"
                              aria-hidden="true"
                            />
                            <span className="sr-only">{step.name}</span>
                          </a>
                        </>
                      ) : (
                        <>
                          <div
                            className="absolute inset-0 flex items-center"
                            aria-hidden="true"
                          >
                            <div className="h-0.5 w-full bg-purple-medium" />
                          </div>
                          <a
                            href="#"
                            className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-purple-medium bg-white hover:border-purple-medium"
                          >
                            <span
                              className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-purple-medium"
                              aria-hidden="true"
                            />
                            <span className="sr-only">{step.name}</span>
                          </a>
                        </>
                      )}
                    </li>
                  )
                })}
            </ol>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default NavigationCircles
