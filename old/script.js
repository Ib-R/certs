const addForm = document.querySelector('#addForm');

addForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const serial = e.target.certSerial.value;
    const name = e.target.certName.value;
    const title = e.target.certTitle.value;
    const date = e.target.certDate.value;

    const body = new FormData;
    body.append('serial',serial);
    body.append('name',name);
    body.append('title',title);
    body.append('date',date);

    fetch("addform",
        {
            method: "POST",
            body,
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data[0].serial)
        })
});