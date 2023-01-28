import axios from 'axios';
import schedule from 'node-schedule'


export function crearPostAhora(reddit, twitter, linkedin, texto) {

  if (twitter) {
    try {
      axios
        .post("http://localhost:3010/posts/tweet", {
          texto: texto,
          usuario: localStorage.getItem('id'),
          tipo: 'Inmediato'
        })
        .catch(function (error) {
          alert(error.response.data.data);
        })
        .then((response) => {
          if (response.data.message === "OK") {
          }
        });
    } catch (err) {
      alert(err);
    }
  }
  if (reddit) {
    try {
      axios
        .post("http://localhost:3010/posts/reddit/post", {
          texto: texto,
          usuario: localStorage.getItem('id'),
          tipo: 'Inmediato'
        })
        .catch(function (error) {
          alert(error.response.data.data);
        })
        .then((response) => {
          if (response.data.message === "OK") {
          }
        });
    } catch (err) {
      alert(err);
    }
  }

  //if linkedin
  if (linkedin) {
    try {
      axios
        .post("http://localhost:3010/posts/linkedin/post", {
          texto: texto,
          usuario: localStorage.getItem('id'),
          tipo: 'Inmediato'
        })
        .catch(function (error) {
          alert(error.response.data.data);
        })
        .then((response) => {
          if (response.data.message === "OK") {
          }
        });
    } catch (err) {
      alert(err);
    }
  }
}
//Crear post programado

export function crearPostProgramado(reddit, twitter, linkedin, texto, fecha) {
  const job = schedule.scheduleJob(fecha, function () {
    console.log('Ejecutando post programado');
    if (twitter) {
      try {
        axios
          .post("http://localhost:3010/posts/tweet", {
            texto: texto,
            usuario: localStorage.getItem('id'),
            tipo: 'Programado'
          })
          .catch(function (error) {
            alert(error.response.data.data);
          })
          .then((response) => {
            if (response.data.message === "OK") {
            }
          });
      } catch (err) {
        alert(err);
      }
    }
    if (reddit) {
      try {
        axios
          .post("http://localhost:3010/posts/reddit/post", {
            texto: texto,
            usuario: localStorage.getItem('id'),
            tipo: 'Programado'
          })
          .catch(function (error) {
            alert(error.response.data.data);
          })
          .then((response) => {
            if (response.data.message === "OK") {
            }
          });
      } catch (err) {
        alert(err);
      }
    }
  });

  //if linkedin
  //try axios con linkedin endpoint

}
