// Espera a que todo el contenido de la página se cargue antes de ejecutar el código
document.addEventListener('DOMContentLoaded', () => {

    // --- FUNCIONALIDAD DEL FORMULARIO DE CONTACTO ---
    const form = document.getElementById('formulario-contacto');
    const btnConsultar = document.getElementById('btn-consultar');
    const datosGuardadosDiv = document.getElementById('datos-guardados');

    // Evento para cuando se envía el formulario
    form.addEventListener('submit', (event) => {
        // Evita que el formulario se envíe de la forma tradicional (recargando la página)
        event.preventDefault();

        // 1. Obtener los datos del formulario
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const localidad = document.getElementById('localidad').value;
        const recomendacion = document.getElementById('recomendacion').value;

        // 2. Crear un objeto con los datos
        const nuevoContacto = { nombre, email, localidad, recomendacion };

        // 3. Guardar los datos en el 'localStorage' del navegador
        // El localStorage es como una pequeña base de datos que guarda información en el navegador del usuario
        let contactos = JSON.parse(localStorage.getItem('contactos')) || []; // Obtiene los contactos existentes o un array vacío
        contactos.push(nuevoContacto); // Agrega el nuevo contacto al array
        localStorage.setItem('contactos', JSON.stringify(contactos)); // Guarda el array actualizado en el localStorage

        // 4. Mostrar un mensaje de éxito y limpiar el formulario
        alert('¡Gracias por tu mensaje! Hemos guardado tus datos.');
        form.reset();
    });

    // Evento para cuando se hace clic en el botón "Consultar Datos Guardados"
    btnConsultar.addEventListener('click', () => {
        // 1. Obtener los datos guardados del localStorage
        const contactos = JSON.parse(localStorage.getItem('contactos')) || [];

        // 2. Limpiar el div donde se mostrarán los datos
        datosGuardadosDiv.innerHTML = ''; 

        if (contactos.length === 0) {
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
});

// Función para mostrar una sección específica y ocultar las demás
function mostrarSeccion(idSeccion) {
    // Oculta todas las secciones
    const secciones = document.querySelectorAll('.seccion-contenido');
    secciones.forEach(seccion => {
        seccion.style.display = 'none';
    });

    // Muestra la sección que se seleccionó
    const seccionActiva = document.getElementById(idSeccion);
    if (seccionActiva) {
        seccionActiva.style.display = 'block';
    }
}