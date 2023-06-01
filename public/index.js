const btnMsg = document.querySelector("#btnMsg");
btnMsg.addEventListener("click", addMessage);

function obtenerFechaHora() {
    const fecha = new Date();
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();
    const horas = fecha.getHours();
    const minutos = fecha.getMinutes();
    const segundos = fecha.getSeconds();

    const fechaHora = `${dia}/${mes}/${anio} ${horas}:${minutos}:${segundos}`;

    return fechaHora;
};


const socket = io();

socket.on('connect', () => {
    console.log(socket.id);
    socket.emit('get-chat', '');
});

function addMessage(e){
    e.preventDefault();

    let messageToAdd = {
        email: `${document.getElementById('emailInput').value}`,
        type: `${document.getElementById('typelInput').value}`,
        date: obtenerFechaHora(),
        message: `${document.getElementById('msgInput').value}`
    };

    socket.emit('newMessage', messageToAdd);
};

socket.on('message-added', (data) => {
    const tabla = document.getElementById('msgList');
    let newHTML = document.getElementById('msgList').innerHTML;
    newHTML += `<tr  class="table-info">
    <th scope="col">${data.email}</th>
    <th scope="col">${data.type}</th>
    <th scope="col">${data.date}</th>
    <th scope="col">${data.message}</th>
    </tr>`;
    tabla.innerHTML = newHTML;
});


socket.on('chat', (data) => {

    let htmlToRender = '';
    for (let i = 0; i <data.length; i++) {
        htmlToRender +=`
        <tr>
            <th scope="row">${data[i].email}</td>
            <td>${data[i].type}</td>
            <td>${data[i].date}</td>
            <td>${data[i].message}</td>
        </tr>
        `    
    };
    document.getElementById('msgList').innerHTML = htmlToRender;
});



// Validate Password ---------------------------------------------------------------------
let password = document.getElementById("password");
let flag = 1;

function checkPassword(elem) {
    if ( elem.value.length > 0 ) {
        if ( elem.value != password.value ) {
            document.getElementById("invalidPassword").innerText = "Password don't match";
            flag == 0;
        } else {
            document.getElementById("invalidPassword").innerText = "";
            flag == 1;            
        }
    } else {
        document.getElementById("invalidPassword").innerText = "Please, confirm your password";            
        flag == 0;
    }
};

function validate() {
    if ( flag == 1 ) {
        return true;
    } else {
        return false;
    }
};

const getCookie = (name) => {
    let value = `; ${document.cookie}`;
    let parts = value.split(`; ${name}=`);
    if (parts.lenght === 2) return parts.pop().split(';').shift();
};

const sendRequest = async () => {
    const token = getCookie('authorization');
    const response = await fetch('/profile', {
        method: 'GET',
        headers: {
            authorization: `${token}`,
        },
    });

    const data = await response.json();
    // console.log(data);

    if (data.error) {
        document.getElementById('welcome-banner').innerHTML = `Error!! ${data.error}`;
    } else {
        document.getElementById('welcome-banner').innerHTML = `Hello ${data.user.username}!`;
    }
};

sendRequest();

let input = document.getElementById('phone');
window.intlTelInput(input,{});

async function getData(url) {
    try {
    const response = await fetch(url);
    
    const responseData = await response.json();
    let htmlString = '';
    responseData.forEach(products => {
        // desestructurando cada producto
        const {_id, foto, nombre, descripcion, tamanio, precio} = products

        htmlString +=`<article class="cardBox">
                                    <figure class="fotoProducto">
                                        <img src="../uploads/avatar.jpeg" alt="">
                                    </figure>
                                    <div class="encabezado">
                                        <h4 class="modelo">${nombre}</h4>
                                    </div>
                                

                                    <div class="caracteristicas">
                                        <p class="tipo">${descripcion}</p>
                                        <div class="barra"></div>
                                        <p class="medida">${stock}</p>
                                    </div>
                                    <p class="precio">${precio}</p>
                                    <button class="addProduct">Agregar a carrito</button>
                                </article>`
    });
    document.getElementById('productList').innerHTML = htmlString
    console.log(htmlString);
    } catch (error) {
    console.error(error);
    }
};

getData('/profile')


