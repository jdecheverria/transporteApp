// /public/js/script.js
document.addEventListener('DOMContentLoaded', function() {
  const transportForm = document.getElementById('transportForm');
  const maintenanceForm = document.getElementById('maintenanceForm');
  const viewMaintenancesButton = document.getElementById('viewMaintenances');
  const backToIndexButton = document.getElementById('backToIndex');
  const downloadPdfButton = document.getElementById('downloadPdf');

  if (transportForm) {
    transportForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = {
        date: document.getElementById('date').value,
        kmInicial: document.getElementById('kmInicial').value,
        kmFinal: document.getElementById('kmFinal').value
      };
      
      fetch('/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Datos guardados con éxito');
        } else {
          alert('Error al guardar los datos');
        }
      });
    });
  }

  if (maintenanceForm) {
    maintenanceForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const maintenanceData = {
        oilChange: document.getElementById('oilChange').value,
        tireChange: document.getElementById('tireChange').value,
        tireRotation: document.getElementById('tireRotation').value
      };
      
      fetch('/saveMaintenance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(maintenanceData)
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Datos de mantenimiento guardados con éxito');
        } else {
          alert('Error al guardar los datos de mantenimiento');
        }
      });
    });
  }

  if (viewMaintenancesButton) {
    viewMaintenancesButton.addEventListener('click', function() {
      window.location.href = 'maintenances.html';
    });
  }

  if (backToIndexButton) {
    backToIndexButton.addEventListener('click', function() {
      window.location.href = 'index.html';
    });
  }

  if (downloadPdfButton) {
    downloadPdfButton.addEventListener('click', function() {
      fetch('/download', {
        method: 'GET'
      })
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'registro_transporte.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      });
    });
  }
});
