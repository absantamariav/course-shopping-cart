const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListener();
function cargarEventListener() {
    listaCursos.addEventListener('click', agregarCurso);
    carrito.addEventListener('click', actualizarCurso);
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarHTML();
    });
}

function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

function actualizarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
    } else if (e.target.classList.contains('aumentar-curso')) {
        const cursoId = e.target.getAttribute('data-id');
        const articulos = articulosCarrito.map(curso => {
            if (curso.id === cursoId) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        })
    } else if (e.target.classList.contains('disminuir-curso')) {
        const cursoId = e.target.getAttribute('data-id');
        const articulos = articulosCarrito.map(curso => {
            if (curso.id === cursoId && curso.cantidad > 1) {
                curso.cantidad--;
                return curso;
            } else {
                return curso;
            }
        })
    }
    carritoHTML();
    calcularSubtotal()
}

function leerDatosCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    const existeArticulo = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existeArticulo) {
        const articulos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        })
        articulosCarrito = [...articulos];
    } else {
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    carritoHTML();
    calcularSubtotal();
}

function carritoHTML() {
    limpiarHTML();
    articulosCarrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="80px">
            </td>
            <td>
                ${titulo}
            </td><td>
                ${precio}
            </td><td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="disminuir-curso" data-id="${id}"> - </a>
            </td>
            <td>
                <a href="#" class="aumentar-curso" data-id="${id}"> + </a>
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `;
        contenedorCarrito.appendChild(row);
    });
}

function limpiarHTML() {
    while (contenedorCarrito.firstElementChild) {
        contenedorCarrito.firstElementChild.remove();
    }
}

function calcularSubtotal() {
    let subTotal = 0;
    articulosCarrito.forEach(curso => {
        const precioNumero = Number(curso.precio.slice(1))
        subTotal += precioNumero * curso.cantidad;
    });
    const subTotalHtml = carrito.querySelector('.subtotal-html')
    subTotalHtml.innerHTML = `SUBTOTAL: $ ${subTotal}`;
    carrito.appendChild(filaNueva);
}