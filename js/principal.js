window.addEventListener('load', function() {

    const msgSuccess = this.document.getElementById('msgSuccess');
    const btnCerrarSesion = this.document.getElementById('btnCerrarSesion');

    // recuperar nombre de usuario
    const result = JSON.parse(this.localStorage.getItem('result'));

    // mostrar nombre de usuario en alerta
    mostrarAlerta(`Bienvenido ${result.nombreUsuario}`, msgSuccess);

    // listener para cerrar sesión
    btnCerrarSesion.addEventListener('click', cerrarSesion);
});

function mostrarAlerta(mensaje, msgSuccess) {
    msgSuccess.innerHTML = mensaje;
    msgSuccess.style.display = 'block';
}

async function cerrarSesion() {

    const url = 'http://localhost:8082/login/cerrar-async';

    const request = {
        tipoDocumento: localStorage.getItem("tipoDocumento"),
        numeroDocumento: localStorage.getItem("numeroDocumento")
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });

        // validar respuesta
        const result = await response.json();
        console.log('Respuesta del servidor: ', result);

        if(result.resultado){
            localStorage.clear();
            window.location.replace('index.html');
        }

    } catch (error) {
        
        console.log('Error: Ocurrió un problema con la autenticación', error);

    }

}