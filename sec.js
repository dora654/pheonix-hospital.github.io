// -------------------------
// LOCAL STORAGE HELPERS
// -------------------------
function getRecords(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

function setRecords(key, records) {
    localStorage.setItem(key, JSON.stringify(records));
}

// -------------------------
// PATIENT FORM HANDLING
// -------------------------
const patientForm = document.getElementById('patientForm');
if (patientForm) {
    patientForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const fullName = document.getElementById('fullName').value;
        const age = document.getElementById('age').value;
        const gender = document.getElementById('gender').value;
        const contact = document.getElementById('contact').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;

        if (fullName && age && gender && contact && email && address) {
            const patients = getRecords('patients');
            patients.push({ fullName, age, gender, contact, email, address });
            setRecords('patients', patients);

            document.getElementById('patientMessage').textContent =
                `Patient ${fullName} registered successfully!`;

            patientForm.reset();
            displayPatientRecords();
        } else {
            document.getElementById('patientMessage').textContent =
                'Please fill all fields correctly.';
        }
    });
}

// -------------------------
// APPOINTMENT FORM HANDLING
// -------------------------
const appointmentForm = document.getElementById('appointmentForm');
if (appointmentForm) {
    appointmentForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const patientName = document.getElementById('patientName').value;
        const doctor = document.getElementById('doctor').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;

        if (patientName && doctor && date && time) {
            const appointments = getRecords('appointments');
            appointments.push({ patientName, doctor, date, time });
            setRecords('appointments', appointments);

            document.getElementById('appointmentMessage').textContent =
                `Appointment booked for ${patientName}.`;

            appointmentForm.reset();
            displayAppointmentRecords();
        } else {
            document.getElementById('appointmentMessage').textContent =
                'Please fill all fields correctly.';
        }
    });
}

// -------------------------
// DISPLAY PATIENT RECORDS (IF PAGE HAS TABLE)
// -------------------------
function displayPatientRecords() {
    const table = document.getElementById('patientRecords');
    if (!table) return;

    const patients = getRecords('patients');

    table.innerHTML = `
        <tr>
            <th>Name</th><th>Age</th><th>Gender</th>
            <th>Contact</th><th>Email</th><th>Address</th>
        </tr>
        ${patients.map(p => `
            <tr>
                <td>${p.fullName}</td>
                <td>${p.age}</td>
                <td>${p.gender}</td>
                <td>${p.contact}</td>
                <td>${p.email}</td>
                <td>${p.address}</td>
            </tr>
        `).join('')}
    `;
}

// -------------------------
// DISPLAY APPOINTMENT RECORDS (IF PAGE HAS TABLE)
// -------------------------
function displayAppointmentRecords() {
    const table = document.getElementById('appointmentRecords');
    if (!table) return;

    const appointments = getRecords('appointments');

    table.innerHTML = `
        <tr>
            <th>Patient Name</th><th>Doctor</th>
            <th>Date</th><th>Time</th>
        </tr>
        ${appointments.map(a => `
            <tr>
                <td>${a.patientName}</td>
                <td>${a.doctor}</td>
                <td>${a.date}</td>
                <td>${a.time}</td>
            </tr>
        `).join('')}
    `;
}

// -------------------------
// DISPLAY COMBINED RECORDS (FOR records.html)
// -------------------------
function displayCombinedRecords() {
    const table = document.getElementById('recordsTable');
    if (!table) return;

    const patients = getRecords('patients');
    const appointments = getRecords('appointments');

    // Merge patient with appointment (if they have one)
    const merged = patients.map(p => {
        const appointment =
            appointments.find(a => a.patientName === p.fullName) || {};

        return {
            ...p,
            doctor: appointment.doctor || '-',
            date: appointment.date || '-',
            time: appointment.time || '-'
        };
    });

    table.innerHTML = `
        <tr>
            <th>Name</th><th>Age</th><th>Gender</th>
            <th>Contact</th><th>Email</th><th>Address</th>
            <th>Doctor</th><th>Date</th><th>Time</th>
        </tr>
        ${merged.map(m => `
            <tr>
                <td>${m.fullName}</td>
                <td>${m.age}</td>
                <td>${m.gender}</td>
                <td>${m.contact}</td>
                <td>${m.email}</td>
                <td>${m.address}</td>
                <td>${m.doctor}</td>
                <td>${m.date}</td>
                <td>${m.time}</td>
            </tr>
        `).join('')}
    `;
}

// -------------------------
// AUTO-RUN WHEN PAGE LOADS
// -------------------------
document.addEventListener('DOMContentLoaded', () => {
    displayPatientRecords();
    displayAppointmentRecords();
    displayCombinedRecords();
});