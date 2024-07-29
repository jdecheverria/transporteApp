document.getElementById('transport-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let formData = {
        date: document.getElementById('date').value,
        kmInitial: document.getElementById('km-initial').value,
        kmFinal: document.getElementById('km-final').value,
        oilChangeDate: document.getElementById('oil-change-date').value,
        tireChange: document.getElementById('tire-change').value,
        tireRotationDate: document.getElementById('tire-rotation-date').value
    };

    // Simulación de guardar en base de datos
    console.log('Datos guardados:', formData);
    
    // Aquí agregarías la lógica para almacenar en la base de datos
});

document.getElementById('download-pdf').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text("Registro de Transporte", 10, 10);
    doc.text("Fecha: " + document.getElementById('date').value, 10, 20);
    doc.text("KM Iniciales: " + document.getElementById('km-initial').value, 10, 30);
    doc.text("KM Finales: " + document.getElementById('km-final').value, 10, 40);
    doc.text("Fecha de Cambio de Aceite y Filtro: " + document.getElementById('oil-change-date').value, 10, 50);
    doc.text("Cambio de Neumáticos: " + document.getElementById('tire-change').value, 10, 60);
    doc.text("Fecha de Rotación de Neumáticos: " + document.getElementById('tire-rotation-date').value, 10, 70);
    
    doc.save('registro_transporte.pdf');
});
