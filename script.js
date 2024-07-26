document.addEventListener('DOMContentLoaded', () => {
    // Check for notifications permission
    if (Notification.permission !== 'granted') {
        Notification.requestPermission();
    }
    
    // Hide preloader after content is loaded
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        preloader.style.display = 'none';
    });
});

function scheduleTask() {
    const taskInput = document.getElementById('task').value;
    const datetimeInput = document.getElementById('datetime').value;
    const status = document.getElementById('status');

    if (!taskInput || !datetimeInput) {
        status.textContent = 'Please enter a task and select a date/time.';
        return;
    }

    const scheduledDateTime = new Date(datetimeInput);
    const now = new Date();

    if (scheduledDateTime <= now) {
        status.textContent = 'The selected time is in the past. Please choose a future time.';
        return;
    }

    const timeUntilNotification = scheduledDateTime - now;

    setTimeout(() => {
        showNotification(taskInput);
    }, timeUntilNotification);

    status.textContent = `Task scheduled for ${scheduledDateTime.toLocaleString()}.`;
}

function showNotification(task) {
    if (Notification.permission === 'granted') {
        new Notification('Reminder', {
            body: `It's time to: ${task}`,
            icon: 'https://via.placeholder.com/150'
        });
    } else {
        alert(`Reminder: ${task}`);
    }
}
