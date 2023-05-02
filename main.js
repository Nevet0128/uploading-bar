/*NO SE PUEDE PONPER UN FORMULARIO EN EL HTML ya que no se está haciendo la acción
  asíncrona para ver como van cargandose los ficheros al mismo tiempo
*/

const d = document,
  $main = d.querySelector("main"),
  $files = d.getElementById("files-frm");

const uploader = (file) => {
  const xhr = new XMLHttpRequest(),
    formData = new FormData();

  //Se crea un nuevo objeto formData en donde habrá una sola clave: valor en cada iteración
  /*
  {
    "file": file,
  }
  */
  formData.append("file", file);

  xhr.addEventListener("readystatechange", (e) => {
    //se le da return del 1-3 para que no pase de ese if. como un "continue" para que se ejecute la siguiente iteración
    if (xhr.readyState !== 4) return;

    if (xhr.status >= 200 && xhr.status < 300) {
      let json = JSON.parse(xhr.responseText);

      console.log(json);

      /* let $element = d.createElement("li");
      $element.innerHTML = `${json.statusText}`;
      $main.appendChild($element); */
    } else {
      let message = xhr.statusText || "Ocurrió un error";

      alert(`Error ${xhr.status}: ${message}`);
    }
    //console.log("status", xhr.status);
  });

  xhr.open("POST", "assets/subir-archivos.php");
  xhr.setRequestHeader("enc-type", "multipart/form-data");

  xhr.send(formData);
};

d.addEventListener("change", (e) => {
  if (e.target === $files) {
    //Convierte de datos a texto para iterar
    const file = Array.from(e.target.files);

    $main.insertAdjacentHTML(
      "beforebegin",
      "<h2>Archivos seleccionados: </h2>"
    );

    //Se pasa cada archivo para que (¿ haga un formulario a cada uno ?)
    file.forEach((el) => {
      $main.insertAdjacentHTML("afterbegin", `<p>${el.name}</p>`);

      uploader(el);
    });
  }
});

/*Value	Description
1.- application/x-www-form-urlencoded (DEFAULT):  All characters are encoded before sent (spaces are converted to "+" symbols, and special characters are converted to ASCII HEX values)

2.- multipart/form-data: This value is necessary if the user will upload a FILE through the form

3.- text/plain: Sends data without any encoding at all. NOT RECOMMENDED */
