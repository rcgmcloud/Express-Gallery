function deleteAction() {
    if (confirm("Are you sure want to delete this photo?")) {
       //alert(value);
        return true;
    } else {
        //alert("Clicked Cancel");
        return false;
    }
}