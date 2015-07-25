function deleteAction() {
    if (confirm("Are you sure")) {
        alert("Clicked Ok");
        return true;
    } else {
        alert("Clicked Cancel");
        return false;
    }
}