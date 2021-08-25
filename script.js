let box1 = document.getElementById("inputBox");
let add_btn = document.getElementById("add-btn");
let container = document.getElementById("container");
let len_para = document.getElementById("text-len");
let unique_id = 1;
let tasks = [];

// get task and write into task list
const addTask = () => {
    if (box1.value != ""){

        if (box1.value.length > 100) {
            alert("100 characters are allowed !");
            return;
        }

        // class name for main task box
        let cls_name = "task" + unique_id;
        let main_box = document.createElement("div");
        main_box.setAttribute("class", cls_name);

        // class name for checkbox and task (text)
        let sub_cls_name = "t" + unique_id;

        // checkbox for marking task complete / incomplete
        let ch_box = document.createElement("input");
        ch_box.setAttribute("type", "checkbox");
        ch_box.setAttribute("class", sub_cls_name);
        ch_box.setAttribute("onclick", "markTask(this)");
        
        // labeling task name and other details
        let new_task = document.createElement("label");
        new_task.setAttribute("class", sub_cls_name);
        new_task.setAttribute("onclick", "markTask(this)");
        new_task.textContent = box1.value;

        // remove task button
        let rem_btn = document.createElement("button");
        rem_btn.setAttribute("class", sub_cls_name);
        rem_btn.setAttribute("onclick", "removeTask(this)");
        rem_btn.textContent = "remove";
        
        // new line after each task
        let break_el = document.createElement("br");
        
        // appending elements into main container (= 'list' div tag)
        main_box.appendChild(ch_box);
        main_box.appendChild(new_task);
        main_box.appendChild(rem_btn);
        main_box.appendChild(break_el);

        // appending task div inside container
        container.appendChild(main_box);
        
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

box1.addEventListener('input', () => {
    let text_len = box1.value.length;
    len_para.textContent = text_len;
    if (text_len > 100){
        alert("100 characters are allowed !");
        return;
    }
});

// add task on clicking 'ADD' button
add_btn.addEventListener('click', () => {
    addTask();
});

// mark task complete / incomplete by line-through property
const markTask = (element) => {

    // if checkbox is checked / unchecked
    if (element.tagName == "INPUT"){

        let text_box = document.getElementsByClassName(element.className)[1];

        if (element.checked == true){
            text_box.style.textDecoration = "line-through double red";
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
            element.style.textDecoration = "line-through double red";
            check_box.checked = true;
        }
    }
}

// remove task
const removeTask = (element) => {
    let all_elements = document.getElementsByClassName(element.parentNode.className);
    all_elements[0].remove();
    element.remove();
}
