document.addEventListener('DOMContentLoaded', () => {
  const verifyBtn = document.getElementById('verifyBtn');
  const dismissBtn = document.getElementById('dismissBtn');
  const verifyModal = document.getElementById('verifyModal');
  const dismissModal = document.getElementById('dismissModal');

  if (verifyBtn && verifyModal) {
    verifyBtn.addEventListener('click', () => {
      verifyModal.style.display = 'flex';
    });
  }

  if (dismissBtn && dismissModal) {
    dismissBtn.addEventListener('click', () => {
      dismissModal.style.display = 'flex';
    });
  }

  document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (verifyModal) verifyModal.style.display = 'none';
      if (dismissModal) dismissModal.style.display = 'none';
    });
  });

  // Close modals when clicking outside content
  [verifyModal, dismissModal].forEach(modal => {
    if (!modal) return;
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });
  });
});
