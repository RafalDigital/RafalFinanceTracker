// Data laporan (disimpan di memori)
    let reports = [];
    let savingsReports = [];
    let currentBalance = 0;
    let savingsBalance = 0;

    // Set tanggal hari ini sebagai default
    document.getElementById('date').valueAsDate = new Date();
    document.getElementById('savingsDate').valueAsDate = new Date();

    // Format angka ke Rupiah
    function formatRupiah(amount) {
        return 'Rp ' + amount.toLocaleString('id-ID');
    }

    // Format tanggal
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    }

    // Update tampilan saldo
    function updateBalance() {
        document.getElementById('currentBalance').textContent = formatRupiah(currentBalance);
        document.getElementById('currentsavingsBalance').textContent = formatRupiah(savingsBalance);
    }

    function customAlert(message) {
        document.getElementById('alertMessage').textContent = message;
        document.getElementById('customAlertModal').style.display = 'flex';
    }

    // Tambah laporan keuangan
    function addReport() {
        const type = document.getElementById('type').value;
        const name = document.getElementById('name').value;
        const amount = parseInt(document.getElementById('amount').value);
        const date = document.getElementById('date').value;

        if (!name || !amount || !date) {
            customAlert('Mohon lengkapi semua field!');
            return;
        }

        if (amount <= 0) {
            customAlert('Nominal harus lebih dari 0!');
            return;
        }

        const report = {
            id: Date.now(),
            type: type,
            name: name,
            amount: amount,
            date: date
        };

        reports.unshift(report);

        if (type === 'income') {
            currentBalance += amount;
        } else {
            currentBalance -= amount;
        }

        document.getElementById('name').value = '';
        document.getElementById('amount').value = '';
        document.getElementById('date').valueAsDate = new Date();

        updateBalance();
        renderReports();
    }

    // Tambah laporan tabungan
    function addSavingsReport() {
        const type = document.getElementById('savingsType').value;
        const amount = parseInt(document.getElementById('savingsAmount').value);
        const date = document.getElementById('savingsDate').value;

        if (!amount || !date) {
            customAlert('Mohon lengkapi semua field!');
            return;
        }

        if (amount <= 0) {
            customAlert('Nominal harus lebih dari 0!');
            return;
        }

        if (type === 'takeOutSavings' && amount > savingsBalance) {
            customAlert('Saldo tabungan tidak cukup!');
            return;
        }

        if (type === 'depositToSavings' && amount > currentBalance) {
            customAlert('Saldo uang tidak cukup!');
            return;
        }

        const report = {
            id: Date.now(),
            type: type,
            amount: amount,
            date: date
        };

        savingsReports.unshift(report);

        if (type === 'depositToSavings') {
            savingsBalance += amount;
            currentBalance -= amount;
        } else {
            savingsBalance -= amount;
            currentBalance += amount;
        }

        document.getElementById('savingsAmount').value = '';
        document.getElementById('savingsDate').valueAsDate = new Date();

        updateBalance();
        renderSavingsReports();
    }

    // Global variable untuk menyimpan callback modal
    let confirmCallback = null;

    // Fungsi untuk menampilkan modal konfirmasi kustom (Menggantikan confirm())
    function customConfirm(message, callback) {
        document.getElementById('confirmMessage').textContent = message;
        document.getElementById('customConfirmModal').style.display = 'flex';
        confirmCallback = callback;
    }

    // Hapus laporan keuangan (hanya yang paling atas)
    function deleteReport(index) {
        if (index !== 0) {
            alert('Hanya laporan paling atas yang bisa dihapus!');
            return;
        }

        customConfirm('Yakin ingin menghapus laporan ini?', (result) => {
            if (result) {
                const report = reports[index];
                
                // Kembalikan saldo sesuai tipe laporan
                if (report.type === 'income') {
                    currentBalance -= report.amount;
                } else {
                    currentBalance += report.amount;
                }

                reports.splice(index, 1);
                updateBalance();
                renderReports();
            }
        });
    }

    // Hapus laporan tabungan (hanya yang paling atas)
    function deleteSavingsReport(index) {
        if (index !== 0) {
            alert('Hanya laporan paling atas yang bisa dihapus!');
            return;
        }

        customConfirm('Yakin ingin menghapus laporan ini?', (result) => {
            if (result) {
                const report = savingsReports[index];
                
                // Kembalikan saldo sesuai tipe laporan
                if (report.type === 'depositToSavings') {
                    savingsBalance -= report.amount;
                    currentBalance += report.amount;
                } else {
                    savingsBalance += report.amount;
                    currentBalance -= report.amount;
                }

                savingsReports.splice(index, 1);
                updateBalance();
                renderSavingsReports();
            }
        });
    }

    // Render laporan keuangan
    function renderReports() {
        const container = document.getElementById('reportsContainer');

        if (reports.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon"><i class="ri-file-chart-line"></i></div>
                    <p>Belum ada laporan keuangan.<br>Tambahkan laporan pertama Anda!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = reports.map((report, index) => `
            <div class="report-card">
                <div class="report-left">
                    <div class="report-icon ${report.type === 'income' ? 'income-icon' : 'expense-icon'}">
                        <i class="ri-${report.type === 'income' ? 'arrow-down' : 'arrow-up'}-circle-line"></i>
                    </div>
                    <div class="report-info">
                        <div class="report-name">${report.name}</div>
                        <div class="report-date"><i class="ri-calendar-2-line"></i> ${formatDate(report.date)}</div>
                    </div>
                </div>
                <div class="report-right">
                    <div class="report-amount ${report.type === 'income' ? 'income-amount' : 'expense-amount'}">
                        ${report.type === 'income' ? '+' : '-'}${formatRupiah(report.amount)}
                    </div>
                    <div class="report-type">${report.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}</div>
                    ${index === 0 ? `<button class="delete-btn" onclick="deleteReport(${index})"><i class="ri-delete-bin-line"></i></button>` : ''}
                </div>
            </div>
        `).join('');
    }

    // Render laporan tabungan
    function renderSavingsReports() {
        const container = document.getElementById('savingsReportsContainer');

        if (savingsReports.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon"><i class="ri-file-chart-line"></i></div>
                    <p>Belum ada laporan tabungan.<br>Tambahkan laporan pertama Anda!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = savingsReports.map((report, index) => `
            <div class="report-card">
                <div class="report-left">
                    <div class="report-icon ${report.type === 'depositToSavings' ? 'savings-deposit-icon' : 'savings-withdraw-icon'}">
                        <i class="ri-${report.type === 'depositToSavings' ? 'arrow-down' : 'arrow-up'}-circle-line"></i>
                    </div>
                    <div class="report-info">
                        <div class="report-name">${report.type === 'depositToSavings' ? 'Masukan Tabungan' : 'Ambil Tabungan'}</div>
                        <div class="report-date"><i class="ri-calendar-2-line"></i> ${formatDate(report.date)}</div>
                    </div>
                </div>
                <div class="report-right">
                    <div class="report-amount ${report.type === 'depositToSavings' ? 'savings-deposit-amount' : 'savings-withdraw-amount'}">
                        ${report.type === 'depositToSavings' ? '+' : '-'}${formatRupiah(report.amount)}
                    </div>
                    <div class="report-type">${report.type === 'depositToSavings' ? 'Masukan' : 'Ambil'}</div>
                    ${index === 0 ? `<button class="delete-btn" onclick="deleteSavingsReport(${index})"><i class="ri-delete-bin-line"></i></button>` : ''}
                </div>
            </div>
        `).join('');
    }

    // Logout (Menggunakan customConfirm)
    function logout() {
        customConfirm('Yakin ingin keluar?', (result) => {
            if (result) {
                window.location.href = '../index.html';
            }
        });
    }

    // Hamburger Menu Toggle
    const menuBtn = document.getElementById('menuBtn');
    const closeBtn = document.getElementById('closeBtn');
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const overlay = document.getElementById('overlay');

    function openMenu() {
        hamburgerMenu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        hamburgerMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    menuBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);

    // Event listeners untuk tombol modal (dijalankan setelah elemen HTML dimuat)
    document.addEventListener('DOMContentLoaded', () => {
        const modal = document.getElementById('customConfirmModal');
        const yesBtn = document.getElementById('confirmYesBtn');
        const cancelBtn = document.getElementById('confirmCancelBtn');

        if (modal) {
            cancelBtn.addEventListener('click', () => {
                modal.style.display = 'none';
                if (confirmCallback) {
                    confirmCallback(false);
                }
            });

            yesBtn.addEventListener('click', () => {
                modal.style.display = 'none';
                if (confirmCallback) {
                    confirmCallback(true);
                }
            });
        }

    const alertModal = document.getElementById('customAlertModal');
        const alertCloseBtn = document.getElementById('alertCloseBtn');

        if (alertModal) {
            alertCloseBtn.addEventListener('click', () => {
                alertModal.style.display = 'none';
            });
        }
    });

    // Inisialisasi
    updateBalance();

    // COMING SOON ALERT
    function comingSoon() {
        customAlert('Fitur Ini Akan Segera Hadir')
    }