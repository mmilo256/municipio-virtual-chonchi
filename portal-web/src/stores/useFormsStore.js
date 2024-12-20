import { create } from 'zustand'

const useFormsStore = create((set) => ({
    inputs: [],
    setInputs: (data) => set(({
        inputs: data
    })),
}))

export default useFormsStore