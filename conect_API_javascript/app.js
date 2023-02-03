let pagina = 1;
const btnBefore = document.getElementById('btnAnterior');
const btnAfter = document.getElementById('btnSiguiente');

btnAfter.addEventListener('click', () =>{
    if (pagina < 1000) {
        pagina++
        cargarPeliculas()
    }
})

btnBefore.addEventListener('click', () =>{
    if (1 < pagina) {
        pagina--
        cargarPeliculas()
    }
})

const cargarPeliculas = async () => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=738c434172dc53fff53007b183c638a5&page=${pagina}`);
        console.log(response)
        let peliculas = '';
        if (response.status === 200) {
            const data = await response.json();
            data.results.forEach(pelicula => {
                peliculas += `
                <div class="pelicula">
                    <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                    <h3 class="titulo">${pelicula.title}</h3>
                </div>
                `
            });
            document.getElementById('contenedor').innerHTML = peliculas;
        } else if (response.status === 401) {
            throw new Error('key invalido')
        } else if (response.status === 404) {
            throw new Error('Movie Not Found')
        } else {
            throw new Error('Not Found error')
        }
    } catch (error) {
        console.log(error)
    } 
}

cargarPeliculas()
