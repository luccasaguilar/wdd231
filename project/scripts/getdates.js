const lastMod = new Date(document.lastModified);
const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
};
const year = {
    year: 'numeric'
};
document.getElementById("lastModified").textContent = `${lastMod.toLocaleString('en-US', options)}`;
document.getElementById("currentYear").textContent = `${lastMod.toLocaleString('en-US', year)}`;
