/*
* AUTHOR/S:
* - Raean Chrissean Tamayo
* - Jul Leo Javellana
* - John Roland Octavio (Toast Logic)
* */

const toggleMenu = () => {
    const menu = document.querySelector('.mobile-nav-links');
    menu.classList.toggle('d-flex');
    menu.classList.toggle('d-none');
}

// nav selected
document.addEventListener('DOMContentLoaded', function() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const anchor = link.querySelector('a');
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    const PAGES = ['inventory', 'transaction', 'reports'];

    const isIncluded = PAGES.find(keyword => 
        currentPath.includes(keyword) && href.includes(keyword)
    );

    if (isIncluded) {
      link.classList.add('nav-selected');
    }
  });
});


const showToast = (header, message, type = "info") => {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');

    const toastMessageContainer = document.createElement('div');
    toastMessageContainer.className = "flex-grow-1 d-flex flex-column bg-transparent";

    const toastHeader = document.createElement('h6');
    toastHeader.style.fontSize = '14px';
    toastHeader.style.color = 'black';
    toastHeader.textContent = header;
    toastMessageContainer.appendChild(toastHeader);

    const toastMessage = document.createElement('span');
    toastMessage.style.fontSize = '12px';
    toastMessage.textContent = message;
    toastMessage.style.color = 'white';
    toastMessageContainer.appendChild(toastMessage);

    const toastButton = document.createElement('button');
    toastButton.className = "rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center ms-2";
    toastButton.innerHTML = `<i class="fa-solid fa-xmark text-white"></i>`;

    const icon =
        type === 'success'
            ? "fa-solid fa-check"
            : type === 'error'
                ? "fa-solid fa-triangle-exclamation"
                : "fa-regular fa-lightbulb";

    toast.className = `toast ${type} px-2 py-1 d-flex align-items-center fs-7`;
    toast.innerHTML = `
        <div class="flex-shrink-0 rounded-circle d-flex align-items-center justify-content-center me-2" 
            style="width: 28px; height: 28px;"
        >
            <i class="${icon} text-white fs-6"></i>
        </div>
  `;

    toast.appendChild(toastMessageContainer);
    toast.appendChild(toastButton);
    container.appendChild(toast);

    // Trigger show animation
    setTimeout(() => toast.classList.add('show'), 50);

    // Remove after 3s
    const timeoutId = setTimeout(() => hideToast(toast), 2000);

    // Handle manual close
    toast.querySelector('button').addEventListener('click', () => {
        clearTimeout(timeoutId);
        hideToast(toast);
    });
}

const hideToast = (toast) => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
}