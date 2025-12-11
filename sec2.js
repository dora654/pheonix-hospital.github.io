// ===============================
// SAVE PATIENT INFORMATION
// ===============================
document.addEventListener("DOMContentLoaded", function () {

    const patientForm = document.getElementById("patientForm");
    if (patientForm) {
        patientForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const patientData = {
                fullName: document.getElementById("fullName").value,
                age: document.getElementById("age").value,
                gender: document.getElementById("gender").value,
                contact: document.getElementById("contact").value,
                email: document.getElementById("email").value,
                address: document.getElementById("address").value
            };

            let patients = JSON.parse(localStorage.getItem("patients")) || [];
            patients.push(patientData);
            localStorage.setItem("patients", JSON.stringify(patients));

            document.getElementById("patientMessage").innerText = 
                "Patient information saved successfully!";

            // Redirect back to home page after 2 seconds
            setTimeout(() => {
                window.location.href = "home.html";
            }, 2000);
        });
    }

    // ===============================
    // SAVE APPOINTMENT INFORMATION
    // ===============================
    const appointmentForm = document.getElementById("appointmentForm");
    if (appointmentForm) {
        appointmentForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const appointmentData = {
                patientName: document.getElementById("patientName").value,
                doctor: document.getElementById("doctor").value,
                date: document.getElementById("date").value,
                time: document.getElementById("time").value
            };

            let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
            appointments.push(appointmentData);
            localStorage.setItem("appointments", JSON.stringify(appointments));

            document.getElementById("appointmentMessage").innerText =
                "Appointment booked successfully!";

            // Redirect back to home page after 2 seconds
            setTimeout(() => {
                window.location.href = "home.html";
            }, 2000);
        });
    }

    // ===============================
    // DISPLAY RECORDS
    // ===============================
    const recordsTable = document.getElementById("recordsTable");
    if (recordsTable) {
        const patients = JSON.parse(localStorage.getItem("patients")) || [];
        const appointments = JSON.parse(localStorage.getItem("appointments")) || [];

        let tableHTML = `
            <tr>
                <th>Full Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Address</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Time</th>
            </tr>
        `;

        patients.forEach((patient, index) => {
            const app = appointments[index] || {
                doctor: "N/A",
                date: "N/A",
                time: "N/A"
            };

            tableHTML += `
                <tr>
                    <td>${patient.fullName}</td>
                    <td>${patient.age}</td>
                    <td>${patient.gender}</td>
                    <td>${patient.contact}</td>
                    <td>${patient.email}</td>
                    <td>${patient.address}</td>
                    <td>${app.doctor}</td>
                    <td>${app.date}</td>
                    <td>${app.time}</td>
                </tr>
            `;
        });

        recordsTable.innerHTML = tableHTML;
    }
});

// ===============================
// CUSTOMER SUPPORT / REPORT ISSUES
// ===============================
const supportForm = document.getElementById("supportForm");
if (supportForm) {
    supportForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const supportData = {
            name: document.getElementById("supportName").value,
            email: document.getElementById("supportEmail").value,
            message: document.getElementById("supportMessage").value
        };

        let messages = JSON.parse(localStorage.getItem("supportMessages")) || [];
        messages.push(supportData);

        localStorage.setItem("supportMessages", JSON.stringify(messages));

        document.getElementById("supportMessageBox").innerText =
            "Your message has been submitted successfully! We will get back to you soon.";

        supportForm.reset();
    });
}