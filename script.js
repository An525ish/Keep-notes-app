const headBtn = document.querySelector(".add-note");
const form = document.querySelector(".popup");
const heading = document.querySelector(".popup input");
const descp = document.querySelector(".popup textarea");
const noteContainer = document.querySelector(".note-container");
const cross = document.querySelector(".cross");
const addBtn = document.querySelector(".addnote");
const title = document.querySelector(".heading .form-title");
let updated = false, updateId;

headBtn.addEventListener("click", () => {
  form.classList.toggle("active");
  noteContainer.classList.toggle("active");
  heading.value = "";
  descp.value = "";
});

cross.addEventListener("click", () => {
  form.classList.toggle("active");
  noteContainer.classList.toggle("active");
});

const noteItems = JSON.parse(localStorage.getItem("noteItems") || "[]");

    const createNote = () => {
    const date = new Date();
    month = date.toLocaleString("en-us", { month: "long" });
    day = date.getDate();
    year = date.getFullYear();
    var updatedDate = `${month} ${day}, ${year}`;

    if (heading.value || descp.value) {
        let title = heading.value;
        let desc = descp.value;
        let currDate = updatedDate;

        let noteInfo = { title: title, description: desc, date: currDate };
        if(!updated)
        noteItems.push(noteInfo);
        else{
          updated = false;
          noteItems[updateId] = noteInfo;
        }
    }
    localStorage.setItem("noteItems", JSON.stringify(noteItems));
    }

    
    const displayNotes = () => {
    const notes = document.querySelectorAll(".note");
    notes.forEach((note) => note.remove());
  
    noteItems.forEach((noteItem, index) => {
      let notesContent = `<div class="note">
                              <div class="icons">
                              <div class="pin">
                                  <i class="fa-solid fa-thumbtack"></i>
                              </div>
                              <div class="tools">
                                  <i onclick="updateNote(${index},'${noteItem.title}' , '${noteItem.description}')" class="fa-solid fa-pen-to-square edit"></i>
                                  <i onclick="deleteNote(${index})" class="fa-solid fa-trash delete"></i>
                              </div>
                          </div>
                          <div class="note-content" onclick="updateNote(${index},'${noteItem.title}' , '${noteItem.description}')">
                          <span class="note-heading">${noteItem.title}</span>
                              <textarea name="txtarea" rows="7" id="textarea" readonly class="note-descp" placeholder="Note Description..." >${noteItem.description}</textarea>
                          <hr>
                          <div class="note-footer">
                              <div class="date">
                                  ${noteItem.date}
                              </div>
                              </div>
                          </div> `;
                          noteContainer.insertAdjacentHTML("afterbegin", notesContent);


      const note = document.querySelector('.note');
      const pin = document.querySelector(".pin");
    
      pin.addEventListener("click", () => {
        note.classList.toggle("pinned");
        noteContainer.insertBefore(note, noteContainer.firstElementChild);
        if(!note.classList.contains('pinned'))
        noteContainer.insertBefore(note, noteContainer.children[noteItems.length-index+1])
      });

    });
  }

  displayNotes();

function deleteNote(id){
    noteItems.splice(id, 1);
    localStorage.setItem("noteItems", JSON.stringify(noteItems));
    displayNotes();
}

function updateNote(id, title, desc){
    form.classList.toggle("active");
    noteContainer.classList.toggle("active");
    updateId = id;
    updated = true;
    title.innerText = "Update the note";
    addBtn.innerText = "Update note";
    heading.value = title;
    descp.value = desc;
}




form.addEventListener("submit", (e) => {
  e.preventDefault();
  createNote();
  displayNotes();
  form.classList.toggle("active");
  noteContainer.classList.toggle("active");
});



