document.addEventListener("DOMContentLoaded", loadTasks);

let editRow = null;

// Fungsi untuk menambahkan tugas baru
function addNewTask() {
    let name = document.getElementById("taskName").value;
    let priority = document.getElementById("taskPriority").value;
    let startDate = document.getElementById("taskStartDate").value;
    let dueDate = document.getElementById("taskDueDate").value;

    if (!name || !startDate || !dueDate) {
        alert("Harap isi semua bidang!");
        return;
    }

    let table = document.getElementById("taskList").getElementsByTagName("tbody")[0];
    let newRow = table.insertRow();

    let cellIndex = newRow.insertCell(0);
    let cellName = newRow.insertCell(1);
    let cellPriority = newRow.insertCell(2);
    let cellStartDate = newRow.insertCell(3);
    let cellDueDate = newRow.insertCell(4);
    let cellDone = newRow.insertCell(5);
    let cellActions = newRow.insertCell(6);

    cellIndex.innerText = table.rows.length;
    cellName.innerText = name;
    cellPriority.innerText = priority;
    cellStartDate.innerText = startDate;
    cellDueDate.innerText = dueDate;
    cellDone.innerHTML = `<input type="checkbox" onclick="markDone(this)">`;

    cellActions.innerHTML = `
        <button onclick="editTask(this)">Edit</button>
        <button onclick="deleteTask(this)">Delete</button>
    `;

    // Reset input form
    document.getElementById("taskName").value = "";
    document.getElementById("taskPriority").value = "Medium";
    document.getElementById("taskStartDate").value = "";
    document.getElementById("taskDueDate").value = "";
}

// Fungsi untuk menandai tugas sebagai selesai
function markDone(checkbox) {
    let row = checkbox.parentElement.parentElement;
    if (checkbox.checked) {
        row.style.textDecoration = "line-through";
        row.style.color = "gray";
    } else {
        row.style.textDecoration = "none";
        row.style.color = "black";
    }
}

function editTask(button) {
    editRow = button.parentElement.parentElement;

    document.getElementById("editTaskName").value = editRow.cells[1].innerText;
    document.getElementById("editPriority").value = editRow.cells[2].innerText;
    document.getElementById("editStartDate").value = editRow.cells[3].innerText;
    document.getElementById("editDueDate").value = editRow.cells[4].innerText;

    let modal = document.getElementById("editModal");
    modal.style.display = "flex"; // Pastikan modal hanya muncul saat Edit ditekan
}

// Pastikan modal tidak ditampilkan saat halaman pertama kali dimuat
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("editModal").style.display = "none";
});

// Fungsi untuk menyimpan perubahan pada tugas
function saveEditTask() {
    if (!editRow) return;

    editRow.cells[1].innerText = document.getElementById("editTaskName").value;
    editRow.cells[2].innerText = document.getElementById("editPriority").value;
    editRow.cells[3].innerText = document.getElementById("editStartDate").value;
    editRow.cells[4].innerText = document.getElementById("editDueDate").value;

    closeModal();
    showSuccessPopup();
}

// Fungsi untuk menghapus tugas
function deleteTask(button) {
    let row = button.parentElement.parentElement;
    row.parentElement.removeChild(row);
}

// Fungsi untuk menampilkan popup sukses
function showSuccessPopup() {
    let popup = document.getElementById("successPopup");
    popup.style.display = "block";
    setTimeout(() => {
        popup.style.display = "none";
    }, 2000);
}

// Fungsi untuk menutup modal edit
function closeModal() {
    document.getElementById("editModal").style.display = "none";
    editRow = null; // Reset editRow agar tidak menyimpan data lama
}

// Event listener untuk tombol Cancel
document.getElementById("cancelEdit").addEventListener("click", closeModal);

// Menutup modal jika pengguna mengklik di luar modal
window.onclick = function(event) {
    let modal = document.getElementById("editModal");
    if (event.target === modal) {
        closeModal();
    }
};

// Fungsi untuk memuat daftar tugas (jika ingin menyimpan di localStorage)
function loadTasks() {
    console.log("Task list loaded!");
}
