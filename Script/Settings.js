// Toggle sidebar untuk mobile
        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar-mobile');
            sidebar.classList.toggle('active');
        }

        // Switch section
        function showSection(section) {
            // Update sidebar active state
            const sidebarItems = document.querySelectorAll('.sidebar-item');
            sidebarItems.forEach(item => item.classList.remove('active'));

            // Update content active state
            const sections = document.querySelectorAll('.content-section');
            sections.forEach(sec => sec.classList.remove('active'));

            if (section === 'profile') {
                sidebarItems[0].classList.add('active');
                document.getElementById('profile-section').classList.add('active');
            } else if (section === 'account') {
                sidebarItems[1].classList.add('active');
                document.getElementById('account-section').classList.add('active');
            }

            // Close sidebar on mobile after selection
            if (window.innerWidth <= 768) {
                document.getElementById('sidebar').classList.remove('active');
            }
        }

        // MOBILE Switch Section
        function showSectionMobile(section) {
            // Update sidebar active state
            const sidebarItems = document.querySelectorAll('.sidebar-item-mobile');
            sidebarItems.forEach(item => item.classList.remove('active'));

            // Update content active state
            const sections = document.querySelectorAll('.content-section');
            sections.forEach(sec => sec.classList.remove('active'));

            if (section === 'profile') {
                sidebarItems[0].classList.add('active');
                document.getElementById('profile-section').classList.add('active');
            } else if (section === 'account') {
                sidebarItems[1].classList.add('active');
                document.getElementById('account-section').classList.add('active');
            }

            // Close sidebar on mobile after selection
            if (window.innerWidth <= 768) {
                // document.getElementById('sidebar-mobile').classList.remove('active');
            }
        }

        // Change avatar (simulasi)
        function changeAvatar() {
            alert('Fitur upload foto akan tersedia di versi lengkap!');
        }

        // Save profile (simulasi)
        function saveProfile() {
            alert('Profile berhasil disimpan!');
        }

        // Save account (simulasi)
        function saveAccount() {
            const currentPass = document.getElementById('currentPassword').value;
            const newPass = document.getElementById('newPassword').value;
            const confirmPass = document.getElementById('confirmPassword').value;

            if (newPass && newPass !== confirmPass) {
                alert('Password baru tidak cocok!');
                return;
            }

            alert('Account berhasil diupdate!');
        }