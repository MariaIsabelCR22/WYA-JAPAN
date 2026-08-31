const filtros = document.querySelectorAll('input[name="collection-filter"]');
const productos = document.querySelectorAll('.catalog-card');

const buscador = document.getElementById('product-search');
const contador = document.getElementById('product-count');

function actualizarProductos() {

    const texto = buscador.value.toLowerCase().trim();

    const filtroActivo = document.querySelector(
        'input[name="collection-filter"]:checked'
    );

    let cantidadVisible = 0;

    productos.forEach(producto => {

        const nombre = producto
            .querySelector('.catalog-info h3')
            .textContent
            .toLowerCase();

        const coincideBusqueda = nombre.includes(texto);

        let coincideFiltro = false;

        if (filtroActivo.id === 'filter-all') {
            coincideFiltro = true;
        }

        else if (
            filtroActivo.id === 'filter-pants' &&
            producto.classList.contains('category-pantalones')
        ) {
            coincideFiltro = true;
        }

        else if (
            filtroActivo.id === 'filter-shirts' &&
            producto.classList.contains('category-camisas')
        ) {
            coincideFiltro = true;
        }

        else if (
            filtroActivo.id === 'filter-skirts' &&
            producto.classList.contains('category-faldas')
        ) {
            coincideFiltro = true;
        }

        else if (
            filtroActivo.id === 'filter-coats' &&
            producto.classList.contains('category-abrigos')
        ) {
            coincideFiltro = true;
        }

        if (coincideBusqueda && coincideFiltro) {

            producto.style.display = '';
            cantidadVisible++;

        }

        else {

            producto.style.display = 'none';

        }
    });
    contador.textContent = `${cantidadVisible} ${cantidadVisible === 1 ? 'PRODUCTO' : 'PRODUCTOS'}`;
}
filtros.forEach(filtro => {
    filtro.addEventListener('change', actualizarProductos);
});
buscador.addEventListener('input', actualizarProductos);
actualizarProductos();