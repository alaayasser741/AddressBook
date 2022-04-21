function getElement(selector,selectorValue){
    let element;
    if(selector === "id"){
        element=document.getElementById(selectorValue);
    }
    else if(selector === "multiQuery"){
        element=document.querySelectorAll(selectorValue);
    }
    return element;
}
getElement("id","btn-search");
let btnSearch = getElement("id","btn-search");
let btnShowAll = getElement("id","btn-show-all");
let btnNew = getElement("id","btn-add-new");
let SearchPanel = getElement("id","search-panel");
let AddContact = getElement("id","add-new");
let EditContact = getElement("id","edit-contact");
let Table = getElement("id","table");



btnSearch.addEventListener("click",()=>{
    SearchPanel.style.display = "block";
    AddContact.style.display = "none";
    EditContact.style.display = "none";
    Table.style.display = "table";
    

});
btnShowAll.addEventListener("click",()=>{
    SearchPanel.style.display = "none";
    AddContact.style.display = "none";
    EditContact.style.display = "none";
    Table.style.display = "table";
});
btnNew.addEventListener("click",()=>{
    SearchPanel.style.display = "none";
    AddContact.style.display = "block";
    EditContact.style.display = "none";
    Table.style.display = "none";
});

let contactList = JSON.parse(localStorage.getItem("contact")) || [];
let contactFormId = contactList.length;

//select input and push to array
let contactFormName = getElement("id","contact-name");
let contactFormPhone = getElement("id","contact-phone");
let contactFormEmail = getElement("id","contact-email");
let contactFormAddress = getElement("id","contact-address");

//Create Function to add new contact
function newContact(){
    contactList.push({
        contactId : contactFormId +=1,
        contactName :contactFormName.value,
        contactPhone :contactFormPhone.value,
        contactEmail :contactFormEmail.value,
        contactAddress :contactFormAddress.value
    });
    localStorage.setItem("contact",JSON.stringify(contactList));
    console.log(contactList);
}

//Push the data into table from array
let tbody = getElement("id","tbody");
function displayContact(){
    let tr ='';
    let i;
    for(i = 0; i < contactList.length; i++){
        tr +=`<tr data-id=${i}>
        <td>${contactList[i].contactId}</td>
        <td>${contactList[i].contactName}</td>
        <td>${contactList[i].contactPhone}</td>
        <td>${contactList[i].contactEmail}</td>
        <td>${contactList[i].contactAddress}</td>
        <td class = "green">Edit</td>
        <td class = "red">Delete</td>
        </tr>`;
    }
    tbody.innerHTML = tr;
}
displayContact();
function resetContactForm(){
    contactFormName.value = '';
    contactFormPhone.value = '';
    contactFormEmail.value = '';
    contactFormAddress.value = '';
}

let btnSave = getElement('id',"add");
btnSave.addEventListener('click',()=>{
    newContact();
    displayContact();
    resetContactForm();
});

// Edit Form
let editForm = getElement("id","edit-contact");

let editContactName = getElement("id","edit-contact-name");
let editContactPhone = getElement("id","edit-contact-phone");
let editContactEmail = getElement("id","edit-contact-email");
let editContactAddress = getElement("id","edit-contact-address");
let btnUpdate = getElement("id","edit");

tbody.addEventListener('click',e=>{
    if(e.target.classList.value === "green"){
        let tr =e.target.parentElement;
    let index = tr.dataset.id;
    let oldId = tr.children[0].innerHTML;

    editContactName.value = contactList[index].contactName;
    editContactPhone.value = contactList[index].contactPhone;
    editContactEmail.value = contactList[index].contactEmail;
    editContactAddress.value = contactList[index].contactAddress;

    EditContact.style.display = "block";
    Table.style.display = "none";
    
    let update = ()=>{
        contactList[index] = {
            contactId : parseInt(oldId),
            contactName :editContactName.value,
            contactPhone :editContactPhone.value,
            contactEmail :editContactEmail.value,
            contactAddress :editContactAddress.value
        }
        localStorage.setItem("contact",JSON.stringify(contactList));
        EditContact.style.display = "none";
        Table.style.display = "table";
        displayContact();
        location.reload();
    }
    btnUpdate.addEventListener("click",update);
    }
    if(e.target.classList.value === "red"){
        let tr = e.target.parentElement;
        let index = tr.dataset.id;
        contactList.splice(index,1);
        localStorage.setItem("contact",JSON.stringify(contactList));
        displayContact();
    }
});

// Search
let search = getElement("id","search");
let trs = getElement("multiQuery","tbody tr");
function searchContact(){
    let searchValue = search.value.toUpperCase();
    trs.forEach(tr =>{
        let searchTr =tr.children[1].innerHTML.toUpperCase();
        if(!searchTr.includes(searchValue)){
            tr.style.display = "none";
        }else{
            tr.style.display = "table-row";
        }
    });
}
search.addEventListener('keyup',searchContact);
