import { useState } from "react";

export const useForm = (objetoInicial = {}) => {
    const [form, setForm] = useState(objetoInicial)

    const change = ({ target }) => {
        const { name, value } = target;

        setForm({
            ...form,
            [name]: value
        })

    }

    return {
        form,
        change
    }

}