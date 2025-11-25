// Инициализация карта
const map = L.map('map').setView([42.135,24.745],13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; OpenStreetMap'}).addTo(map);

let markers=[];
function showDetails(s){document.getElementById("details").innerHTML=`
<h3>${s.name} (${s.specialty})</h3>
<p><strong>Адрес:</strong> ${s.address} <button onclick="navigate(${s.coordinates[0]},${s.coordinates[1]})">Навигация</button></p>
<p><strong>Телефон:</strong> <a href="tel:${s.phone}">${s.phone}</a></p>
<p><strong>НЗОК:</strong> ${s.n_zok?'Да':'Не'}</p>
<p><strong>Частна практика:</strong> ${s.private_practice?'Да':'Не'}</p>
<p><strong>Услуги:</strong> ${s.services.join(', ')}</p>
<p><strong>Цена:</strong> ${s.price} лв</p>
<p><strong>Отзиви:</strong> ${s.reviews.join('; ')}</p>`;}

function navigate(lat,lng){window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,'_blank');}

function updateMap(){
markers.forEach(m=>map.removeLayer(m)); markers=[];
const specialty=document.getElementById("specialty").value;
specialists.forEach(s=>{
if(!specialty||s.specialty===specialty){
let marker=L.marker(s.coordinates).addTo(map).bindPopup(`<b>${s.name}</b><br>${s.specialty}`).on('click',()=>showDetails(s));
markers.push(marker);
}});}
document.getElementById("specialty").addEventListener("change",updateMap);
updateMap();

// AI помощник (симулация, може да се свърже с OpenAI API)
document.getElementById("ai-btn").addEventListener("click",()=>{
  const symptoms=document.getElementById("ai-input").value.toLowerCase();
  let rec=specialists.find(s=>symptoms.includes(s.specialty.toLowerCase()) || symptoms.includes("болки") && s.specialty.toLowerCase().includes("кардиолог"));
  document.getElementById("ai-output").innerText=rec?`AI препоръчва: ${rec.name} (${rec.specialty})`:"AI не може да намери подходящ специалист. Пробвайте други симптоми.";
});