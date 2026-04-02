document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.get('action') === 'search') {
        const rows = document.querySelectorAll('.list-table tr');

        rows.forEach(row => {
            const latestLink = row.querySelector('a[href*="action=latest.view"]');
            const dashLink = row.querySelector('a[href*="action=host.dashboard.view"]');

            if (latestLink && dashLink) {
                const cellLatest = latestLink.closest('td');
                const cellDash = dashLink.closest('td');

                if (cellLatest && cellDash) {
                    
                    // Se l'icona non esiste ancora, la aggiungiamo
                    if (!dashLink.querySelector('.custom-svg-icon')) {
                        // Creiamo un elemento contenitore per l'SVG
                        const iconContainer = document.createElement('span');
                        iconContainer.className = 'custom-svg-icon';
                        iconContainer.style.marginRight = '5px';
                        iconContainer.style.verticalAlign = 'middle';
                        iconContainer.style.display = 'inline-flex';
                        iconContainer.style.alignItems = 'center';

                        // Disegniamo l'icona Dashboard (i 4 quadratini) in SVG
                        // "currentColor" farà sì che l'icona sia dello stesso colore del link
                        iconContainer.innerHTML = `
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <rect x="3" y="3" width="8" height="8" rx="1"></rect>
                                <rect x="13" y="3" width="8" height="8" rx="1"></rect>
                                <rect x="3" y="13" width="8" height="8" rx="1"></rect>
                                <rect x="13" y="13" width="8" height="8" rx="1"></rect>
                            </svg>`;

                        dashLink.prepend(iconContainer);
                    }

                    // Scambio dei contenuti tra le celle
                    const tempHTML = cellDash.innerHTML;
                    cellDash.innerHTML = cellLatest.innerHTML;
                    cellLatest.innerHTML = tempHTML;
                }
            }
        });
    }
});
