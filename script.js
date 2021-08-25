let box1 = document.getElementById("inputBox");
let add_btn = document.getElementById("add-btn");
let task_list = document.getElementById("list");
let unique_id = 1;
let tasks = [];

// get task and write into task list
const addTask = () => {
    if (box1.value != ""){

        // class name for checbox and task (text)
        let cls_name = "task" + unique_id;

        // checkbox for marking task complete / incomplete
        let ch_box = document.createElement("input");
        ch_box.setAttribute("type", "checkbox");
        ch_box.setAttribute("class", cls_name);
        ch_box.setAttribute("onclick", "checkTask(this)");
        
        // labeling task name and other details
        let new_task = document.createElement("label");
        new_task.setAttribute("class", cls_name);
        new_task.setAttribute("onclick", "checkTask(this)");
        new_task.innerText = box1.value;
        
        // new line after each task
        let break_el = document.createElement("br");
        
        // appending elements into main container (= 'list' div tag)
        task_list.appendChild(ch_box);
        task_list.appendChild(new_task);
        task_list.appendChild(break_el);
        
        // appending task into array of tasks
        tasks.push(box1.value);

        // increment task id for each new task
        ++unique_id;
    }
    box1.value = "";
}

// add task on pressing 'Enter' key
box1.addEventListener('keyup', (event) => {
    if (event.key == 'Enter'){
        addTask();
    }
});

// add task on clicking 'ADD' button
add_btn.addEventListener('click', () => {
    addTask();
});

// mark task complete / incomplete by line-through property
const checkTask = (element) => {

    // if checkbox is checked / unchecked
    if (element.tagName == "INPUT"){

        let text_box = document.getElementsByClassName(element.className)[1];

        if (element.checked == true){
            text_box.style.textDecoration = "line-through";
        } else {
            text_box.style.textDecoration = "none";
        }

    } else {
        // if the task text is clicked
        let check_box = document.getElementsByClassName(element.className)[0];

        if (check_box.checked == true) {
            element.style.textDecoration = "none";
            check_box.checked = false;
        } else {
            element.style.textDecoration = "line-through";
            check_box.checked = true;
        }
    }
}
