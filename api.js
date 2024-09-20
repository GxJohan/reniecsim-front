const api = {
    buscarPorDNI: async (dni) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/buscar/${dni}`);
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                throw new Error('No se encontró ninguna persona con ese DNI.');
            }
            throw new Error('Error al buscar el DNI. Por favor, intente nuevamente.');
        }
    },

    listarTodos: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/todos`);
            return response.data;
        } catch (error) {
            throw new Error('Error al obtener la lista de personas. Por favor, intente nuevamente.');
        }
    }
};