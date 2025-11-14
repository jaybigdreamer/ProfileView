document.getElementById('search').addEventListener('input', function() {
    const query = this.value;
    const userId = <?php echo json_encode($_SESSION['user_id']); ?>;
    const isAdmin = <?php echo json_encode($is_admin); ?>;
    fetch(`search.php?q=${encodeURIComponent(query)}&user_id=${userId}&is_admin=${isAdmin}`)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('tasks');
            container.innerHTML = '';
            data.forEach(task => {
                const card = `
                    <div class="col-md-6 task-card mb-3" data-title="${task.title}" data-description="${task.description}">
                        <div class="card">
                            <div class="card-body">
                                <h5>${task.title}</h5>
                                <p>${task.description}</p>
                                <p><strong>Due:</strong> ${task.due_date} | <strong>Status:</strong> ${task.status}</p>
                                <p><small>By: ${task.username}</small></p>
                                <a href="task.php?id=${task.id}" class="btn btn-warning btn-sm">Edit</a>
                                <a href="delete_task.php?id=${task.id}" class="btn btn-danger btn-sm" onclick="return confirm('Delete?')">Delete</a>
                            </div>
                        </div>
                    </div>
                `;
                container.innerHTML += card;
            });
        });
});
