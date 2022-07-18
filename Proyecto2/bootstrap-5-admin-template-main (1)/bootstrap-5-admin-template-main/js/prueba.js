const url = 'https://gutendex.com/books';
let libros = "";
window.onload = async () => {
    
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    libros = data;
  } catch (error) {
  }
  let array = libros.results;
  var arrayIdiomas= [];
  let duplicados = [];
  let contador=1;
  console.log(array)
  //let nlibros = libros.count;
  const divlibros=document.querySelector('#prueba');
  const divcajaImagenes=document.querySelector('#cajaImagenes');
  let autor="";

 
  for (const libro of array) {
      let urlimagen = libro.formats['image/jpeg'];
      let titulo= libro.title;
      let autorArray= libro.authors;
      let generos = libro.subjects;
      let idiomas = libro.languages;
      
      for (const autores of autorArray) {
        autor=autores.name;
    }
    


  
    
      let template = ` <div class="miniatura col-xl-3 col-sm-6 col-12 mb-4">
      <div class="card">
        <div class="card-body">
          <div class="mini d-flex justify-content-between px-md-1">
            <img src="${urlimagen}">
          </div>
         <p>Título del libro: ${titulo} </p>
         <p>Autor del libro: ${autor} </p>
         <p>Idioma: ${idiomas} </p>
         <p>Género: ${generos} </p>
        </div>
      </div>
    </div>`
      divcajaImagenes.innerHTML += template;

  }
  const arregloImagenes= document.querySelectorAll(".miniatura");

  for (const imagen of arregloImagenes) {
      const card_body= imagen.querySelector(".card-body");
      //card_body.innerHTML += nlibros;
      console.log("cuento imagenes"+imagen) 
  }

//eventos
var buttonIdiomas= document.querySelector('.btn-info');


buttonIdiomas.addEventListener("click", () =>{
  console.log('si funciona')
  for (const libro of array) {
    let idiomas = libro.languages;
    for (const idioma of idiomas) {
      arrayIdiomas.push(idioma);
      if (!arrayIdiomas.includes(idioma)) {
        arrayIdiomas.push(idioma);
      }
    }    
    
  }
  const tempArray = arrayIdiomas.sort();
    for (let i = 0; i < tempArray.length; i++) {
      if (tempArray[i+1]==tempArray[i]) {
          contador=contador+1;

      }else{
        duplicados.push(contador);

        contador=1;
      
    }
    }
});




// Graph
var ctx = document.getElementById("myChart");
var generos = [
    "Children's stories", "fiction" , "adventure" , "mistery", "horror" 
]
var genero = [
    20,90,10,30,5
]

var idiom=arrayIdiomas;
async function buscarGenero(idiom){
    return await idiom;
}

  
var ngeneros =[];
for (const genero of generos) {
    let data = await buscarGenero(idiom);
    let inservible= data;
    ngeneros.push(data);
}
var myChart = new Chart(ctx, {
  type: "line",
  //labels = generos; 
  data: {
      labels:arrayIdiomas,
    /*labels: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],*/ 
    datasets: [
      //data = ngeneros;
        {
        //data: [15339, 21345, 18483, 24003, 23489, 24092, 12034],
        data: ngeneros,
        lineTension: 0,
        backgroundColor: "transparent",
        borderColor: "#007bff",
        borderWidth: 4,
        pointBackgroundColor: "#007bff",
      },
    ],
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: false,
          },
        },
      ],
    },
    legend: {
      display: false,
    },
  },
});

};
