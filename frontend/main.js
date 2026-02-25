// Check authentication
fetch('php/check_session.php')
    .then(r => r.json())
    .then(data => {
        if (!data.logged_in) {
            window.location.href = 'index.html';
        } else {
            document.getElementById('userName').textContent = data.user.full_name;
        }
    });

// Toast notification
function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.style.display = 'block';
    setTimeout(() => toast.style.display = 'none', 3000);
}

// Load statistics
function loadStats() {
    fetch('php/get_stats.php')
        .then(r => r.json())
        .then(data => {
            document.getElementById('statTotal').textContent = data.total_equipment;
            document.getElementById('statAvailable').textContent = data.available;
            document.getElementById('statInUse').textContent = data.in_use;
            document.getElementById('statMaintenance').textContent = data.maintenance;
            document.getElementById('statLabs').textContent = data.total_labs;
        });
}

// Load laboratories for dropdown
function loadLabs() {
    fetch('php/get_labs.php')
        .then(r => r.json())
        .then(data => {
            const select = document.getElementById('eqLab');
            data.forEach(lab => {
                const option = document.createElement('option');
                option.value = lab.id;
                option.textContent = lab.lab_name;
                select.appendChild(option);
            });
        });
}

// Load equipment table
function loadEquipment() {
    fetch('php/get_equipment.php')
        .then(r => r.json())
        .then(data => {
            const tbody = document.getElementById('equipmentTable');
            if (data.length === 0) {
                tbody.innerHTML = '<tr><td colspan="8" class="empty">No equipment found</td></tr>';
                return;
            }
            
            tbody.innerHTML = data.map(eq => `
                <tr id="row-${eq.id}">
                    <td>${eq.id}</td>
                    <td id="name-${eq.id}">${eq.equipment_name}</td>
                    <td id="brand-${eq.id}">${eq.brand || '-'} / ${eq.model || '-'}</td>
                    <td id="serial-${eq.id}">${eq.serial_number || '-'}</td>
                    <td id="lab-${eq.id}">${eq.lab_name || '-'}</td>
                    <td id="cat-${eq.id}">${eq.category}</td>
                    <td><span class="status ${eq.status}">${eq.status.replace('_', ' ')}</span></td>
                    <td class="actions">
                        <button class="btn-small btn-edit" onclick="editEquipment(${eq.id})">Edit</button>
                        <button class="btn-small btn-delete" onclick="deleteEquipment(${eq.id})">Delete</button>
                    </td>
                </tr>
            `).join('');
        });
}

// Add equipment
document.getElementById('addForm').onsubmit = async (e) => {
    e.preventDefault();
    
    const data = {
        equipment_name: document.getElementById('eqName').value,
        brand: document.getElementById('eqBrand').value,
        model: document.getElementById('eqModel').value,
        serial_number: document.getElementById('eqSerial').value,
        lab_id: document.getElementById('eqLab').value,
        category: document.getElementById('eqCategory').value,
        status: document.getElementById('eqStatus').value,
        date_acquired: document.getElementById('eqDate').value
    };
    
    const res = await fetch('php/add_equipment.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    
    const result = await res.json();
    if (result.success) {
        showToast('Equipment added successfully!');
        e.target.reset();
        loadEquipment();
        loadStats();
    } else {
        showToast('Error: ' + result.message);
    }
};

// Edit equipment (inline)
function editEquipment(id) {
    const row = document.getElementById(`row-${id}`);
    const name = document.getElementById(`name-${id}`).textContent;
    const brandModel = document.getElementById(`brand-${id}`).textContent.split(' / ');
    const serial = document.getElementById(`serial-${id}`).textContent;
    const lab = document.getElementById(`lab-${id}`).textContent;
    const cat = document.getElementById(`cat-${id}`).textContent;
    
    row.innerHTML = `
        <td>${id}</td>
        <td><input type="text" id="edit-name-${id}" value="${name}" class="edit-input"></td>
        <td>
            <input type="text" id="edit-brand-${id}" value="${brandModel[0] === '-' ? '' : brandModel[0]}" placeholder="Brand" style="width:45%">
            <input type="text" id="edit-model-${id}" value="${brandModel[1] === '-' ? '' : brandModel[1]}" placeholder="Model" style="width:45%">
        </td>
        <td><input type="text" id="edit-serial-${id}" value="${serial === '-' ? '' : serial}"></td>
        <td>
            <select id="edit-lab-${id}">
                ${document.getElementById('eqLab').innerHTML}
            </select>
        </td>
        <td>
            <select id="edit-cat-${id}">
                <option value="Computer" ${cat === 'Computer' ? 'selected' : ''}>Computer</option>
                <option value="Network" ${cat === 'Network' ? 'selected' : ''}>Network</option>
                <option value="Display" ${cat === 'Display' ? 'selected' : ''}>Display</option>
                <option value="Peripheral" ${cat === 'Peripheral' ? 'selected' : ''}>Peripheral</option>
                <option value="Development" ${cat === 'Development' ? 'selected' : ''}>Development</option>
                <option value="Server" ${cat === 'Server' ? 'selected' : ''}>Server</option>
                <option value="Audio" ${cat === 'Audio' ? 'selected' : ''}>Audio</option>
            </select>
        </td>
        <td>
            <select id="edit-status-${id}">
                <option value="available">Available</option>
                <option value="in_use">In Use</option>
                <option value="maintenance">Maintenance</option>
                <option value="broken">Broken</option>
            </select>
        </td>
        <td class="actions">
            <button class="btn-small btn-save" onclick="saveEquipment(${id})">Save</button>
            <button class="btn-small btn-cancel" onclick="loadEquipment()">Cancel</button>
        </td>
    `;
}

// Save edited equipment
async function saveEquipment(id) {
    const data = {
        id: id,
        equipment_name: document.getElementById(`edit-name-${id}`).value,
        brand: document.getElementById(`edit-brand-${id}`).value,
        model: document.getElementById(`edit-model-${id}`).value,
        serial_number: document.getElementById(`edit-serial-${id}`).value,
        lab_id: document.getElementById(`edit-lab-${id}`).value,
        category: document.getElementById(`edit-cat-${id}`).value,
        status: document.getElementById(`edit-status-${id}`).value,
        date_acquired: new Date().toISOString().split('T')[0]
    };
    
    const res = await fetch('php/update_equipment.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    
    const result = await res.json();
    if (result.success) {
        showToast('Equipment updated!');
        loadEquipment();
        loadStats();
    } else {
        showToast('Error updating equipment');
    }
}

// Delete equipment
async function deleteEquipment(id) {
    if (!confirm('Are you sure you want to delete this equipment?')) return;
    
    const res = await fetch('php/delete_equipment.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id: id})
    });
    
    const result = await res.json();
    if (result.success) {
        showToast('Equipment deleted!');
        loadEquipment();
        loadStats();
    }
}

// Logout
function logout() {
    fetch('php/logout.php')
        .then(() => window.location.href = 'index.html');
}

// Initialize
loadStats();
loadLabs();
loadEquipment();