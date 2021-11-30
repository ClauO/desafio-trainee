!(function(d){

  // Variables para apuntar a nuestra clase base, obtener elementos de carrusel, contar cuántos elementos de carrusel hay, establecer la diapositiva en 0 (que es el número que nos dice en qué fotograma estamos) y establecer el movimiento en verdadero, lo que deshabilita la interactividad.
  var carouselItem = "carousel__photo";
      items = d.getElementsByClassName(carouselItem),
      totalItems = items.length,
      slide = 0,
      moving = true; 
  
  // Para inicializar el carrusel, queremos actualizar el DOM con nuestras propias clases.

  function setInitialClasses() {

  //Apunte a los elementos último, inicial y siguiente y déles la clase relevante.
  // Esto supone que hay tres o más elementos.
    items[totalItems - 1].classList.add("prev");
    items[0].classList.add("active");
    items[1].classList.add("next");
  }

  // Establecer eventos de clic en botones de navegación
  function setEventListeners() {
    var next = d.getElementsByClassName('carousel__button--next')[0],
        prev = d.getElementsByClassName('carousel__button--prev')[0];

    next.addEventListener('click', moveNext);
    prev.addEventListener('click', movePrev);
  }

  // Deshabilite la interacción configurando 'mover' en verdadero durante la misma duración que nuestra transición (0.5s = 500ms)
  function disableInteraction() {
    moving = true;

    setTimeout(function(){
      moving = false
    }, 500);
  }

  function moveCarouselTo(slide) {

    // Comprueba si el carrusel se está moviendo, si no, permita la interacción
    if(!moving) {

      //deshabilita temporalmente la interactividad
      disableInteraction();

      // Establece de forma preventiva variables para la diapositiva actual, siguiente y anterior, así como para la diapositiva siguiente o anterior potencial.
      var newPrevious = slide - 1,
          newNext = slide + 1,
          oldPrevious = slide - 2,
          oldNext = slide + 2;

      // Prueba si el carrusel tiene más de tres elementos
      if ((totalItems - 1) > 2) {

      // Comprueba si la nueva diapositiva potencial está fuera de los límites y establece los números de diapositiva
        if (newPrevious <= 0) {
          oldPrevious = (totalItems - 1);
        } else if (newNext >= (totalItems - 1)){
          oldNext = 0;
        }

      // Comprueba si la diapositiva actual está al principio o al final y establece el número de diapositiva
        if (slide === 0) {
          newPrevious = (totalItems - 1);
          oldPrevious = (totalItems - 2);
          oldNext = (slide + 1);
        } else if (slide === (totalItems -1)) {
          newPrevious = (slide - 1);
          newNext = 0;
          oldNext = 1;
        }

      // restablecec las clases predeterminadas, según la diapositiva actual, 
        items[oldPrevious].className = carouselItem;
        items[oldNext].className = carouselItem;

      // Agrega las nuevas clases
        items[newPrevious].className = carouselItem + " prev";
        items[slide].className = carouselItem + " active";
        items[newNext].className = carouselItem + " next";
      }
    }
  }

  // Siguiente controlador de navegación
  function moveNext() {

  // Si se está moviendo
    if (!moving) {

  // Si es la última diapositiva, restablezca a 0, de lo contrario +1
      if (slide === (totalItems - 1)) {
        slide = 0;
      } else {
        slide++;
      }

  //Mover el carrusel a la diapositiva actualizada
      moveCarouselTo(slide);
    }
  }

  // Controlador de navegación anterior
  function movePrev() {

  // Si se está moviendo
    if (!moving) {

  // Si es la primera diapositiva, establézcala como la última diapositiva, de lo contrario -1
      if (slide === 0) {
        slide = (totalItems - 1);
      } else {
        slide--;
      }

  // Mover el carrusel a la diapositiva actualizada
      moveCarouselTo(slide);
    }
  }

  // Inicializar carrusel
  function initCarousel() {
    setInitialClasses();
    setEventListeners();

  // Establecer movimiento a falso ahora que el carrusel está listo
    moving = false;
  }

  initCarousel();

}(document));