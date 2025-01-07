// console.log("helloasdf");
const title=document.createElement("h2");
const btn=document.createElement("button");//addTask
const input=document.createElement("input");//taskInput
const liDiv=document.createElement("div");
const showList=document.createElement("button");
const taskAdd=document.createElement("button");

taskAdd.textContent="addTask";
showList.textContent="showList";

Object.assign(document.body.style,{
    display:"flex",
    flexDirection: "column", // Aligns items side by side
    alignItems:"center",
    // justifyContent:"space-between",
    height:"100vh",
})

const container=document.createElement("div");

Object.assign(container.style,{
    marginTop:"10px",
    textAlign:"center",
    backgroundColor:"#f76b8a",
    paddingBottom:"20px",
    width:"300px",
    display:"none",
    borderRadius:"8px",
    border: "2px solid black",
})

title.innerText="To Do List";
btn.innerText="ADD";
input.placeholder="enter task";


container.append(title, input, btn);

Object.assign(liDiv.style,{
    backgroundColor:"grey",
    height:"auto",
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    width: "300px",
    display: "none",
})


document.body.append(showList, taskAdd, container, liDiv);


[showList, taskAdd].forEach(button => {
    Object.assign(button.style, {
        padding: "8px 16px",
        backgroundColor: "#c3bef0",
        color: "black",
        fontSize:"medium",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        marginBottom: "5px"
    });
});


loadTasks();// task should be there if page reloaded


showList.addEventListener("click",()=>{
    container.style.display="none";
    liDiv.style.display="block";
});

taskAdd.addEventListener("click",()=>{
    liDiv.style.display="none";
    container.style.display = "block";
});


// container.append(liDiv);
btn.addEventListener("click",addTask)

function addTask(){
    const task=input.value.trim();
    if(task){
        createTask(task);
        input.value="";
        saveTask();
        alert("task added success");
    }else{
        alert("enter task");
    }
}

function deleteBtnStyle(){
    const deleteBtn=document.createElement("button");
    deleteBtn.innerText="x";
    Object.assign(deleteBtn.style,{
        cursor:"pointer",
        backgroundColor:"red",
        color:"white",
        border:"none",
        borderRadius:"50%",
        maxHeight:"20px",
        maxWidth:"20px",
        fontSize:"10px",
    });
    return deleteBtn;
}

function createTask(task){
    const listItem=document.createElement("li");
    // listItem.innerText=task;
    Object.assign(listItem.style, {
        display:"flex",
        justifyContent:"space-between",
        color:"yellow",
        padding:"10px",
        marginBottom:"6px",
        width:"auto",
        backgroundColor:"black",
        borderRadius:"5px",
        listStyle:"none",
    });
    // listItem_Style()
    const taskText=document.createElement("span");
    taskText.innerText=task;
    const deleteBtn=deleteBtnStyle();

    deleteBtn.addEventListener("click", ()=>{
        liDiv.removeChild(listItem);
        saveTask();//save tasks to the local storage.....
    });
    // li.style.display="flex";
    listItem.appendChild(taskText);
    listItem.appendChild(deleteBtn);
    liDiv.appendChild(listItem);
    
}


function saveTask(){
    let tasks=[];
    liDiv.querySelectorAll("li span").forEach(function(item){
        tasks.push(item.innerText);
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
    
}

//load task all task if we refresh the page
function loadTasks(){
    const tasks=JSON.parse(localStorage.getItem('tasks')) ||[];
    tasks.forEach(createTask);//get all items from the storage and dispaly in the page
}