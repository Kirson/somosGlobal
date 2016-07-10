'use strict';

angular.module('starter.categoryServices', [])
.factory('Categories', function() {

  var categories = [{
    id: 0,
    name: 'Comidas y Bebidas',
    deseg: 'Comidas y Bebidas',
    face: 'img/category/cam.png'
  }
  , {
    id: 1,
    name: 'Salud',
    deseg: 'Salud',
    face: 'img/category/sal.png'
  },
  {
    id: 2,
    name: 'Belleza y Fitness',
    deseg: 'Belleza y Fitness',
    face: 'img/category/bel.png'
  },
  {
    id: 3,
    name: 'Compras',
    deseg: 'Compras',
    face: 'img/category/com.png'
  },
  {
    id: 4,
    name: 'Asistencia y Servicios',
    deseg: 'Asistencia y Servicios',
    face: 'img/category/asi.png'
  },
  {
    id: 5,
    name: 'Diversion y Actividades',
    deseg: 'Diversion y Actividades',
    face: 'img/category/div.png'
  },
  {
    id: 6,
    name: 'Vacaciones y Turismo',
    deseg: 'Vacaciones y Turismo',
    face: 'img/category/vac.png'
  }];

  return {
    all: function() {
      return categories;
    },
    remove: function(id) {
      categories.splice(categories.indexOf(id), 1);
    },
    get: function(catId) {
      for (var i = 0; i < categories.length; i++) {
        if (categories[i].id === parseInt(catId)) {
          return categories[i];
        }
      }
      return null;
    }
  };
});