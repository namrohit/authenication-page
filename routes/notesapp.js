
console.log("hello...")
showNotes();

// adding data to the localstorage
let addbtn = document.getElementById("addBtn");
addbtn.addEventListener('click',function(e){

    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");
    // var notesobj;
    if(notes== null){
        notesobj = [];
    }

    else{
        notesobj = JSON.parse(notes);
    }
 
    notesobj.push(addTxt.value);
    localStorage.setItem("notes",JSON.stringify(notesobj));
    addTxt.value = "";
    console.log(notesobj);
    showNotes();
});

//function to show notes from local storage
function showNotes(){
    let notes = localStorage.getItem("notes");
    if(notes== null){
        notesobj = [];
    }

    else{
        notesobj = JSON.parse(notes);
    }
    
    let html = "";
    
    notesobj.forEach((element,index) => {
        html += `<div class="notecard my-2 mx-3 card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Note ${index+1}</h5>
          <p class="card-text">${element}</p>
          <button id = ${index} onclick = "deleteNote(this.id)" class="btn btn-primary">Delete Note</a>
        </div>
      </div>`;
    });

    let noteElm = document.getElementById('notes');
    if(notesobj.length!=0){
        noteElm.innerHTML = html;
    }
    else{
        noteElm.innerHTML = `nothing to show use "Add a Note" section above to add notes`
    }

}


//functon to delete note
function deleteNote(index){


    // console.log(index);
    let notes = localStorage.getItem("notes");
    if(notes== null){
        notesobj = [];
    }

    else{
        notesobj = JSON.parse(notes);
    }
    notesobj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify (notesobj)); 
    showNotes();    
}

//searching
let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputval = search.value.toLowerCase();   
    console.log("input event fired" , inputval);
    let notecards = document.getElementsByClassName('notecard');

    Array.from(notecards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputval)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })  
})

