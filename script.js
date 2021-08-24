let box1 = document.getElementById("inputBox");
let add_btn = document.getElementById("add-btn");
let task_list = document.getElementById("list");
let task_id = 1;
let tasks = [];

add_btn.addEventListener('click', () => {
    if (box1.value != ""){

        let ch_box = document.createElement("input");
        ch_box.setAttribute("type", "checkbox");
        ch_box.setAttribute("id", "task" + task_id);
        ++task_id;

        task_list.appendChild(ch_box);

        let new_task = document.createElement("span");
        new_task.innerText = box1.value + " ";
        task_list.appendChild(new_task);

        let break_el = document.createElement("br");
        task_list.appendChild(break_el);

        tasks.push(box1.value);
        // console.log(tasks);
    }
    box1.value = "";
});

const checkTask = (element) => {
    if (this.checked == false){
        element.style.textDecoration = "line-through";
    } else {
        element.style.textDecoration = "none";
    }
}
