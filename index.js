var draggedItem = null;
var targetContainer = document.getElementById("target-container");
var message = document.getElementById("message");

function handleDragStart(event) {
  draggedItem = event.target;
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/html", draggedItem.innerHTML);
  draggedItem.classList.add("dragged");
}

function handleDragEnter(event) {
  event.preventDefault();
  event.currentTarget.classList.add("over");
}

function handleDragLeave(event) {
  event.currentTarget.classList.remove("over");
}

function handleDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
}

function handleDrop(event) {
  event.preventDefault();
  if (event.currentTarget === targetContainer) {
    targetContainer.innerHTML += event.dataTransfer.getData("text/html");
    draggedItem.classList.remove("dragged");
    message.textContent = "Item dropped successfully! 🎉";
  }
  event.currentTarget.classList.remove("over");
}

function reset() {
  targetContainer.innerHTML = "";
  message.textContent = "";
}

var items = document.querySelectorAll(".item");
items.forEach(function (item) {
  item.addEventListener("dragstart", handleDragStart, false);
  item.addEventListener("dragend", function () {
    item.classList.remove("dragged");
  });
});

targetContainer.addEventListener("dragenter", handleDragEnter, false);
targetContainer.addEventListener("dragleave", handleDragLeave, false);
targetContainer.addEventListener("dragover", handleDragOver, false);
targetContainer.addEventListener("drop", handleDrop, false);
