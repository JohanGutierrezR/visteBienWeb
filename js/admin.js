const form = document.getElementById("productForm");
const imageURL = document.getElementById("imageURL");
const imagePreview = document.getElementById("imagePreview");
const fileInput = document.getElementById("productImages");

let selectedImages = []; // URLs + archivos

// --- Agregar imágenes desde URLs ---
imageURL.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();

        const url = imageURL.value.trim();
        if (!url) return;

        if (selectedImages.length >= 5) {
            alert("Solo puedes agregar máximo 5 imágenes.");
            return;
        }

        selectedImages.push(url);
        mostrarPreview();
        imageURL.value = "";
    }
});

// --- Agregar imágenes desde archivos ---
fileInput.addEventListener("change", () => {
    const files = Array.from(fileInput.files);

    for (let file of files) {
        if (selectedImages.length >= 5) {
            alert("Máximo 5 imágenes por producto.");
            break;
        }
        selectedImages.push(file);
    }

    mostrarPreview();
});

// --- Mostrar vista previa ---
function mostrarPreview() {
    imagePreview.innerHTML = "";

    selectedImages.forEach((img, index) => {
        const imgTag = document.createElement("img");

        if (typeof img === "string") {
            imgTag.src = img; // es URL
        } else {
            imgTag.src = URL.createObjectURL(img); // archivo
        }

        imgTag.title = "Click para eliminar";
        imgTag.style.cursor = "pointer";

        imgTag.onclick = () => {
            selectedImages.splice(index, 1);
            mostrarPreview();
        };

        imagePreview.appendChild(imgTag);
    });
}

// --- VALIDACIÓN Y GUARDADO ---
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("productName").value.trim();
    const price = parseFloat(document.getElementById("productPrice").value);
    const desc = document.getElementById("productDescription").value.trim();
    const category = document.getElementById("productCategory").value;

    if (selectedImages.length === 0) {
        alert("Debes agregar al menos una imagen.");
        return;
    }

    const product = {
        name,
        price,
        desc,
        category,
        images: selectedImages.map(img =>
            typeof img === "string" ? img : URL.createObjectURL(img)
        ),
    };

    // Guardar en localStorage
    let list = JSON.parse(localStorage.getItem("productos")) || [];
    list.push(product);
    localStorage.setItem("productos", JSON.stringify(list));

    alert("Producto guardado correctamente.");
    form.reset();
    selectedImages = [];
    mostrarPreview();
});
