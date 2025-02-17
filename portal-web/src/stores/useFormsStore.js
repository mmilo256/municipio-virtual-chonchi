import { create } from 'zustand'

const useFormsStore = create((set) => ({
    inputsValues: {},
    docsValues: [],
    setInputsValues: (data) => set(({
        inputsValues: data
    })),
    setDocsValues: (docs) => set(({
        docsValues: docs
    }))
}))

export default useFormsStore