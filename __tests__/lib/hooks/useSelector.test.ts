import { useSelector } from "@/lib/hooks";
import { renderHook, act } from "@testing-library/react-hooks"

interface ISample {
    id: number
}

let samplePool: ISample[]

describe('useSelector hook', () => {

    beforeEach(() => {
        samplePool = [
            {
                id: 0
            }, {
                id: 1
            }, {
                id: 2
            }
        ]
    })

    describe("Can select from existing options", () => {

        it("starts without any of the options being selected", () => {
            const { result } = renderHook(() => useSelector(samplePool))
            const [selected] = result.current
            expect(selected).toBeNull()
        })

        it("can select a valid option", () => {
            const { result } = renderHook(() => useSelector(samplePool))
            const [_, selectExisting] = result.current

            act(() => {
                selectExisting(2)
            })

            expect(result.current[0]).toEqual({
                id: 2
            })
        })
    })

    describe("Passing invalid option to select", () => {

        it("set selected to the last element when selecting an invalid option greater than the number of the available options", () => {
            const { result } = renderHook(() => useSelector(samplePool))
            const [_, selectExisting] = result.current

            act(() => {
                selectExisting(10)
            })

            expect(result.current[0]).toEqual(samplePool[samplePool.length - 1])
        })

        it("set selected to null if a negative option is passed", () => {
            const { result } = renderHook(() => useSelector(samplePool))
            const [_, selectExisting] = result.current

            act(() => {
                selectExisting(-10)
            })

            expect(result.current[0]).toBeNull()
        })
    })

    describe("Can trigger the makeNew state", () => {
        it("defaults flag to false", () => {
            const { result } = renderHook(() => useSelector(samplePool))
            const [_, __, makeNew] = result.current

            expect(makeNew).toEqual(false)
        })
        it("can be toggled", () => {
            const { result } = renderHook(() => useSelector(samplePool))
            const [_, __, ___, toggleMakeNew] = result.current

            act(() => {
                toggleMakeNew()
            })

            expect(result.current[2]).toEqual(true)

            act(() => {
                toggleMakeNew()
            })

            expect(result.current[2]).toEqual(false)
        })
    })
})