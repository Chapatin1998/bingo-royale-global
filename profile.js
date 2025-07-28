import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const db = getFirestore();
const storage = getStorage();
const auth = getAuth();

document.addEventListener('DOMContentLoaded', () => {
    const profileForm = document.getElementById('profile-form');

    if (profileForm) {
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const user = auth.currentUser;

            if (user) {
                const fullName = profileForm.fullName.value;
                const countryCode = profileForm.countryCode.value;
                const phoneNumber = profileForm.phoneNumber.value;
                const fullPhoneNumber = countryCode + phoneNumber;
                const idFile = profileForm.idUpload.files[0];

                if (!idFile) {
                    alert("Por favor, sube una imagen de tu carnet.");
                    return;
                }

                const submitButton = profileForm.querySelector('button');
                submitButton.disabled = true;
                submitButton.textContent = 'Guardando...';

                // 1. Subir la imagen a Firebase Storage
                const storageRef = ref(storage, `user_ids/${user.uid}/${idFile.name}`);
                uploadBytes(storageRef, idFile).then((snapshot) => {
                    console.log('Imagen subida!');
                    // 2. Obtener la URL de la imagen subida
                    return getDownloadURL(snapshot.ref);
                }).then((downloadURL) => {
                    // 3. Guardar la información del perfil en Firestore
                    const userProfile = {
                        uid: user.uid,
                        email: user.email,
                        fullName: fullName,
                        phoneNumber: fullPhoneNumber,
                        idImageUrl: downloadURL,
                        createdAt: new Date()
                    };
                    
                    // Usamos el UID del usuario como ID del documento
                    return setDoc(doc(db, "users", user.uid), userProfile);
                }).then(() => {
                    // 4. Redirigir al lobby
                    console.log("Perfil guardado con éxito!");
                    window.location.href = 'lobby.html';
                }).catch((error) => {
                    alert("Error al guardar el perfil: " + error.message);
                    submitButton.disabled = false;
                    submitButton.textContent = 'Guardar Perfil y Entrar';
                });

            } else {
                alert("No estás conectado. Por favor, inicia sesión de nuevo.");
                window.location.href = 'login.html';
            }
        });
    }
});
