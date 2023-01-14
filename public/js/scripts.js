
const getProjects = () => {
    $.get('/api/projects', (response) => {
        if (response.statusCode == 200) {
            addCards(response.data);
        }
    })
}

const clickMe = () => {
    alert("Thanks for clicking me. Hope you have a nice day!")
}

const submitForm = () => {
    let formData = {};
    formData.title = $('#title').val();
    formData.image = $('#image').val();
    formData.link = $('#link').val();
    formData.desciption = $('#desciption').val();

    console.log("Form Data Submitted: ", formData);
    addProjectToAPP(formData);
}

// ajax function
const addProjectToAPP = (project) => {
    $.ajax({
        url: '/api/projects',
        data: project,
        type: 'POST',
        success: (result) => {
            alert(result.message);
            location.reload();
        }
    })
}

const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align">' +
            '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' + item.image + '">' +
            '</div><div class="card-content">' +
            '<span class="card-title activator grey-text text-darken-4">' + item.title + '<i class="material-icons right">more_vert</i></span><p><a href="#">' + item.link + '</a></p></div>' +
            '<div class="card-reveal">' +
            '<span class="card-title grey-text text-darken-4">' + item.title + '<i class="material-icons right">close</i></span>' +
            '<p class="card-text">' + item.desciption + '</p>' +
            '</div></div></div>';
        $("#card-section").append(itemToAppend)
    });
}


$(document).ready(function () {
    $('.materialboxed').materialbox();
    $('#formSubmit').click(() => {
        submitForm();
    })
    getProjects();
    $('.modal').modal();
});

// connect to the socket
let socket = io();

socket.on('number', (msg)=>{
  console.log(msg);
})

/* function changeText() {
          var textsArray = ["Text 1", "Text 2", "Text 3", "Text 4", "Text 5"] 
          var number = getRandomNumberBetween(0, textsArray.length - 1) 
          console.log("Index: ", number) 
          document.getElementById("heading").innerHTML = textsArray[number];
}
function getRandomNumberBetween(min, max) {
          return Math.floor(Math.random() * (max - min + 1) + min);
} */

/*
const cardList = [
    {
        title: "Kitten 2",
        image: "images/image1.jpg",
        link: "About Kitten 2",
        desciption: "Demo desciption about kitten 2"
    },
    {
        title: "Kitten 3",
        image: "images/flower1.jpg",
        link: "About Kitten 3",
        desciption: "Demo desciption about kitten 3"
    }
]
*/
