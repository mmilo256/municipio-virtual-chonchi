import { create } from 'zustand'

const useFormsStore = create((set) => ({
    inputsValues: {},
    setInputsValues: (data) => set(({
        inputsValues: data
    }))
}))

export default useFormsStore