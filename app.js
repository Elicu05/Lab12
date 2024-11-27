
const contactForm = document.getElementById('contact-form');
const contactList = document.getElementById('contact-list');


function getContacts() {
    return JSON.parse(localStorage.getItem('contacts')) || [];
}


function saveContacts(contacts) {
    localStorage.setItem('contacts', JSON.stringify(contacts));
}


function renderContacts() {
    const contacts = getContacts();
    contactList.innerHTML = '';

    contacts.forEach((contact, index) => {
        const contactCard = document.createElement('div');
        contactCard.className = 'contact-card';
        contactCard.innerHTML = `
            <p><strong>Nombre:</strong> ${contact.name}</p>
            <p><strong>Teléfono:</strong> ${contact.phone}</p>
            <p><strong>Email:</strong> ${contact.email}</p>
            <p><strong>Dirección:</strong> ${contact.address}</p>
            <button class="edit-btn" onclick="editContact(${index})">Editar</button>
            <button onclick="deleteContact(${index})">Eliminar</button>
        `;
        contactList.appendChild(contactCard);
    });
}


function addContact(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('address').value.trim();

    if (!name || !phone) {
        alert('El nombre y el teléfono son obligatorios.');
        return;
    }

    const contacts = getContacts();
    contacts.push({ name, phone, email, address });
    saveContacts(contacts);
    renderContacts();
    contactForm.reset();
}


function deleteContact(index) {
    const contacts = getContacts();
    contacts.splice(index, 1);
    saveContacts(contacts);
    renderContacts();
}


function editContact(index) {
    const contacts = getContacts();
    const contact = contacts[index];

    
    document.getElementById('name').value = contact.name;
    document.getElementById('phone').value = contact.phone;
    document.getElementById('email').value = contact.email;
    document.getElementById('address').value = contact.address;

    
    contactForm.onsubmit = (e) => {
        e.preventDefault();

        const updatedContact = {
            name: document.getElementById('name').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            email: document.getElementById('email').value.trim(),
            address: document.getElementById('address').value.trim(),
        };

        if (!updatedContact.name || !updatedContact.phone) {
            alert('El nombre y el teléfono son obligatorios.');
            return;
        }

        
        contacts[index] = updatedContact;
        saveContacts(contacts);
        renderContacts();

        
        contactForm.reset();
        contactForm.onsubmit = addContact;
    };
}


document.addEventListener('DOMContentLoaded', renderContacts);
contactForm.onsubmit = addContact;
