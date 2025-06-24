// API Base URL - Update this if your backend runs on a different port
const API_BASE_URL = 'http://localhost:9090';

// Global variables
let employees = [];
let filteredEmployees = [];

// DOM Elements
const employeeForm = document.getElementById('employeeForm');
const editEmployeeForm = document.getElementById('editEmployeeForm');
const employeeGrid = document.getElementById('employeeGrid');
const loading = document.getElementById('loading');
const searchInput = document.getElementById('searchInput');
const editModal = document.getElementById('editModal');
const toast = document.getElementById('toast');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadEmployees();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Add employee form submission
    employeeForm.addEventListener('submit', handleAddEmployee);
    
    // Edit employee form submission
    editEmployeeForm.addEventListener('submit', handleEditEmployee);
    
    // Search functionality
    searchInput.addEventListener('input', debounce(searchEmployees, 300));
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === editModal) {
            closeEditModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeEditModal();
        }
    });
}

// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Load all employees from the backend
async function loadEmployees() {
    try {
        showLoading(true);
        const response = await fetch(`${API_BASE_URL}/employees`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        employees = await response.json();
        filteredEmployees = [...employees];
        displayEmployees(filteredEmployees);
        showToast('Employees loaded successfully!', 'success');
    } catch (error) {
        console.error('Error loading employees:', error);
        showToast('Error loading employees. Please check if the backend is running.', 'error');
        displayEmptyState();
    } finally {
        showLoading(false);
    }
}

// Display employees in the grid
function displayEmployees(employeeList) {
    if (employeeList.length === 0) {
        displayEmptyState();
        return;
    }
    
    employeeGrid.innerHTML = employeeList.map(employee => `
        <div class="employee-card">
            <div class="employee-info">
                <h3><i class="fas fa-user"></i> ${escapeHtml(employee.name)}</h3>
                <p><i class="fas fa-envelope"></i> ${escapeHtml(employee.email)}</p>
                <p><i class="fas fa-phone"></i> ${escapeHtml(employee.phone)}</p>
                <p><i class="fas fa-id-badge"></i> ID: ${employee.id}</p>
            </div>
            <div class="employee-actions">
                <button class="btn btn-edit" onclick="openEditModal(${employee.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-danger" onclick="deleteEmployee(${employee.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `).join('');
}

// Display empty state when no employees found
function displayEmptyState() {
    employeeGrid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
            <i class="fas fa-users"></i>
            <h3>No employees found</h3>
            <p>Add some employees to get started!</p>
        </div>
    `;
}

// Handle adding new employee
async function handleAddEmployee(event) {
    event.preventDefault();
    
    const formData = new FormData(employeeForm);
    const employeeData = {
        name: formData.get('name').trim(),
        email: formData.get('email').trim(),
        phone: formData.get('phone').trim()
    };
    
    // Basic validation
    if (!employeeData.name || !employeeData.email || !employeeData.phone) {
        showToast('Please fill in all fields', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/employees`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employeeData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.text();
        showToast(result, 'success');
        clearForm();
        loadEmployees(); // Reload the employee list
    } catch (error) {
        console.error('Error adding employee:', error);
        showToast('Error adding employee. Please try again.', 'error');
    }
}

// Handle editing employee
async function handleEditEmployee(event) {
    event.preventDefault();
    
    const formData = new FormData(editEmployeeForm);
    const employeeId = document.getElementById('editId').value;
    const employeeData = {
        name: formData.get('name').trim(),
        email: formData.get('email').trim(),
        phone: formData.get('phone').trim()
    };
    
    // Basic validation
    if (!employeeData.name || !employeeData.email || !employeeData.phone) {
        showToast('Please fill in all fields', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/employees/${employeeId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employeeData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.text();
        showToast(result, 'success');
        closeEditModal();
        loadEmployees(); // Reload the employee list
    } catch (error) {
        console.error('Error updating employee:', error);
        showToast('Error updating employee. Please try again.', 'error');
    }
}

// Delete employee
async function deleteEmployee(id) {
    if (!confirm('Are you sure you want to delete this employee?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.text();
        showToast(result, 'success');
        loadEmployees(); // Reload the employee list
    } catch (error) {
        console.error('Error deleting employee:', error);
        showToast('Error deleting employee. Please try again.', 'error');
    }
}

// Open edit modal
async function openEditModal(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/employees/${id}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const employee = await response.json();
        
        // Populate the edit form
        document.getElementById('editId').value = employee.id;
        document.getElementById('editName').value = employee.name;
        document.getElementById('editEmail').value = employee.email;
        document.getElementById('editPhone').value = employee.phone;
        
        // Show the modal
        editModal.style.display = 'block';
    } catch (error) {
        console.error('Error loading employee details:', error);
        showToast('Error loading employee details. Please try again.', 'error');
    }
}

// Close edit modal
function closeEditModal() {
    editModal.style.display = 'none';
    editEmployeeForm.reset();
}

// Search employees
function searchEmployees() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        filteredEmployees = [...employees];
    } else {
        filteredEmployees = employees.filter(employee => 
            employee.name.toLowerCase().includes(searchTerm) ||
            employee.email.toLowerCase().includes(searchTerm) ||
            employee.phone.toLowerCase().includes(searchTerm)
        );
    }
    
    displayEmployees(filteredEmployees);
}

// Clear form
function clearForm() {
    employeeForm.reset();
}

// Show/hide loading spinner
function showLoading(show) {
    loading.style.display = show ? 'block' : 'none';
}

// Show toast notification
function showToast(message, type = 'success') {
    const toastMessage = document.getElementById('toastMessage');
    toastMessage.textContent = message;
    
    toast.className = `toast ${type}`;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}
