document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});

async function fetchData() {
    const tableBody = document.getElementById('vlog-table-body');
    const statusMessage = document.getElementById('status-message');

    try {
        debugger;
        // Fetch data using the URL from common.js
        const response = await fetch(AppConfig.getDatabaseUrl());

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Check if the expected data structure exists
        if (data.echoesfrom1947 && data.echoesfrom1947.rows) {
            const rows = data.echoesfrom1947.rows;
            console.log('Fetched rows:', rows);
            
            // Clear loading message
            tableBody.innerHTML = '';
            statusMessage.style.display = 'none';

            // Iterate through rows and populate table
            rows.forEach((row, index) => {
                const tr = document.createElement('tr');

                // 1. S.No Column (Use data from JSON or auto-increment index + 1)
                const tdSNo = document.createElement('td');
                tdSNo.textContent = row.s_no || (index + 1);
                tr.appendChild(tdSNo);

                // 2. Name Column
                const tdName = document.createElement('td');
                tdName.textContent = row.name || 'N/A';
                tr.appendChild(tdName);

                // 3. Item Vlogs Column (Handling multiple links)
                const tdVlogs = document.createElement('td');
                
                if (row.item_vlogs && row.item_vlogs.length > 0) {
                    const list = document.createElement('ul');
                    list.className = 'list-unstyled mb-0'; // Bootstrap class to remove bullets

                    row.item_vlogs.forEach(vlog => {
                        const listItem = document.createElement('li');
                        const link = document.createElement('a');
                        
                        link.href = vlog.vlog_link || '#';
                        link.textContent = vlog.vlog_title || 'Watch Video';
                        link.target = '_blank'; // Open in new tab
                        link.className = 'text-decoration-none'; // Bootstrap class
                        
                        // Add a small icon or styling
                        link.innerHTML = `<i class="bi bi-play-circle-fill me-2 text-danger"></i>${vlog.vlog_title}`;

                        listItem.appendChild(link);
                        list.appendChild(listItem);
                    });
                    tdVlogs.appendChild(list);
                } else {
                    tdVlogs.textContent = 'No vlogs available';
                    tdVlogs.className = 'text-muted';
                }
                tr.appendChild(tdVlogs);

                // Append row to table body
                tableBody.appendChild(tr);
            });
        } else {
            statusMessage.textContent = 'No data found in echoesfrom1947 category.';
            statusMessage.className = 'alert alert-warning';
        }

    } catch (error) {
        console.error('Error fetching data:', error);
        statusMessage.textContent = 'Failed to load data. Please check your connection or JSON file.';
        statusMessage.className = 'alert alert-danger';
    }
}