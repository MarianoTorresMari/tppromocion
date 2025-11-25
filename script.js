document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formulario-contacto');
    const btnConsultar = document.getElementById('btn-consultar');
    const datosGuardadosDiv = document.getElementById('datos-guardados');

    if (form) {
        form.addEventListener('submit', (event) => {
            // Evita que el formulario se envíe recargando la página, lo agregue para mas seguridad 
            event.preventDefault();

            //  Obtener los datos del formulario
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const localidad = document.getElementById('localidad').value;
            const recomendacion = document.getElementById('recomendacion').value;

            //  Crear un objeto con los datos
            const nuevoContacto = { nombre, email, localidad, recomendacion };

            //  Guardar los datos en el 'localStorage' del navegador asi no se borren cuando se reinicie la pagina, y quede almacenada de forma local
            let contactos = JSON.parse(localStorage.getItem('contactos')) || [];
            contactos.push(nuevoContacto);
            localStorage.setItem('contactos', JSON.stringify(contactos));

            //  Mostrar un mensaje de exito y limpiar el formulario
            alert('¡Gracias por tu mensaje! Tus datos ya fueron guardados.');
            form.reset();
        });
    }

    // Evento para cuando se hace clic en el botón "Consultar Datos Guardados"
    if (btnConsultar) {
        btnConsultar.addEventListener('click', () => {
            //  Obtener los datos guardados del localStorage
            const contactos = JSON.parse(localStorage.getItem('contactos')) || [];

            //  Limpiar el div donde se mostrarán los datos, esto evita problemas de que se superpongan datos
            datosGuardadosDiv.innerHTML = ''; 

            if (contactos.length === 0) {
                /* Gracias a esto no se envian solicitudes vacias, y siempre que no haya ningun dato guardado, no tenga que pasar por todo lo de mostrar el contacto */
                datosGuardadosDiv.innerHTML = '<p>No hay datos guardados aún.</p>';
            } else {
                // 3. Mostrar cada contacto guardado
                contactos.forEach(contacto => {
                    const contactoInfo = document.createElement('div');
                    contactoInfo.innerHTML = `
                        <p><strong>Nombre:</strong> ${contacto.nombre}</p>
                        <p><strong>Email:</strong> ${contacto.email}</p>
                        <p><strong>Localidad:</strong> ${contacto.localidad}</p>
                        <p><strong>Recomendado por:</strong> ${contacto.recomendacion}</p>
                        <hr>
                    `;
                    datosGuardadosDiv.appendChild(contactoInfo);
                });
            }
        });
    }
});