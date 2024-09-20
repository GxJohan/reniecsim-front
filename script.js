document.addEventListener('DOMContentLoaded', function() {
    const buscarDNILink = document.getElementById('buscarDNI');
    const listarTodosLink = document.getElementById('listarTodos');
    const busquedaDNIDiv = document.getElementById('busquedaDNI');
    const resultadoDiv = document.getElementById('resultado');
    const dniInput = document.getElementById('dniInput');
    const buscarButton = document.getElementById('buscarButton');

    buscarDNILink.addEventListener('click', function(e) {
        e.preventDefault();
        busquedaDNIDiv.style.display = 'block';
        resultadoDiv.innerHTML = '';
        buscarDNILink.classList.add('active');
        listarTodosLink.classList.remove('active');
    });

    listarTodosLink.addEventListener('click', function(e) {
        e.preventDefault();
        busquedaDNIDiv.style.display = 'none';
        listarTodos();
        listarTodosLink.classList.add('active');
        buscarDNILink.classList.remove('active');
    });

    buscarButton.addEventListener('click', buscarDNI);
    dniInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            buscarDNI();
        }
    });

    async function buscarDNI() {
        const dni = dniInput.value.trim();
        if (dni && dni.length === 8 && /^\d+$/.test(dni)) {
            try {
                const persona = await api.buscarPorDNI(dni);
                mostrarResultado(persona);
            } catch (error) {
                mostrarError(error.message);
            }
        } else {
            mostrarError('Por favor, ingrese un DNI válido de 8 dígitos.');
        }
    }

    async function listarTodos() {
        try {
            const personas = await api.listarTodos();
            mostrarListado(personas);
        } catch (error) {
            mostrarError(error.message);
        }
    }

    function mostrarResultado(persona) {
        resultadoDiv.innerHTML = `
            <h2 class="mb-3">Resultado de la búsqueda</h2>
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${persona.nombres} ${persona.apellidos}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">DNI: ${persona.dni}</h6>
                    <p class="card-text">
                        <strong>Dirección:</strong> ${persona.direccion}<br>
                        <strong>Ubigeo:</strong> ${persona.ubigeo}<br>
                        <strong>Fecha de Nacimiento:</strong> ${persona.fechaNacimiento}
                    </p>
                </div>
            </div>
        `;
    }

    function mostrarListado(personas) {
        let html = `
            <h2 class="mb-3">Listado de todas las personas</h2>
            <div class="table-responsive">
                <table class="table table-striped table-hover">
                    <thead class="table-dark">
                        <tr>
                            <th>DNI</th>
                            <th>Nombres</th>
                            <th>Apellidos</th>
                            <th>Fecha de Nacimiento</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        personas.forEach(persona => {
            html += `
                <tr>
                    <td>${persona.dni}</td>
                    <td>${persona.nombres}</td>
                    <td>${persona.apellidos}</td>
                    <td>${persona.fechaNacimiento}</td>
                </tr>
            `;
        });
        html += `
                    </tbody>
                </table>
            </div>
        `;
        resultadoDiv.innerHTML = html;
    }

    function mostrarError(mensaje) {
        resultadoDiv.innerHTML = `<div class="alert alert-danger" role="alert">${mensaje}</div>`;
    }
});