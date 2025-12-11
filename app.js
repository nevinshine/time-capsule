const API_URL = '/api/capsules';
const form = document.getElementById('capsuleForm');
const list = document.getElementById('capsulesList');
const submitBtn = document.getElementById('submitBtn');

// Helper for loading spinner HTML
const spinnerHtml = (w, h) => `<div class="spinner" style="width: ${w}; height: ${h};"></div>`;

// 1. Fetch and Display Capsules
async function fetchCapsules() {
    // UPDATED: Show loading state in the list area
    list.innerHTML = `<div class="col-span-full flex flex-col items-center justify-center py-12 text-gray-500 gap-3">
        ${spinnerHtml('32px', '32px')}
        <p>Digging up capsules...</p>
    </div>`;

    try {
        const res = await fetch(API_URL);
        const capsules = await res.json();
        renderCapsules(capsules);
    } catch (error) {
        list.innerHTML = `<p class="col-span-full text-red-400 text-center">Failed to load capsules. Is the server running?</p>`;
    }
}

// 2. Render Logic
function renderCapsules(capsules) {
    list.innerHTML = '';
    
    if (capsules.length === 0) {
        list.innerHTML = `<div class="col-span-full text-center py-10 bg-gray-800/30 rounded-2xl border border-dashed border-gray-700">
            <p class="text-gray-400 text-lg">No capsules buried yet.</p>
            <p class="text-gray-500 text-sm">Create your first one above!</p>
        </div>`;
        return;
    }

    capsules.forEach(cap => {
        const statusColor = cap.isLocked ? 'text-purple-300' : 'text-green-400';
        const statusBg = cap.isLocked ? 'bg-purple-900/30 border-purple-700/50' : 'bg-green-900/30 border-green-700/50';
        const icon = cap.isLocked ? '🔒' : '🔓 Open';
        const cardBg = cap.isLocked ? 'bg-gray-800/80 border-gray-700' : 'bg-gradient-to-br from-gray-800/80 to-green-900/20 border-green-800 shadow-green-900/10 shadow-lg';
        const contentBlur = cap.isLocked ? 'blur-sm select-none opacity-50' : '';

        const card = document.createElement('div');
        card.className = `${cardBg} backdrop-blur-sm border p-6 rounded-xl relative fade-in group flex flex-col h-full transition hover:border-gray-600`;

        card.innerHTML = `
            <div class="flex justify-between items-start mb-4">
                <h3 class="text-xl font-bold text-gray-100 leading-tight">${cap.title}</h3>
                 <span class="text-xs font-bold ${statusColor} ${statusBg} px-3 py-1.5 rounded-full border flex items-center gap-1 uppercase tracking-wider shadow-sm">
                    ${icon}
                </span>
            </div>
            
            <div class="relative bg-gray-900/50 p-4 rounded-lg mb-6 flex-grow border border-gray-800/50">
                <p class="text-gray-300 whitespace-pre-wrap leading-relaxed ${contentBlur}">${cap.content}</p>
                ${cap.isLocked ? 
                    `<div class="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                        <div class="text-3xl mb-2">⏱️</div>
                        <div class="font-mono text-sm bg-gray-900 px-3 py-1 rounded-md border border-gray-700">
                             Logs unlock on:<br>
                             <span class="text-purple-300">${new Date(cap.openDate).toLocaleString()}</span>
                        </div>
                    </div>` 
                : ''}
            </div>

            <div class="mt-auto pt-4 border-t border-gray-700/50 flex justify-end">
                 <button onclick="deleteCapsule('${cap.id}', this)" 
                        class="bg-red-950/30 hover:bg-red-900/50 text-red-400 border border-red-900/50 hover:border-red-800 text-sm font-medium py-2 px-4 rounded-lg transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                    🗑️ Delete
                </button>
            </div>
        `;
        list.appendChild(card);
    });
}

// 3. Handle Form Submit
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // UPDATED: Loading State for Submit Button
    const originalBtnContent = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `${spinnerHtml('20px', '20px')} Burying...`;

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const openDate = document.getElementById('openDate').value;

    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content, openDate })
        });
        form.reset();
    } catch (err) {
        alert("Failed to bury capsule.");
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnContent;
        fetchCapsules();
    }
});

// 4. Handle Delete
// UPDATED: Accepts the button element to show loading state on itself
async function deleteCapsule(id, btnElement) {
    if(!confirm("Are you sure you want to discard this memory forever?")) return;
    
    // Show loading on the delete button
    const originalText = btnElement.innerHTML;
    btnElement.disabled = true;
    btnElement.innerHTML = `${spinnerHtml('16px', '16px')} Deleting...`;
    
    try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        // No need to reset button state here, the whole list refreshes
        fetchCapsules();
    } catch (err) {
        alert("Failed to delete.");
        btnElement.disabled = false;
        btnElement.innerHTML = originalText;
    }
}

// Initial Load
fetchCapsules();
