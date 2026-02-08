document.addEventListener('DOMContentLoaded', async () => {
    const sidebarNav = document.getElementById('sidebar-nav');
    if (!sidebarNav) return;

    try {
        // We assume manifest.json is at the root of /reports/
        // Paths might need adjustment depending on where the current file is.
        // For simplicity, let's use an absolute-ish path from the root.
        const response = await fetch('/daily-insights/reports/manifest.json');
        const manifest = await response.json();

        const ul = document.createElement('ul');
        
        // Sort reports by date descending
        const sortedReports = manifest.reports.sort((a, b) => new Date(b.date) - new Date(a.date));

        sortedReports.forEach(report => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = `/daily-insights/${report.path}`;
            a.textContent = `${report.date}: ${report.title}`;
            
            // Highlight active page
            if (window.location.pathname.includes(report.path)) {
                a.classList.add('active');
            }

            li.appendChild(a);
            ul.appendChild(li);
        });

        sidebarNav.appendChild(ul);
    } catch (error) {
        console.error('Error loading manifest:', error);
        sidebarNav.innerHTML = '<p>Failed to load reports.</p>';
    }
});
