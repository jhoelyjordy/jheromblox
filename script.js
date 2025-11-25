// Datos de ejemplo para las reseñas
let reviews = {
    movies: [
        {
            id: 1,
            title: "Dune: Parte Dos",
            image: "https://xl.movieposterdb.com/24_02/2024/15239678/xl_dune-part-two-movie-poster_8358ed56.jpg",
            genre: "Ciencia Ficción",
            year: 2024,
            rating: 5,
            review: "Una obra maestra del cine de ciencia ficción. La cinematografía es impresionante y la historia mantiene un ritmo perfecto.",
            user: "María López",
            date: "2024-03-15"
        },
        {
            id: 2,
            title: "Oppenheimer",
            image: "https://images.hoy.cr/wp-content/uploads/2024/01/Oppenheimer.jpeg",
            genre: "Drama Histórico",
            year: 2023,
            rating: 4,
            review: "Interpretación magistral de Cillian Murphy. Nolan demuestra una vez más su genialidad como director.",
            user: "Carlos Ruiz",
            date: "2024-02-20"
        }
    ],
    series: [
        {
            id: 1,
            title: "The Last of Us",
            image: "https://wallpapers.com/images/featured/the-last-of-us-4k-0w00hui3yqsi27q7.jpg",
            genre: "Drama Post-apocalíptico",
            year: 2023,
            rating: 5,
            review: "Una adaptación perfecta del videojuego. Pedro Pascal y Bella Ramsey tienen una química increíble.",
            user: "Ana García",
            date: "2024-01-10"
        },
        {
            id: 2,
            title: "Stranger Things",
            image: "https://images3.alphacoders.com/751/751563.jpg",
            genre: "Ciencia Ficción",
            year: 2016,
            rating: 4,
            review: "Una serie que mejora con cada temporada. Los personajes son entrañables y la nostalgia está bien lograda.",
            user: "David Martínez",
            date: "2024-03-05"
        },
        {
            id: 3,
            title: "berserk",
            image: "https://wallpapers.com/images/hd/berserk-manga-a11yqactt3h56znj.jpg",
            genre: "fantasia oscura",
            year: 1997,
            rating: 4,
            review: "Berserk es un manga creado por Kentaro Miura y posteriormente adaptado en anime, con un estilo épico fantástico y de fantasía oscura",
            user: "yerome",
            date: "2024-03-05"
        }
    ],
    games: [
        {
            id: 1,
            title: "Baldur's Gate 3",
            image: "https://4kwallpapers.com/images/wallpapers/baldurs-gate-3-pc-3440x1440-12716.jpeg",
            genre: "RPG",
            year: 2023,
            rating: 5,
            review: "Simplemente el mejor RPG que he jugado en años. La libertad que ofrece es increíble y la historia es cautivadora.",
            user: "Laura Fernández",
            date: "2024-02-28"
        },
        {
            id: 2,
            title: "The Legend of Zelda: Tears of the Kingdom",
            image: "https://wallpapers.com/images/hd/legend-of-zelda-2560-x-1451-background-2r4pop44o20nszga.jpg",
            genre: "Aventura",
            year: 2023,
            rating: 5,
            review: "Nintendo supera todas las expectativas. La creatividad y la exploración no tienen límites en este juego.",
            user: "Javier Rodríguez",
            date: "2024-01-15"
        }
    ]
};

// Inicialización cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Cargar reseñas iniciales
    loadReviews();
    
    // Configurar navegación por pestañas
    setupTabs();
    
    // Configurar sistema de calificación con estrellas
    setupStarRating();
    
    // Configurar el formulario de reseñas
    setupReviewForm();
});

// Función para cargar las reseñas en la interfaz
function loadReviews() {
    // Para cada categoría, cargar las reseñas correspondientes
    for (const category in reviews) {
        const grid = document.getElementById(`${category}-grid`);
        grid.innerHTML = ''; // Limpiar el grid
        
        // Crear tarjetas para cada reseña
        reviews[category].forEach((review, index) => {
            const card = createReviewCard(review, index);
            grid.appendChild(card);
        });
    }
}

// Función para crear una tarjeta de reseña
function createReviewCard(review, index) {
    const card = document.createElement('div');
    card.className = 'review-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    // Generar estrellas según la calificación
    let stars = '';
    for (let i = 0; i < 5; i++) {
        stars += i < review.rating ? '★' : '☆';
    }
    
    card.innerHTML = `
        <div class="card-image" style="background-image: url('${review.image}')">
            <div class="card-overlay">
                <h3 class="card-title">${review.title}</h3>
            </div>
        </div>
        <div class="card-content">
            <div class="card-meta">
                <span>${review.genre}</span>
                <span>${review.year}</span>
            </div>
            <div class="rating">${stars}</div>
            <p class="card-description">${review.review}</p>
            <div class="card-footer">
                <div class="user-info">
                    <div class="user-avatar"></div>
                    <span>${review.user}</span>
                </div>
                <div class="review-date">${formatDate(review.date)}</div>
            </div>
        </div>
    `;
    
    return card;
}

// Función para formatear la fecha
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
}

// Configurar la navegación por pestañas
function setupTabs() {
    const tabs = document.querySelectorAll('.tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remover clase active de todas las pestañas
            tabs.forEach(t => t.classList.remove('active'));
            
            // Añadir clase active a la pestaña clickeada
            this.classList.add('active');
            
            // Ocultar todos los contenidos
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Mostrar el contenido correspondiente
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Configurar el sistema de calificación con estrellas
function setupStarRating() {
    const stars = document.querySelectorAll('.star');
    const ratingInput = document.getElementById('rating');
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            ratingInput.value = rating;
            
            // Actualizar la visualización de las estrellas
            stars.forEach(s => {
                if (parseInt(s.getAttribute('data-rating')) <= rating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
        
        // Efecto hover
        star.addEventListener('mouseover', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            
            stars.forEach(s => {
                if (parseInt(s.getAttribute('data-rating')) <= rating) {
                    s.style.color = '#ffd700';
                } else {
                    s.style.color = '#555';
                }
            });
        });
        
        star.addEventListener('mouseout', function() {
            const currentRating = parseInt(ratingInput.value) || 0;
            
            stars.forEach(s => {
                if (parseInt(s.getAttribute('data-rating')) <= currentRating) {
                    s.style.color = '#ffd700';
                } else {
                    s.style.color = '#555';
                }
            });
        });
    });
}

// Configurar el formulario de reseñas
function setupReviewForm() {
    const form = document.getElementById('review-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener los valores del formulario
        const category = document.getElementById('category').value;
        const title = document.getElementById('title').value;
        const image = document.getElementById('image').value;
        const genre = document.getElementById('genre').value;
        const year = parseInt(document.getElementById('year').value);
        const rating = parseInt(document.getElementById('rating').value);
        const review = document.getElementById('review').value;
        const user = document.getElementById('user').value;
        
        // Validar que se haya seleccionado una calificación
        if (rating === 0) {
            alert('Por favor, selecciona una calificación con las estrellas.');
            return;
        }
        
        // Crear nueva reseña
        const newReview = {
            id: reviews[category].length + 1,
            title,
            image,
            genre,
            year,
            rating,
            review,
            user,
            date: new Date().toISOString().split('T')[0] // Fecha actual en formato YYYY-MM-DD
        };
        
        // Añadir la nueva reseña
        reviews[category].push(newReview);
        
        // Recargar las reseñas
        loadReviews();
        
        // Mostrar la pestaña correspondiente
        document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.remove('active');
            if (tab.getAttribute('data-tab') === category) {
                tab.classList.add('active');
            }
        });
        
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(category).classList.add('active');
        
        // Resetear el formulario
        form.reset();
        document.getElementById('rating').value = 0;
        document.querySelectorAll('.star').forEach(star => {
            star.classList.remove('active');
            star.style.color = '#555';
        });
        
        // Mostrar mensaje de éxito
        alert('¡Reseña publicada con éxito!');
    });
}