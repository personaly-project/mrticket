import { useState } from 'react'

export function useSelector<T>(entityPool: T[]): [T | null, (target: number) => void, boolean, () => void] {

    const [makeNew, setMakeNew] = useState<boolean>(false)
    const [currentSelected, setCurrentSelected] = useState<T | null>(null)

    const updateCurrent = (target: number) => {
        if (target >= entityPool.length) {
            setCurrentSelected(entityPool[entityPool.length - 1])
            return
        } else if (target < 0) {
            setCurrentSelected(null)
            return
        } else {
            setCurrentSelected(entityPool[target])
        }
    }

    const toggleMakeNew = () => {
        setMakeNew(prev => !prev)
        setCurrentSelected(null)
    }

    return [currentSelected, updateCurrent, makeNew, toggleMakeNew]
}