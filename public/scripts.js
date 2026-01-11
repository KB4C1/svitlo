const outputText = document.getElementById('output-text');
const outputInfo = document.getElementById('output-info');

function showOutput() {
    outputText.style.visibility = 'visible';
    outputInfo.style.visibility = 'visible';
}

async function parseAddress() {
    const inputs = document.querySelectorAll('#addressForm input');
    const address = Array.from(inputs)
        .map(i => i.value.trim())
        .filter(Boolean)
        .join(',');

    if (!address) return;

    try {
        showOutput();
        outputText.textContent = 'Завантаження...';
        outputInfo.textContent = '';

        const res = await fetch(`/search_by_address?address=${encodeURIComponent(address)}`);
        const data = await res.json();

        const current = data.current;
        const schedule = data.schedule?.[0]?.queues;

        outputText.textContent = current?.note ?? 'Інформація відсутня';

        if (!schedule) return;

        outputInfo.textContent = Object.entries(schedule)
            .map(([queue, items]) =>
                `Черга ${queue}:\n` +
                items.map(ev => `  • ${ev.shutdownHours}`).join('\n')
            )
            .join('\n\n');

    } catch {
        outputText.textContent = 'Помилка при отриманні даних';
    }
}

async function parseQueue() {
    const queue = document.getElementById('queue-input').value;
    if (!queue) return;

    try {
        showOutput();
        outputInfo.textContent = 'Завантаження...';

        const res = await fetch(`/search_by_queue?queue=${encodeURIComponent(queue)}`);
        const data = await res.json();

        const queues = data?.[0]?.queues;
        if (!queues) {
            outputInfo.textContent = 'Даних немає';
            return;
        }

        outputInfo.textContent = Object.values(queues)
            .flat()
            .map(ev => `• ${ev.shutdownHours}`)
            .join('\n');

    } catch {
        outputInfo.textContent = 'Помилка';
    }
}
