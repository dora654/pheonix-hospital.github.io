// Patient Form Submission
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

        // Basic validation
        if (fullName && age && gender && contact && email && address) {
            document.getElementById('patientMessage').textContent = `Patient ${fullName} registered successfully!`;
            patientForm.reset();
        } else {
            document.getElementById('patientMessage').textContent = 'Please fill all fields correctly.';
        }
    });
}

// Appointment Form Submission
const appointmentForm = document.getElementById('appointmentForm');
if (appointmentForm) {
    appointmentForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const patientName = document.getElementById('patientName').value;
        const doctor = document.getElementById('doctor').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;

        if (patientName && doctor && date && time) {
            document.getElementById('appointmentMessage').textContent = `Appointment booked for ${patientName} with ${doctor} on ${date} at ${time}.`;
            appointmentForm.reset();
        } else {
            document.getElementById('appointmentMessage').textContent = 'Please fill all fields correctly.';
        }
    });
}
// Display combined Patient + Appointment Records
function displayCombinedRecords() {
    const recordsTable = document.getElementById('recordsTable');
    if (!recordsTable) return;

    const patients = getRecords('patients');
    const appointments = getRecords('appointments');

    // Merge patients with their appointments
    const combined = patients.map(p => {
        const appointment = appointments.find(a => a.patientName === p.fullName) || {};
        return { ...p, doctor: appointment.doctor || '-', date: appointment.date || '-', time: appointment.time || '-' };
    });

    // Generate table
    recordsTable.innerHTML = `
        <tr>
            <th>Name</th><th>Age</th><th>Gender</th><th>Contact</th><th>Email</th><th>Address</th>
            <th>Doctor</th><th>Appointment Date</th><th>Time</th>
        </tr>
        ${combined.map(c => `
        <tr>
            <td>${c.fullName}</td>
            <td>${c.age}</td>
            <td>${c.gender}</td>
            <td>${c.contact}</td>
            <td>${c.email}</td>
            <td>${c.address}</td>
            <td>${c.doctor}</td>
            <td>${c.date}</td>
            <td>${c.time}</td>
        </tr>`).join('')}
    `;
}

// Call combined record display
document.addEventListener('DOMContentLoaded', () => {
    displayCombinedRecords();
});