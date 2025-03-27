// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in animation to main content
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.classList.add('fade-in');
    }

    // Add active class to current navigation item
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Initialize tooltips if Bootstrap is loaded
    if (typeof bootstrap !== 'undefined') {
        const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltips.forEach(tooltip => {
            new bootstrap.Tooltip(tooltip);
        });
    }

    // Add smooth scrolling to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add copy functionality to code blocks
    document.querySelectorAll('.code-example pre').forEach(block => {
        // Create copy button
        const copyButton = document.createElement('button');
        copyButton.className = 'btn btn-sm btn-secondary copy-btn';
        copyButton.textContent = 'Copy';
        
        // Add button to code block
        block.style.position = 'relative';
        block.appendChild(copyButton);

        // Add click handler
        copyButton.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(block.textContent);
                copyButton.textContent = 'Copied!';
                setTimeout(() => {
                    copyButton.textContent = 'Copy';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy text:', err);
                copyButton.textContent = 'Failed';
            }
        });
    });
});

// Theme toggler function
function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.toggle('dark-theme');
    localStorage.setItem('dark-theme', isDark);
}

// Check for saved theme preference
const savedTheme = localStorage.getItem('dark-theme');
if (savedTheme === 'true') {
    document.body.classList.add('dark-theme');
}

// Form validation helper
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('is-invalid');
        } else {
            input.classList.remove('is-invalid');
        }
    });

    return isValid;
}

// Interactive code examples helper
function runCodeExample(codeId, outputId) {
    const codeElement = document.getElementById(codeId);
    const outputElement = document.getElementById(outputId);
    
    if (codeElement && outputElement) {
        try {
            const result = eval(codeElement.textContent);
            outputElement.textContent = result;
            outputElement.classList.remove('text-danger');
        } catch (error) {
            outputElement.textContent = `Error: ${error.message}`;
            outputElement.classList.add('text-danger');
        }
    }
} 