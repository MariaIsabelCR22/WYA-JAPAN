// Filtros y productos
const filtros = document.querySelectorAll('input[name="collection-filter"]');
const productos = document.querySelectorAll('.catalog-card');

const buscador = document.getElementById('product-search');
const contador = document.getElementById('product-count');

// Actualizar productos segun la busqueda y el filtro
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

        // Revisar si coincide con lo que se busca
        const coincideBusqueda = nombre.includes(texto);
        let coincideFiltro = false;
        // Mostrar todos los productos
        if (filtroActivo.id === 'filter-all') {
            coincideFiltro = true;
        }
        // Filtrar cinturones
        else if (
            filtroActivo.id === 'filter-belts' &&
            producto.classList.contains('category-cinturones')
        ) {
            coincideFiltro = true;
        }
        // Filtrar anillos
        else if (
            filtroActivo.id === 'filter-rings' &&
            producto.classList.contains('category-anillos')
        ) {
            coincideFiltro = true;
        }
        // Filtrar pircings
        else if (
            filtroActivo.id === 'filter-pircings' &&
            producto.classList.contains('category-pircings')
        ) {
            coincideFiltro = true;
        }
        // Filtrar collares
        else if (
            filtroActivo.id === 'filter-necklaces' &&
            producto.classList.contains('category-collares')
        ) {
            coincideFiltro = true;
        }
        // Filtrar sombreros
        else if (
            filtroActivo.id === 'filter-hats' &&
            producto.classList.contains('category-sombreros')
        ) {
            coincideFiltro = true;
        }
        // Filtrar lentes
        else if (
            filtroActivo.id === 'filter-glasses' &&
            producto.classList.contains('category-lentes')
        ) {
            coincideFiltro = true;
        }
        // Mostrar solo los productos que coincidan
        if (coincideBusqueda && coincideFiltro) {
            producto.style.display = '';
            cantidadVisible++;
        }
        else {
            producto.style.display = 'none';
        }
    });
    // Actualizar la cantidad de productos
    contador.textContent = `${cantidadVisible} ${cantidadVisible === 1 ? 'PRODUCTO' : 'PRODUCTOS'}`;
}
// Activar los filtros
filtros.forEach(filtro => {
    filtro.addEventListener('change', actualizarProductos);
});
// Activar el buscador
buscador.addEventListener('input', actualizarProductos);
// Mostrar los productos al cargar
actualizarProductos();