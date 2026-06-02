/* ==========================================================================
   KritiKaKanvas — Admin Console JavaScript Controller
   ========================================================================== */

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyLZ_ikhIN5uvQPH2J__N8WZ3xClcMQjZqRb5ttf364wQUhBZ0r5s14NmpjlPvr-lbb/exec';

// ── GLOBAL STATE ──
let adminPassword = '';
let storeOrders = [];
let storeCommissions = [];
let activeOrderFilter = 'all';
let activeCommFilter = 'all';

// ── DOM ELEMENTS ──
const loginShield     = document.getElementById('login-shield');
const dashboardWrapper = document.getElementById('dashboard-wrapper');
const passcodeField    = document.getElementById('admin-passcode');
const btnTogglePass    = document.getElementById('btn-toggle-pass');
const btnLogin         = document.getElementById('btn-login');
const loginError       = document.getElementById('login-error');
const btnLogout        = document.getElementById('btn-logout');

const statSales        = document.getElementById('stat-sales');
const statOrders       = document.getElementById('stat-orders');
const statCommissions  = document.getElementById('stat-commissions');
const btnRefresh       = document.getElementById('btn-refresh');
const skeletonLoader   = document.getElementById('data-skeleton');

const ordersList       = document.getElementById('orders-list');
const ordersEmpty      = document.getElementById('orders-empty');
const commissionsList  = document.getElementById('commissions-list');
const commissionsEmpty = document.getElementById('commissions-empty');

const shippingModal    = document.getElementById('shipping-modal');
const modalRowIndex    = document.getElementById('modal-order-row-index');
const modalOrderId     = document.getElementById('modal-order-id');
const modalCarrier     = document.getElementById('shipping-carrier');
const modalTrackingId  = document.getElementById('shipping-tracking-id');
const btnCloseModal    = document.getElementById('btn-close-modal');
const btnCancelShip    = document.getElementById('btn-cancel-shipment');
const btnConfirmShip   = document.getElementById('btn-confirm-shipment');

const toastNotification = document.getElementById('toast');

// ── 1. AUTHENTICATION & LOGIN FLOW ──

// Check session storage on page load
window.addEventListener('DOMContentLoaded', () => {
  const savedPass = sessionStorage.getItem('kkc_admin_pass');
  if (savedPass) {
    adminPassword = savedPass;
    showDashboard();
  }
});

// Toggle password visibility
btnTogglePass.addEventListener('click', () => {
  if (passcodeField.type === 'password') {
    passcodeField.type = 'text';
    btnTogglePass.textContent = '🙈';
  } else {
    passcodeField.type = 'password';
    btnTogglePass.textContent = '👁️';
  }
});

// Login button trigger
btnLogin.addEventListener('click', attemptLogin);
passcodeField.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') attemptLogin();
});

// Logout trigger
btnLogout.addEventListener('click', () => {
  sessionStorage.removeItem('kkc_admin_pass');
  adminPassword = '';
  storeOrders = [];
  storeCommissions = [];
  
  dashboardWrapper.classList.add('dashboard-hidden');
  loginShield.classList.remove('shield-hidden');
  passcodeField.value = '';
  loginError.textContent = '';
});

// Perform secure log in authentication
async function attemptLogin() {
  const pass = passcodeField.value.trim();
  if (!pass) {
    showLoginError('Please enter a passcode');
    return;
  }

  setLoginLoading(true);
  
  try {
    const res = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' }, // Avoid CORS preflight on basic post
      body: JSON.stringify({
        action: 'admin_login',
        password: pass
      })
    });

    const data = await res.json();
    
    if (data.success) {
      adminPassword = pass;
      sessionStorage.setItem('kkc_admin_pass', pass);
      showDashboard();
    } else {
      showLoginError('Invalid passcode. Please try again.');
    }
  } catch (err) {
    console.error('Authentication error:', err);
    showLoginError('Server connection failed. Try again.');
  } finally {
    setLoginLoading(false);
  }
}

function showLoginError(msg) {
  loginError.textContent = msg;
  passcodeField.classList.add('error-shake');
  setTimeout(() => passcodeField.classList.remove('error-shake'), 500);
}

function setLoginLoading(isLoading) {
  btnLogin.disabled = isLoading;
  btnLogin.textContent = isLoading ? 'Verifying Passcode…' : 'Unlock Dashboard ➔';
  btnLogin.style.opacity = isLoading ? '0.7' : '1';
}

function showDashboard() {
  loginShield.classList.add('shield-hidden');
  dashboardWrapper.classList.remove('dashboard-hidden');
  fetchData();
}

// ── 2. DATA SYNCHRONIZATION ──

async function fetchData() {
  showSkeletons(true);
  btnRefresh.disabled = true;
  btnRefresh.style.opacity = '0.6';

  try {
    const res = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({
        action: 'admin_get_data',
        password: adminPassword
      })
    });

    const data = await res.json();

    if (data.success) {
      storeOrders = data.orders || [];
      storeCommissions = data.commissions || [];
      
      calculateMetrics();
      renderAll();
    } else {
      if (data.error && data.error.includes('Unauthorized')) {
        // Token expired/invalid
        btnLogout.click();
        alert('Your session has expired. Please log in again.');
      } else {
        showToast('Error syncing spreadsheet: ' + data.error);
      }
    }
  } catch (err) {
    console.error('Data sync failed:', err);
    showToast('Failed to connect to Google Sheets. Check your internet connection.');
  } finally {
    showSkeletons(false);
    btnRefresh.disabled = false;
    btnRefresh.style.opacity = '1';
  }
}

function showSkeletons(show) {
  if (show) {
    skeletonLoader.classList.remove('hidden');
    ordersList.parentElement.classList.add('hidden');
    commissionsList.parentElement.classList.add('hidden');
    ordersEmpty.classList.add('hidden');
    commissionsEmpty.classList.add('hidden');
  } else {
    skeletonLoader.classList.add('hidden');
    // Reveal tables based on active tabs
    const activeTab = document.querySelector('.tab-btn.active').dataset.target;
    if (activeTab === 'tab-orders') {
      ordersList.parentElement.classList.remove('hidden');
    } else {
      commissionsList.parentElement.classList.remove('hidden');
    }
  }
}

// ── 3. METRICS ANALYTICS CALCULATOR ──

function calculateMetrics() {
  // 1. Total sales (sums up 'total' for Completed orders AND 'price' for Completed commissions)
  let totalRevenue = 0;
  storeOrders.forEach(o => {
    if (o.status === 'Completed') {
      const numericTotal = Number(String(o.total).replace(/[^0-9.]/g, '')) || 0;
      totalRevenue += numericTotal;
    }
  });
  storeCommissions.forEach(c => {
    if (c.status === 'Completed') {
      const numericPrice = Number(String(c.price).replace(/[^0-9.]/g, '')) || 0;
      totalRevenue += numericPrice;
    }
  });
  statSales.textContent = '₹' + totalRevenue.toLocaleString('en-IN');

  // 2. Active orders (Pending or Shipped)
  const activeOrdersCount = storeOrders.filter(o => o.status === 'Pending' || o.status === 'Shipped').length;
  statOrders.textContent = activeOrdersCount;

  // 3. Pending commissions (New, Contacted, Shipped)
  const pendingCommsCount = storeCommissions.filter(c => c.status === 'New' || c.status === 'Contacted' || c.status === 'Shipped').length;
  statCommissions.textContent = pendingCommsCount;
}

// ── 4. RENDERERS & LAYOUT DISPLAY ──

function renderAll() {
  renderOrders();
  renderCommissions();
}

// Shop Orders Table
function renderOrders() {
  ordersList.innerHTML = '';
  
  const filtered = activeOrderFilter === 'all' 
    ? storeOrders 
    : storeOrders.filter(o => o.status === activeOrderFilter);

  if (filtered.length === 0) {
    ordersEmpty.classList.remove('hidden');
    ordersList.parentElement.classList.add('hidden');
    return;
  }

  ordersEmpty.classList.add('hidden');
  if (document.querySelector('.tab-btn.active').dataset.target === 'tab-orders') {
    ordersList.parentElement.classList.remove('hidden');
  }

  filtered.forEach(order => {
    const tr = document.createElement('tr');
    
    // Parse order items beautifully
    let formattedItems = '';
    try {
      const itemsArr = JSON.parse(order.items);
      formattedItems = itemsArr.map(item => `${item.name} × ${item.qty}`).join('<br>');
    } catch (e) {
      formattedItems = order.items || 'N/A';
    }

    // Action buttons depending on status
    let actionButtons = '';
    if (order.status === 'Pending') {
      actionButtons = `
        <button class="btn-table ship" onclick="triggerShippingModal(${order.rowIndex}, '${order.orderId}')">Ship</button>
        <button class="btn-table complete" onclick="updateRecordStatus('Orders', ${order.rowIndex}, 'Completed', { orderId: '${order.orderId}' })">Complete</button>
      `;
    } else if (order.status === 'Shipped') {
      actionButtons = `
        <button class="btn-table complete" onclick="updateRecordStatus('Orders', ${order.rowIndex}, 'Completed', { orderId: '${order.orderId}' })">Complete</button>
      `;
    } else {
      actionButtons = `<span style="font-size:0.75rem;color:var(--text-muted)">Archive Locked</span>`;
    }

    tr.innerHTML = `
      <td><span class="order-id-label">${order.orderId}</span></td>
      <td>
        <span class="date-main">${order.dateTime.split(',')[0]}</span>
        <span class="date-subtext">${order.dateTime.split(',')[1] || ''}</span>
      </td>
      <td>
        <span class="client-name">${order.name}</span>
        <span class="client-contact">📞 ${order.phone}</span>
        <span class="client-contact">✉️ ${order.email}</span>
        <span class="client-contact" style="max-width:200px;display:block;white-space:normal;margin-top:4px;color:#aaa">📍 ${order.address}</span>
      </td>
      <td>
        <span class="item-list-desc">${formattedItems}</span>
        <span class="price-bold">${order.total}</span>
      </td>
      <td><span class="payment-badge">${order.paymentMethod}</span></td>
      <td><span class="status-badge ${order.status.toLowerCase()}">${order.status}</span></td>
      <td class="actions-col">${actionButtons}</td>
    `;
    
    ordersList.appendChild(tr);
  });
}

// Commission Inquiries Grid Table
function renderCommissions() {
  commissionsList.innerHTML = '';
  
  const filtered = activeCommFilter === 'all'
    ? storeCommissions
    : storeCommissions.filter(c => c.status === activeCommFilter);

  if (filtered.length === 0) {
    commissionsEmpty.classList.remove('hidden');
    commissionsList.parentElement.classList.add('hidden');
    return;
  }

  commissionsEmpty.classList.add('hidden');
  if (document.querySelector('.tab-btn.active').dataset.target === 'tab-commissions') {
    commissionsList.parentElement.classList.remove('hidden');
  }

  filtered.forEach(comm => {
    const tr = document.createElement('tr');
    
    // Action buttons depending on status
    let actionButtons = '';
    if (comm.status === 'New') {
      actionButtons = `
        <button class="btn-table contact" onclick="updateRecordStatus('Commissions', ${comm.rowIndex}, 'Contacted', { dateTime: '${comm.dateTime}', email: '${comm.email}' })">Contacted</button>
        <button class="btn-table ship" onclick="triggerShippingModal(${comm.rowIndex}, '${comm.artworkType || 'Custom'}', 'Commissions')">Ship</button>
        <button class="btn-table complete" onclick="updateRecordStatus('Commissions', ${comm.rowIndex}, 'Completed', { dateTime: '${comm.dateTime}', email: '${comm.email}' })">Complete</button>
      `;
    } else if (comm.status === 'Contacted') {
      actionButtons = `
        <button class="btn-table ship" onclick="triggerShippingModal(${comm.rowIndex}, '${comm.artworkType || 'Custom'}', 'Commissions')">Ship</button>
        <button class="btn-table complete" onclick="updateRecordStatus('Commissions', ${comm.rowIndex}, 'Completed', { dateTime: '${comm.dateTime}', email: '${comm.email}' })">Complete</button>
      `;
    } else if (comm.status === 'Shipped') {
      actionButtons = `
        <button class="btn-table complete" onclick="updateRecordStatus('Commissions', ${comm.rowIndex}, 'Completed', { dateTime: '${comm.dateTime}', email: '${comm.email}' })">Complete</button>
      `;
    } else {
      actionButtons = `<span style="font-size:0.75rem;color:var(--text-muted)">Archive Locked</span>`;
    }

    // Show price badge if completed
    const priceText = comm.status === 'Completed' ? `<span class="price-bold" style="margin-top:4px;display:block">₹${(Number(comm.price) || 0).toLocaleString('en-IN')}</span>` : '';

    tr.innerHTML = `
      <td>
        <span class="date-main">${comm.dateTime.split(',')[0]}</span>
        <span class="date-subtext">${comm.dateTime.split(',')[1] || ''}</span>
      </td>
      <td>
        <span class="client-name">${comm.name}</span>
        <span class="client-contact">✉️ ${comm.email}</span>
      </td>
      <td>
        <span class="status-badge new" style="background:rgba(196,94,42,0.1);color:var(--terracotta);border-color:rgba(196,94,42,0.2)">${comm.artworkType || 'Custom'}</span>
        ${priceText}
      </td>
      <td>
        <div class="story-bubble">${comm.story}</div>
      </td>
      <td><span class="status-badge ${comm.status.toLowerCase()}">${comm.status}</span></td>
      <td class="actions-col">${actionButtons}</td>
    `;
    
    commissionsList.appendChild(tr);
  });
}

// ── 5. RECORD STATUS UPDATER ACTIONS ──

async function updateRecordStatus(sheetName, rowIndex, nextStatus, identifyingData = {}) {
  // Confirm actions first
  if (sheetName === 'Commissions' && nextStatus === 'Completed') {
    const userInput = prompt("What was the final negotiated price for this commission (₹)?", "0");
    if (userInput === null) return; // user cancelled
    const price = Number(userInput.replace(/[^0-9.]/g, '')) || 0;
    identifyingData.price = price;
  } else if (nextStatus === 'Completed' && !confirm(`Are you sure you want to mark this row as Completed?`)) {
    return;
  }

  showToast('Updating status…', 0); // Open permanent status message

  try {
    const res = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({
        action: 'admin_update_status',
        password: adminPassword,
        sheetName: sheetName,
        rowIndex: rowIndex,
        status: nextStatus,
        ...identifyingData
      })
    });

    const data = await res.json();

    if (data.success) {
      showToast(`${sheetName === 'Orders' ? 'Order' : 'Commission'} marked as ${nextStatus}! 🎉`);
      fetchData(); // Trigger full refresh to align metrics
    } else {
      showToast('Action failed: ' + data.error);
    }
  } catch (err) {
    console.error('Update operation failed:', err);
    showToast('Failed to connect to backend. Check your connections.');
  }
}

// ── 6. SHIPPING DISPATCH OVERLAY MODAL ──

function triggerShippingModal(rowIndex, orderId, sheetName = 'Orders') {
  modalRowIndex.value = rowIndex;
  modalOrderId.value  = orderId;
  document.getElementById('modal-order-sheet-name').value = sheetName;
  modalCarrier.value  = 'DTDC';
  modalTrackingId.value = '';
  
  shippingModal.classList.add('show');
  modalTrackingId.focus();
}

function hideShippingModal() {
  shippingModal.classList.remove('show');
}

// Modal closing event listeners
btnCloseModal.addEventListener('click', hideShippingModal);
btnCancelShip.addEventListener('click', hideShippingModal);
shippingModal.addEventListener('click', (e) => {
  if (e.target === shippingModal) hideShippingModal();
});

// Confirm Shipment submission
btnConfirmShip.addEventListener('click', async () => {
  const rowIndex   = Number(modalRowIndex.value);
  const orderId    = modalOrderId.value;
  const carrier    = modalCarrier.value;
  const trackingId = modalTrackingId.value.trim();
  const sheetName  = document.getElementById('modal-order-sheet-name').value || 'Orders';

  if (!trackingId) {
    alert('Please enter a valid tracking number or AWB ID');
    return;
  }

  hideShippingModal();
  showToast(`Dispatching ${sheetName === 'Orders' ? 'order' : 'commission'} ${orderId} & sending email notifications…`, 0);

  // Dynamic payload for sheet type (comms require email/date, orders require orderId)
  const identifyPayload = {};
  if (sheetName === 'Commissions') {
    const commRecord = storeCommissions.find(c => c.rowIndex === rowIndex);
    if (commRecord) {
      identifyPayload.dateTime = commRecord.dateTime;
      identifyPayload.email = commRecord.email;
    }
  } else {
    identifyPayload.orderId = orderId;
  }

  try {
    const res = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({
        action: 'admin_update_status',
        password: adminPassword,
        sheetName: sheetName,
        rowIndex: rowIndex,
        status: 'Shipped',
        carrier: carrier,
        trackingNumber: trackingId,
        ...identifyPayload
      })
    });

    const data = await res.json();

    if (data.success) {
      showToast(`${sheetName === 'Orders' ? 'Order' : 'Commission'} marked as Shipped! Customer notified 📬`);
      fetchData();
    } else {
      showToast('Action failed: ' + data.error);
    }
  } catch (err) {
    console.error('Shipping submission failed:', err);
    showToast('Failed to connect to backend. Action aborted.');
  }
});

// ── 7. NAVIGATION & TAB PILLS EVENTS ──

// Refresh button trigger
btnRefresh.addEventListener('click', fetchData);

// Tab Triggers switching
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    
    btn.classList.add('active');
    const targetPane = document.getElementById(btn.dataset.target);
    targetPane.classList.add('active');
    
    // Render list based on current active tab tables list visibility
    if (btn.dataset.target === 'tab-orders') {
      commissionsList.parentElement.classList.add('hidden');
      if (storeOrders.length > 0) ordersList.parentElement.classList.remove('hidden');
    } else {
      ordersList.parentElement.classList.add('hidden');
      if (storeCommissions.length > 0) commissionsList.parentElement.classList.remove('hidden');
    }
    
    renderAll();
  });
});

// Filter Pills row switches
document.querySelectorAll('.pill').forEach(pill => {
  pill.addEventListener('click', () => {
    const pillsRow = pill.parentElement;
    pillsRow.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');

    const filterVal = pill.dataset.filter;
    const isOrdersTab = pillsRow.closest('#tab-orders') !== null;

    if (isOrdersTab) {
      activeOrderFilter = filterVal;
      renderOrders();
    } else {
      activeCommFilter = filterVal;
      renderCommissions();
    }
  });
});

// ── 8. TOAST SYSTEM ──
let toastTimeout;
function showToast(msg, duration = 3000) {
  clearTimeout(toastTimeout);
  toastNotification.textContent = msg;
  toastNotification.classList.add('show');
  
  if (duration > 0) {
    toastTimeout = setTimeout(() => {
      toastNotification.classList.remove('show');
    }, duration);
  }
}
