//elemento boton switch
const btnSwitch = document.getElementById("switch");

//Evento toogle y localstorage modo light
btnSwitch.addEventListener("click", (e) => {
        document.body.classList.toggle("light");
        btnSwitch.classList.toggle("active");
        if (document.body.classList.contains("light")) {
            localStorage.setItem("light-mode", "true");
        }else{
            localStorage.setItem("light-mode", "false");
        }
});

const ligthTheme = JSON.parse(localStorage.getItem("light-mode"));

/* console.log(ligthTheme); */

//si el usuario eligio el tema claro lo aplico
if (ligthTheme) {
    document.body.classList.add("light"); 
    btnSwitch.classList.remove("active");
} else {
    document.body.classList.remove("light");
    btnSwitch.classList.add("active");    
}
