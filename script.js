console.log("Mon script à été lancé!");

$("document").ready(()=> {
    console.log("jquery est pret")
})
let allUsers = [];
$.ajax({
	url: 'https://randomuser.me/api/?results=12',
	dataType: 'json',
	success: function(data) {
		// console.log(data);
        allUsers = data.results;
        console.log(data);
		allUsers.map(user => {
            createTable(user);
		})
	}
});

const createTable = (user) => {
    $(`<tr>
        <td>${user.gender}</td>
        <td>${user.name.first}</td>
        <td>${user.dob.age}</td>
        <td>${user.location.city}</td>
        <td>${user.location.country}</td>
        <td>
            <div class="card">
                <img src="${user.picture.large}" height=100 width=160 >
                <div class="container">
                <h4><b>${user.gender}</b></h4> 
                <h4><b>${user.name.first}</b></h4> 
                <h4><b>${user.dob.age}</b></h4> 
                <h4>${user.location.city} -- ${user.location.country}</h4> 
                </div>
            </div>
        </td>    
    </tr>
	`).appendTo("tbody")
	.hide()
	.fadeIn(500)
	.click(function() {
		console.log(this);
		$(this).fadeTo(250, .5);
	});
}

// Change Filter
$("[name='gender']").change(event => {
	const filter = event.target.value;
	$("tbody").empty();
	if (filter === "men") {
		allUsers.filter(user => user.gender === "male").map(user => createTable(user))
	} else if (filter === "women") {
		allUsers.filter(user => user.gender === "female").map(user => createTable(user))
    }
    else {
		allUsers.map(user => createTable(user))
    }
})

//filter by old
$('.multiselect').change(event => {
	const filter = event.target.value;
    $("tbody").empty();
    if($("#tata").is(':checked')){
        allUsers.filter(user => user.dob.age <= 40).map(user => createTable(user))
    }
    else if($("#titi").is(':checked')){
        allUsers.filter(user => user.dob.age >= 40).map(user => createTable(user))
    }
    else {
		allUsers.map(user => createTable(user))
    }
    
})

//filter by all
$("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#myTable tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});

//refresh page
$( "#mybutton" ).click(function() {
    window.location.href = "http://127.0.0.1:5500/Randomusers/index.html";
  });

//create new profil
$("[type='submit']").click((event) => {
    event.preventDefault()
    console.log("bouton submit cliqué")
    const prenom = $("[name='fname']").val()
    const nom = $("[name='lname']").val()
    const ville = $("[name='ville']").val()
    const pays = $("[name='pays']").val()
    const age = $("#age").val()
    const genre = $("#genre").val()
    const img = $("[name='filename']").val()
   // alert(prenom, nom, ville, pays, age, genre, img)
    nom === "" || prenom === "" || ville === "" || pays === ""  ? alert("les champs sont obligatoires") : $("p").append(`
        <div class="card">
            <img src="${img}" height=100 width=160 >
            <div class="container">
            <h4><b>${genre}</b></h4> 
            <h4><b>${nom}</b></h4> 
            <h4><b>${age}</b></h4> 
            <p>${ville} -- ${pays}</p> 
            </div>
        </div>`);
    
})

