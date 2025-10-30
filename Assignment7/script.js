function addTask(){
    let t=document.getElementById("title").value;
    let d=document.getElementById("description").value;
    if(t===""){
        return alert("Title required");
    }
        
    let taskDiv=document.createElement("div");
    taskDiv.className="task";

    let title=document.createElement("h3");
    title.textContent=t;

    let desc=document.createElement("p");
    desc.textContent=d;

    let completeBtn=document.createElement("button");
    completeBtn.textContent="Complete";
    completeBtn.onclick=function(){
        toggleComplete(taskDiv, completeBtn);
    };

    let editBtn=document.createElement("button")
    editBtn.textContent="Edit";
    editBtn.onclick=function(){
        editTask(taskDiv,title,desc,editBtn)
    };
      let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = function () { deleteTask(taskDiv); };

  taskDiv.append(title,desc,completeBtn,editBtn,deleteBtn);
    document.getElementById("taskList").appendChild(taskDiv);

  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
}

function toggleComplete(taskDiv, btn){
    // Toggle the completed class on the whole task container so we can style
    // the box and text consistently from CSS.
    taskDiv.classList.toggle("completed");
    btn.textContent = btn.textContent === "Complete" ? "Undo" : "Complete";
}

function deleteTask(taskDiv){
    taskDiv.remove();
}

function editTask(taskDiv,title,desc,btn){
    if(btn.textContent==="Edit"){
        let tInput=document.createElement("input");
        tInput.value=title.textContent;
        let dInput=document.createElement("input");
        dInput.value=desc.textContent;

        taskDiv.replaceChild(tInput,title);
        taskDiv.replaceChild(dInput,desc);

        btn.textContent="Save";
    }
   else {
       
        let inputs = taskDiv.querySelectorAll("input");
        let newTitle = inputs[0].value;
        let newDesc = inputs[1].value;
       
        title.textContent = newTitle;
        desc.textContent = newDesc;

        taskDiv.replaceChild(title, inputs[0]);
        taskDiv.replaceChild(desc, inputs[1]);

        btn.textContent = "Edit";
    }
}

