let ascending = true;

      function orderTempo() {
        const table = document.getElementById("table");
        const tbody = table.querySelector("tbody");
        const rows = Array.from(tbody.getElementsByTagName("tr"));
        const arrowIcon = document.getElementById("arrow-icon");

        arrowIcon.textContent = ascending ? "▲" : "▼";

        rows.sort((a, b) => {
          let aValue = parseInt(a.cells[3].innerText.trim());
          let bValue = parseInt(b.cells[3].innerText.trim());

          if (isNaN(aValue)) aValue = 0;
          if (isNaN(bValue)) bValue = 0;

          if (ascending) {
            return aValue - bValue;
          } else {
            return bValue - aValue;
          }
        });

        rows.forEach((row) => tbody.appendChild(row));

        ascending = !ascending;
      }

      function updateTimes() {
        const table = document.getElementById("table");
        const rows = table.querySelectorAll("tbody tr");

        const currentDate = new Date();

        rows.forEach((row) => {
          const lastSaleDateString = row.cells[1].innerText;
          const lastSaleDateParts = lastSaleDateString.split("/");
          const lastSaleDate = new Date(
            lastSaleDateParts[2],
            lastSaleDateParts[1] - 1,
            lastSaleDateParts[0]
          );
          const monthsDifference = diffInMonths(currentDate, lastSaleDate);

          row.cells[3].innerText = isNaN(monthsDifference)
            ? "Data inválida"
            : monthsDifference + " meses";
        });
      }

      function sortTableByTime() {
        const table = document.getElementById("table");
        const tbody = table.querySelector("tbody");
        const rows = Array.from(tbody.getElementsByTagName("tr"));

        rows.sort((a, b) => {
          let aValue = parseInt(a.cells[3].innerText.trim());
          let bValue = parseInt(b.cells[3].innerText.trim());

          if (isNaN(aValue)) aValue = 0;
          if (isNaN(bValue)) bValue = 0;

          return bValue - aValue;
        });

        rows.forEach((row) => tbody.appendChild(row));
      }

      updateTimes();

      sortTableByTime();