import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});
export default function App() {
  const sofiaCenter = [42.6977, 23.3219];


  const inputStyle = {
  width: "100%",
  marginBottom: 10,
  padding: 12,
  borderRadius: 12,
  border: "1px solid #ddd",
  fontSize: 16,
};

function getHeatColor(rating) {
  const r =
    Number(rating || 0);

  if (r >= 4.5)
    return "#ff3b30";

  if (r >= 4.0)
    return "#ff9500";

  if (r >= 3.5)
    return "#ffcc00";

  if (r >= 3.0)
    return "#34c759";

  return "#5ac8fa";
}
function aiScore(r) {
  const rating =
    Number(r.rating || 0);

  const tags =
    r.tags?.length || 0;

  const favoriteBoost =
    r.favorite ? 10 : 0;

  return Math.min(
    100,
    Math.round(
      rating * 20 +
      tags * 5 +
      favoriteBoost
    )
  );
}
function aiReview(r) {
  const score =
    aiScore(r);

  if (score > 85)
    return "Супер място за деца 🔥";

  if (score > 70)
    return "Много добър избор 👍";

  if (score > 55)
    return "Става за семейно посещение 🙂";

  return "Провери снимки и ревюта 🤔";
}
function pickRandomPlace() {
  if (!restaurants.length) return;

  const random =
    restaurants[
      Math.floor(
        Math.random() *
          restaurants.length
      )
    ];

  setRandomPlace(random);
}
function isOpenNow(hours) {
  if (!hours) return false;

  const parts =
    hours.split("-");

  if (parts.length !== 2)
    return false;

  const start =
    parts[0].trim();

  const end =
    parts[1].trim();

  const now =
    new Date();

  const current =
    now.getHours() * 60 +
    now.getMinutes();

  const [startHour, startMinute] =
    start.split(":").map(Number);

  const [endHour, endMinute] =
    end.split(":").map(Number);

  const openTime =
    startHour * 60 +
    startMinute;

  const closeTime =
    endHour * 60 +
    endMinute;

  return (
    current >= openTime &&
    current <= closeTime
  );
}
function getDistance(
  lat1,
  lng1,
  lat2,
  lng2
) {
  const R = 6371;

  const dLat =
    ((lat2 - lat1) *
      Math.PI) /
    180;

  const dLng =
    ((lng2 - lng1) *
      Math.PI) /
    180;

  const a =
    Math.sin(dLat / 2) *
      Math.sin(dLat / 2) +
    Math.cos(
      (lat1 * Math.PI) / 180
    ) *
      Math.cos(
        (lat2 * Math.PI) / 180
      ) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return (
    Math.round(R * c * 10) / 10
  );
}
function aiReview(r) {
  if (Number(r.rating) >= 5)
    return "Супер избор за семейства 🔥";

  if (Number(r.rating) >= 4)
    return "Много приятно място 👍";

  if (Number(r.rating) >= 3)
    return "Добър вариант 🙂";

  return "Провери и други опции";
}
function aiWhy(r) {
  const reasons = [];

  if (r.tags?.includes("🛝 Детски кът"))
    reasons.push("детски кът");

  if (r.tags?.includes("🌳 Градина"))
    reasons.push("градина");

  if (r.tags?.includes("🚗 Паркинг"))
    reasons.push("паркинг");

  return reasons.length
    ? reasons.join(", ")
    : "без допълнителни екстри";
}

function aiWhy(r) {
  const reasons = [];

  if (r.rating >= 4.5) reasons.push("висок рейтинг");
  if (r.tags?.includes("🛝 Детски кът")) reasons.push("има детски кът");
  if (r.tags?.includes("🌳 Градина")) reasons.push("има градина");
  if (r.tags?.includes("🚗 Паркинг")) reasons.push("лесен паркинг");

  if (reasons.length === 0) return "няма много допълнителна информация";

  return "Положително: " + reasons.join(", ");
}

function getHeatColor(rating) {
  const r =
    Number(rating || 0);

  if (r >= 4.5)
    return "#ff3b30";

  if (r >= 4.0)
    return "#ff9500";

  if (r >= 3.5)
    return "#ffcc00";

  if (r >= 3.0)
    return "#34c759";

  return "#5ac8fa";
}

function aiReview(r) {
  let text = "";

  if (
    r.tags?.includes(
      "🎂 Рожден ден"
    )
  ) {
    text +=
      "идеално за рожден ден • ";
  }

  return text;
}

function aiScore(r) {
  let score = 50;

  if (r.favorite) score += 10;
  if (r.tags?.includes("🎂 Рожден ден")) score += 10;
  if (r.tags?.includes("🛝 Детски кът")) score += 10;
  if (r.tags?.includes("🌳 Градина")) score += 5;
  if (Number(r.rating) === 5) score += 15;

  if (r.ageGroup === "0-2") score += 5;
  if (r.ageGroup === "3-5") score += 10;

  return Math.min(score, 100);
}

function aiReview(r) {
  if (r.rating >= 5)
    return "Перфектно място за деца – силно препоръчано 🔥";

  if (r.rating >= 4)
    return "Много добро място, подходящо за семейства 👍";

  if (r.rating >= 3)
    return "Ок място, но не е нещо специално 🙂";

  return "По-скоро средно – провери други опции ⚠️";
}


  const [restaurants, setRestaurants] = useState(() => {
    const saved = localStorage.getItem("restaurants");

    if (saved) return JSON.parse(saved);

    return [
      {
        id: 1,
        name: "Victoria",
        district: "Оборище",
        address: "ул. Черковна",
        phone: "0888123456",
        rating: "5",
        imageUrl: "",
        lat: 42.6958,
        lng: 23.3442,
      },
      {
        id: 2,
        name: "Azzurro",
        district: "Лозенец",
        address: "бул. Черни връх",
        phone: "0888111111",
        rating: "4",
        imageUrl: "",
        lat: 42.6698,
        lng: 23.3187,
      },
    ];
  });

  const [searchDistrict, setSearchDistrict] = useState("");
  
  const [randomPlace, setRandomPlace] =
  useState(null);
  const [selectedAge, setSelectedAge] =
  useState("");
  const [hoveredId, setHoveredId] = useState(null);
  const [activeTab, setActiveTab] = useState("home");
  const [searchName, setSearchName] =
  useState("");
  const [onlyTopRated, setOnlyTopRated] = useState(false);
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [sortOrder, setSortOrder] =
  useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [birthdayMode, setBirthdayMode] =
  useState(false);

  const [name, setName] = useState("");
  const [district, setDistrict] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [rating, setRating] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [ageGroup, setAgeGroup] = useState("");
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");
  const [workingHours, setWorkingHours] = useState("");
  const [tags, setTags] = useState([]);

  const [editingId, setEditingId] = useState(null);


   function getDefaultImage(category) {
  if (category === "Ресторант") {
    return "https://images.unsplash.com/photo-1555992336-03a23c7b20ee";
  }

  if (category === "Кафе") {
    return "https://images.unsplash.com/photo-1509042239860-f550ce710b93";
  }

  if (category === "Сладкарница") {
    return "https://images.unsplash.com/photo-1486427944299-d1955d23e34d";
  }

  if (category === "Brunch") {
    return "https://images.unsplash.com/photo-1525351484163-7529414344d8";
  }

  return "https://via.placeholder.com/600x300?text=No+Image";
}

  useEffect(() => {
    localStorage.setItem(
      "restaurants",
      JSON.stringify(restaurants)
    );
  }, [restaurants]);

  function addRestaurant() {
    if (!name || !district || !address) return;

    if (editingId) {
      const updated = restaurants.map((r) =>
        r.id === editingId
          ? {
              ...r,
              name,
              district,
              address,
              phone,
              rating,
              imageUrl,
              ageGroup,
              category,
              notes,
              workingHours,
            }
          : r
      );

      setRestaurants(updated);
      setEditingId(null);
    } else {
      const newRestaurant = {
        id: Date.now(),
        name,
        district,
        address,
        phone,
        rating,
        imageUrl,
        ageGroup,
        category,
        notes,
        workingHours,
        tags,
        visited: false,
        favorite: false,
        lat: 42.6977,
        lng: 23.3219,
      };

      setRestaurants([...restaurants, newRestaurant]);
    }

    setName("");
    setDistrict("");
    setAddress("");
    setPhone("");
    setRating("");
    setImageUrl("");
    setAgeGroup("");
    setCategory("");
    setNotes("");
    setWorkingHours("");
    setTags([]);
  }
function deleteRestaurant(id) {
  setRestaurants(
    restaurants.filter(
      (r) => r.id !== id
    )
  );
}

function toggleFavorite(id) {
  setRestaurants(
    restaurants.map((r) =>
      r.id === id
        ? {
            ...r,
            favorite:
              !r.favorite,
          }
        : r
    )
  );
}
function toggleVisited(id) {
  setRestaurants(
    restaurants.map((r) =>
      r.id === id
        ? {
            ...r,
            visited:
              !r.visited,
          }
        : r
    )
  );
}
function exportRestaurants() {
  const data =
    JSON.stringify(
      restaurants,
      null,
      2
    );

  const blob =
    new Blob(
      [data],
      {
        type:
          "application/json",
      }
    );

  const url =
    URL.createObjectURL(
      blob
    );

  const a =
    document.createElement(
      "a"
    );

  a.href = url;

  a.download =
    "kids-corner-sofia.json";

  a.click();

  URL.revokeObjectURL(
    url
  );
}
function getHeatColor(rating) {
  const r = Number(rating);

  if (r >= 5) return "#ff4d4d"; // hot 🔥
  if (r >= 4) return "#ffb84d";
  if (r >= 3) return "#fff04d";
  return "#8fd3ff";
}

function aiReview(r) {
  const tips = [
    "Перфектно за семейства 👨‍👩‍👧",
    "Има приятна атмосфера ☕",
    "Подходящо за деца 🧒",
    "Добро място за уикенд 🌿",
    "Храната е стабилна 🍽️",
  ];

  const bad = [
    "Малко шумно 🔊",
    "Липсва детски кът ⚠️",
    "Чака се повече ⏳",
  ];

  const randomTip = tips[Math.floor(Math.random() * tips.length)];
  const randomBad = bad[Math.floor(Math.random() * bad.length)];

  return `${randomTip} | ${randomBad}`;
}


function importRestaurants(e) {
  const file =
    e.target.files[0];

  if (!file) return;

  const reader =
    new FileReader();

  reader.onload =
    (event) => {
      try {
        const data =
          JSON.parse(
            event.target.result
          );

        setRestaurants(
          data
        );
      } catch {
        alert(
          "Невалиден JSON файл"
        );
      }
    };

  reader.readAsText(
    file
  );
}
function toggleTag(tag) {
  if (tags.includes(tag)) {
    setTags(
      tags.filter((t) => t !== tag)
    );
  } else {
    setTags([...tags, tag]);
  }
}
function pickRandomPlace() {
  if (
    filteredRestaurants.length === 0
  )
    return;

  const random =
    filteredRestaurants[
      Math.floor(
        Math.random() *
          filteredRestaurants.length
      )
    ];

  setRandomPlace(random);
}
function pickRandomRestaurant() {
  if (!filteredRestaurants.length) return;

  const random =
    filteredRestaurants[
      Math.floor(Math.random() * filteredRestaurants.length)
    ];

  alert(`🎲 Отивате на: ${random.name}`);

  // scroll + highlight (прост вариант)
  const el = document.getElementById(`rest-${random.id}`);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
}


const filteredRestaurants = (() => {
  let result = restaurants.filter((r) => {
    const matchesDistrict = r.district
      .toLowerCase()
      .includes(searchDistrict.toLowerCase());

    const matchesName = r.name
      .toLowerCase()
      .includes(searchName.toLowerCase());

    const matchesRating =
      !onlyTopRated ||
      Number(r.rating) === 5;

    const matchesFavorites =
      !onlyFavorites ||
      r.favorite;

    const matchesTag =
      !selectedTag ||
      r.tags?.includes(selectedTag);
      const matchesBirthday =
  !birthdayMode ||
  r.tags?.includes(
    "🎂 Рожден ден"
  );

    const matchesAge =
      !selectedAge ||
      r.ageGroup === selectedAge;

  return (
  matchesDistrict &&
  matchesName &&
  matchesRating &&
  matchesFavorites &&
  matchesTag &&
  matchesAge &&
  matchesBirthday
);
  });

  if (sortOrder === "high") {
    result = result.sort(
      (a, b) =>
        Number(b.rating) -
        Number(a.rating)
    );
  }

  if (sortOrder === "low") {
    result = result.sort(
      (a, b) =>
        Number(a.rating) -
        Number(b.rating)
    );
  }

  return result;
})();
const favoriteRestaurants = restaurants.filter((r) => r.favorite);
const topRestaurants =
  [...restaurants]
    .sort(
      (a, b) =>
        Number(b.rating) -
        Number(a.rating)
    )
    .slice(0, 3);
return (
  <div
    style={{
      padding: 24,
      maxWidth: 700,
      margin: "0 auto",
      paddingBottom: 80,
    }}
  >
 <h1
  style={{
    textAlign: "center",
    fontSize: 26,
    marginBottom: 16,
    fontWeight: "700",
  }}
>
  <button
  onClick={() => {
    if (filteredRestaurants.length === 0) return;

    const random =
      filteredRestaurants[
        Math.floor(
          Math.random() *
            filteredRestaurants.length
        )
      ];

    alert(
      `🎲 Днес пробвайте:\n\n${random.name}\n📍 ${random.address}`
    );
  }}
  style={{
    background: "#6366f1",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: 12,
    marginBottom: 20,
    cursor: "pointer",
  }}
>
  🎲 Surprise place
</button>
  👶 Kids Corner Sofia
</h1>
<div
  style={{
    display: "flex",
    gap: 10,
    marginBottom: 20,
    flexWrap: "wrap",
  }}
>
  <button
    onClick={() => {
      if (!filteredRestaurants.length) return;

      const random =
        filteredRestaurants[
          Math.floor(
            Math.random() *
              filteredRestaurants.length
          )
        ];

      alert(
        `🎲 Днес пробвайте:\n\n${random.name}\n📍 ${random.address}`
      );
    }}
    style={{
      background: "#6366f1",
      color: "white",
      border: "none",
      padding: "10px 16px",
      borderRadius: 12,
      cursor: "pointer",
    }}
  >
    🎲 Избери вместо мен
  </button>
</div>
<div style={{
  background: "white",
  padding: 12,
  borderRadius: 12,
  marginBottom: 16,
  boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
}}></div>
{activeTab === "add" && (
  <>
    <h2>Добави заведение</h2>
      </>
)}
      

      <input
        placeholder="Име"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "100%", marginBottom: 10, padding: 10 }}
      />

      <input
        placeholder="Квартал"
        value={district}
        onChange={(e) => setDistrict(e.target.value)}
        style={{ width: "100%", marginBottom: 10, padding: 10 }}
      />

      <label style={{ display: "block", marginBottom: 10 }}>
        <input
          type="checkbox"
          checked={onlyTopRated}
          onChange={(e) => setOnlyTopRated(e.target.checked)}
        />{" "}
        Само 5 звезди
      </label>

      <label style={{ display: "block", marginBottom: 20 }}>
        <input
          type="checkbox"
          checked={onlyFavorites}
          onChange={(e) => setOnlyFavorites(e.target.checked)}
        />{" "}
        Само любими ❤️
      </label>

      <input
        placeholder="Адрес"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{ width: "100%", marginBottom: 10, padding: 10 }}
      />

      <input
        placeholder="Телефон"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{ width: "100%", marginBottom: 10, padding: 10 }}
      />

     <div
  style={{
    marginBottom: 16,
    fontSize: 28,
  }}
>
  {[1, 2, 3, 4, 5].map(
    (star) => (
      <span
        key={star}
        onClick={() =>
          setRating(star)
        }
        style={{
          cursor: "pointer",
          marginRight: 6,
        }}
      >
        {Number(rating) >= star
          ? "⭐"
          : "☆"}
      </span>
    )
  )}
</div>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={inputStyle}
      >
        <option value="">Категория</option>
        <option value="Ресторант">🍽️ Ресторант</option>
        <option value="Кафе">☕ Кафе</option>
        <option value="Пицария">🍕 Пицария</option>
        <option value="Сладкарница">🍰 Сладкарница</option>
        <option value="Brunch">🥐 Brunch</option>
      </select>

      <textarea
        placeholder="Бележки"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={4}
        style={inputStyle}
      />

      <input
        placeholder="Работно време"
        value={workingHours}
        onChange={(e) => setWorkingHours(e.target.value)}
        style={inputStyle}
      />

<h3>Тагове</h3>
<div
  style={{
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    marginBottom: 16,
  }}
>
  {[
    "🎂 Рожден ден",
    "🛝 Детски кът",
    "🌳 Градина",
    "🚗 Паркинг",
  ].map((tag) => (
    <button
      key={tag}
      onClick={() => toggleTag(tag)}
      style={{
        padding: "8px 12px",
        borderRadius: 20,
        border: "1px solid #ddd",
        background:
          tags.includes(tag)
            ? "#ffd6e0"
            : "white",
      }}
    >
      {tag}
    </button>
  ))}
</div>
    <select
  value={ageGroup}
  onChange={(e) => setAgeGroup(e.target.value)}
  style={inputStyle}
>
        <option value="">Възраст</option>
        <option value="0-2">👶 0–2</option>
        <option value="3-5">🧒 3–5</option>
        <option value="6+">👦 6+</option>
        <option value="Всички">👨‍👩‍👧 Всички</option>
      </select>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (!file) return;

          const reader = new FileReader();
          reader.onload = () => setImageUrl(reader.result);
          reader.readAsDataURL(file);
        }}
        style={{ width: "100%", marginBottom: 10, padding: 10 }}

      />
<button
  onClick={pickRandomRestaurant}
  style={{
    background: "#111",
    color: "white",
    padding: "10px 14px",
    borderRadius: 12,
    marginBottom: 10,
  }}
>
  🎲 Random Adventure
</button>
     <button
  onClick={addRestaurant}
  style={{
    background: "#ff4d6d",
    color: "white",
    border: "none",
    padding: "12px 18px",
    borderRadius: 12,
    cursor: "pointer",
    fontSize: 16,
    marginBottom: 20,
  }}
>
  ➕ Добави
</button>
<button
  onClick={exportRestaurants}
  style={{
    marginLeft: 10,
  }}
>
  💾 Export JSON
</button>
<label
  style={{
    display: "block",
    marginTop: 10,
    marginBottom: 20,
  }}
>
  📂 Import JSON

  <input
    type="file"
    accept=".json"
    onChange={
      importRestaurants
    }
    style={{
      display: "block",
      marginTop: 8,
    }}
  />
</label>
      <hr />
  <h2>Сортиране</h2>
  <h2>
  👶 Филтър по възраст
</h2>

<select
  value={selectedAge}
  onChange={(e) =>
    setSelectedAge(
      e.target.value
    )
  }
  style={{
    width: "100%",
    marginBottom: 20,
    padding: 10,
  }}
>
  <option value="">
    Всички
  </option>

  <option value="0-2">
    👶 0–2
  </option>

  <option value="3-5">
    🧒 3–5
  </option>

  <option value="6+">
    👦 6+
  </option>

  <option value="Всички">
    👨‍👩‍👧 Всички
  </option>
</select>
<h2>Филтър по таг</h2>

<select
  value={selectedTag}
  onChange={(e) =>
    setSelectedTag(
      e.target.value
    )
  }
  style={{
    width: "100%",
    marginBottom: 20,
    padding: 10,
  }}
>
  <option value="">
    Всички
  </option>

  <option value="🎂 Рожден ден">
    🎂 Рожден ден
  </option>

  <option value="🛝 Детски кът">
    🛝 Детски кът
  </option>

  <option value="🌳 Градина">
    🌳 Градина
  </option>

  <option value="🚗 Паркинг">
    🚗 Паркинг
  </option>
</select>
<select
  value={sortOrder}
  onChange={(e) =>
    setSortOrder(e.target.value)
  }
  style={{
    width: "100%",
    marginBottom: 20,
    padding: 10,
  }}
>
  <option value="">
    Без сортиране
  </option>

  <option value="high">
    🔝 Най-висок рейтинг
  </option>

  <option value="low">
    🔽 Най-нисък рейтинг
  </option>
</select>    
<h2>
  Търси по име
</h2>

<input
  placeholder="Victoria"
  value={searchName}
  onChange={(e) =>
    setSearchName(
      e.target.value
    )
  }
  style={{
    width: "100%",
    marginBottom: 20,
    padding: 10,
  }}
/>
{activeTab === "favorites" && (
  <>
    <h2>❤️ Любими заведения</h2>
      </>
)}

{favoriteRestaurants.length === 0 ? (
  <p>Няма любими заведения ❤️</p>
) : (
  favoriteRestaurants.map((r) => (
  <div
  key={r.id}
  style={{
    background: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    boxShadow:
      "0 4px 14px rgba(0,0,0,0.08)",
  }}
>
      <h3>{r.name} ❤️</h3>
      {r.favorite && (
  <div
    style={{
      background: "#ffe4ec",
      color: "#d63384",
      padding: "6px 10px",
      borderRadius: 12,
      display: "inline-block",
      fontSize: 12,
      marginBottom: 8,
    }}
  >
    ❤️ Любимо
  </div>
)}

<p
  style={{
    fontStyle: "italic",
    color: "#666",
    marginTop: 6,
  }}
>
  🤖 AI:
  {aiReview(r)}
</p>

<p
  style={{
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 8,
  }}
>
  AI Score:
  {aiScore(r)} / 100
</p>
      <p>{r.category}</p>
      <p>📍 {r.address}</p>
      <p>🏘️ {r.district}</p>
      <p>
  📍 Разстояние:
  {getDistance(
    sofiaCenter[0],
    sofiaCenter[1],
    r.lat,
    r.lng
  )} km
</p>
    </div>
  ))
)}

<h2>🗺️ Карта</h2>

<MapContainer
  center={sofiaCenter}
  zoom={12}
  style={{
    height: "300px",
    width: "100%",
    borderRadius: 12,
    marginBottom: 20,
  }}
>
  <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />

  {filteredRestaurants
    .filter((r) => r.lat && r.lng)
    .map((r) => (
      <Marker
        key={r.id}
        position={[r.lat, r.lng]}
      >
        <Popup>
          <b>{r.name}</b>
          <br />
          {r.address}
        </Popup>
      </Marker>
    ))}
</MapContainer>

{activeTab === "home" && (
  <>
    <h2>Резултати</h2>

    <button
      onClick={pickRandomPlace}
      style={{
        background: "#7c3aed",
        color: "white",
        border: "none",
        padding: "12px 16px",
        borderRadius: 12,
        marginBottom: 16,
        cursor: "pointer",
      }}
    >
      🎲 Избери ми място
    </button>

    <button
      onClick={() =>
        setBirthdayMode(
          !birthdayMode
        )
      }
      style={{
        background:
          birthdayMode
            ? "#f472b6"
            : "#ffffff",

        color:
          birthdayMode
            ? "white"
            : "black",

        border:
          "1px solid #ddd",

        padding:
          "12px 16px",

        borderRadius: 12,

        marginBottom: 16,

        cursor: "pointer",
      }}
    >
      🎂 Birthday mode
    </button>

    {randomPlace && (
      <div
        style={{
          background: "#faf5ff",
          padding: 16,
          borderRadius: 16,
          marginBottom: 20,
          border:
            "2px solid #c084fc",
        }}
      >
        <h3>
          🎉 Днес пробвай{" "}
          {randomPlace.name}
        </h3>

        <p>
          📍 {randomPlace.address}
        </p>

        <p>
          {randomPlace.category}
        </p>
      </div>
    )}

    <h2>
      🏆 Top 3 Sofia
    </h2>
  </>
)}
{topRestaurants.map(
  (r, index) => (
    <div
      key={r.id}
      style={{
        background:
          "#fff9db",

        borderRadius: 16,

        padding: 14,

        marginBottom: 12,
      }}
    >
      <h3>
        {index === 0 &&
          "🥇"}

        {index === 1 &&
          "🥈"}

        {index === 2 &&
          "🥉"}

        {" "}
        {r.name}
      </h3>

      <p>
        {"⭐".repeat(
          Number(
            r.rating || 0
          )
        )}
      </p>

      <p>
        📍 {r.address}
      </p>
    </div>
  )
)}
{filteredRestaurants.map((r) => (
  <div
    key={r.id}
    onMouseEnter={() => setHoveredId(r.id)}
    onMouseLeave={() => setHoveredId(null)}
    style={{
      background: "#ffffff",
      borderRadius: 18,
      padding: 18,
      marginBottom: 18,
      border: "1px solid #f1f1f1",
      overflow: "hidden",
      cursor: "pointer",
      transition: "all 0.2s ease",

      transform:
        hoveredId === r.id
          ? "scale(1.02)"
          : "scale(1)",

      filter:
        aiScore(r) > 80
          ? "drop-shadow(0 0 10px #ff4d4d55)"
          : "none",

      borderLeft: `8px solid ${
        aiScore(r) > 80
          ? "#ff3b30"
          : aiScore(r) > 60
          ? "#ff9500"
          : aiScore(r) > 40
          ? "#34c759"
          : "#5ac8fa"
      }`,
     
    }}
  >
    <h3>
      {r.name}

      <button
        onClick={() =>
          toggleFavorite(r.id)
        }
        style={{ marginLeft: 10 }}
      >
        {r.favorite ? "❤️" : "🤍"}
      </button>
<button
  onClick={() =>
    toggleVisited(r.id)
  }

  style={{
    marginLeft: 10,
  }}
>
  {r.visited
    ? "✅"
    : "⬜"}
</button>
      <button
        onClick={() =>
          toggleVisited(r.id)
        }
        style={{ marginLeft: 10 }}
      >
        {r.visited ? "✅" : "⬜"}
      </button>
    </h3>

    {r.imageUrl && (
      <img
        src={r.imageUrl}
        alt={r.name}
        style={{
          width: "100%",
          height: 180,
          objectFit: "cover",
          borderRadius: 14,
          marginBottom: 12,
        }}
      />
    )}

    <p>{r.category}</p>

    <p>📍 {r.address}</p>

    <p>🏘️ {r.district}</p>

    {r.visited && (
  <p style={{ color: "green", fontWeight: "bold" }}>
    ✅ Посетено
  </p>
)}

    <p>📞 {r.phone}</p>

    <p>📝 {r.notes}</p>

    <p>🕒 {r.workingHours}</p>

    <p>
      {isOpenNow(
        r.workingHours
      )
        ? "🟢 Отворено"
        : "🔴 Затворено"}
    </p>

    <p>👶 {r.ageGroup}</p>

    <p>
      {"⭐".repeat(
        Number(r.rating || 0)
      )}
    </p>

    <p
      style={{
        fontStyle: "italic",
        color: "#666",
      }}
    >
      🤖 {aiReview(r)}
    </p>

    <div
      style={{
        fontSize: 12,
        fontWeight: "bold",
        marginBottom: 8,
      }}
    >
      🔥 AI Score:
      {aiScore(r)} / 100
    </div>

    <div
      style={{
        width: "100%",
        height: 8,
        background: "#eee",
        borderRadius: 10,
        overflow: "hidden",
        marginBottom: 12,
      }}
    >
      <div
        style={{
          width: `${aiScore(r)}%`,
          height: "100%",
          background:
            aiScore(r) > 80
              ? "green"
              : aiScore(r) > 60
              ? "orange"
              : "gray",
        }}
      />
    </div>

    <p
      style={{
        fontSize: 12,
        color: "#888",
      }}
    >
      🧠 {aiWhy(r)}
    </p>

    <p>
      {r.tags?.map((tag) => (
        <span
          key={tag}
          style={{
            marginRight: 8,
          }}
        >
          {tag}
        </span>
      ))}
    </p>

    <a
      href={`https://www.google.com/maps/search/${r.address} София`}
      target="_blank"
      rel="noreferrer"
    >
      🗺️ Google Maps
    </a>

    <div
      style={{
        marginTop: 12,
      }}
    >
      <button
        onClick={() =>
          setEditingId(r.id)
        }
      >
        ✏️ Редактирай
      </button>

      <button
        onClick={() =>
          deleteRestaurant(r.id)
        }
        style={{
          marginLeft: 10,
        }}
      >
        🗑️ Изтрий
      </button>
    </div>
  </div>
))}
      <div
  style={{
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "space-around",
    background: "white",
    padding: 12,
    borderTop: "1px solid #ddd",
  }}
>
  <button onClick={() => setActiveTab("home")}>🏠</button>
  <button onClick={() => setActiveTab("favorites")}>❤️</button>
  <button onClick={() => setActiveTab("add")}>➕</button>
  <button onClick={() => setActiveTab("map")}>🗺️</button>
</div>
    </div>
  );
}