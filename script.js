// Sample Data (Replace with your actual data)
const inventoryData = [
  { type: 'Ethiopian Yirgacheffe', subscription: 10, prior: 15, current: 18, available: 100 },
  { type: 'Colombian Supremo', subscription: 5, prior: 8, current: 10, available: 150 },
  { type: 'Guatemalan Antigua', subscription: 12, prior: 10, current: 14, available: 120 },
  { type: 'Sumatra Mandheling', subscription: 8, prior: 12, current: 15, available: 90 },
  { type: 'Kenya AA', subscription: 7, prior: 9, current: 11, available: 110 },
  { type: 'Brazil Cerrado', subscription: 9, prior: 13, current: 16, available: 130 },
  { type: 'Costa Rica Tarrazu', subscription: 6, prior: 11, current: 13, available: 80 },
  { type: 'Yemen Mocha', subscription: 4, prior: 7, current: 9, available: 70 },
  { type: 'Indian Monsoon Malabar', subscription: 11, prior: 14, current: 17, available: 140 },
  { type: 'Papua New Guinea Sigri', subscription: 3, prior: 6, current: 8, available: 15 },
];

function populateInventoryTable() {
  const tableBody = document.getElementById('inventoryTableBody');
  tableBody.innerHTML = ''; // Clear existing data

  inventoryData.forEach(item => {
    const totalDemand = item.subscription + item.prior + item.current;
    const amountToRoast = totalDemand;
    const row = tableBody.insertRow();
    row.innerHTML = `
      <td>${item.type}</td>
      <td>${item.subscription}</td>
      <td>${item.prior}</td>
      <td>${item.current}</td>
      <td>${totalDemand}</td>
      <td>${amountToRoast}</td>
      <td class="available-beans">${item.available}</td>
    `;
  });
}

function populateBlendingTable() {
    const tableBody = document.getElementById('blendingTableBody');
    tableBody.innerHTML = '';
    inventoryData.forEach(item => {
        const row = tableBody.insertRow();
        row.innerHTML = `
        <td>${item.type}</td>
        <td class="available-beans">${item.available}</td>
        <td><input type="checkbox" class="region-checkbox"></td>
        `;
    });
}

document.getElementById('blendingNavigation').addEventListener('click', () => {
  document.getElementById('inventoryTableDiv').style.display = 'none';
  document.getElementById('blendingTableDiv').style.display = 'block';
  populateBlendingTable();
});

document.getElementById('inventoryNavigation').addEventListener('click', () => {
  document.getElementById('blendingTableDiv').style.display = 'none';
  document.getElementById('inventoryTableDiv').style.display = 'block';
  populateInventoryTable();
});

document.getElementById('addRegion').addEventListener('click', () => {
  const table = document.getElementById('blendingTable').getElementsByTagName('tbody')[0];
  const newRow = table.insertRow();
  newRow.innerHTML = `
    <td><input type="text" class="region-input"></td>
    <td class="available-beans">0</td>
    <td><input type="checkbox" class="region-checkbox"></td>
  `;
});

document.getElementById('blendButton').addEventListener('click', () => {
  const tableRows = document.getElementById('blendingTable').getElementsByTagName('tbody')[0].rows;
  const selectedRegions = [];

  for (let i = 0; i < tableRows.length; i++) {
    const checkbox = tableRows[i].cells[2].querySelector('.region-checkbox');
    if (checkbox.checked) {
      selectedRegions.push(tableRows[i]);
    }
  }

  if (selectedRegions.length > 2) {
    alert('You can select a maximum of 2 regions.');
    return;
  }

  for (let i = 0; i < selectedRegions.length; i++) {
    const row = selectedRegions[i];
    const regionInput = row.cells[0].querySelector('.region-input');
    const region = regionInput ? regionInput.value : row.cells[0].textContent;
    const available = parseInt(row.cells[1].textContent);
    const beansUsed = selectedRegions.length === 1 ? 6 : 3;

    if (beansUsed <= available) {
      row.cells[1].textContent = available - beansUsed;
      console.log(`Blended ${beansUsed} lbs from ${region}`);
      const inventoryItem = inventoryData.find(item => item.type === region);
      if (inventoryItem) {
        inventoryItem.available -= beansUsed;
      }
    } else {
      alert(`Insufficient beans for ${region}`);
      const importAmount = beansUsed - available;
      alert(`Import ${importAmount} lbs of ${region}`);
    }
  }
  populateInventoryTable();
  populateBlendingTable();
});

populateInventoryTable();