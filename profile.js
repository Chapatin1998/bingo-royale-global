import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const db = getFirestore();
const storage = getStorage();
const auth = getAuth();

// --- FUNCIÓN PARA SUBIR UN ARCHIVO Y OBTENER SU URL ---
// Hacemos una función separada para no repetir código
async function uploadFileAndGetURL(user, file, folder) {
    if (!file) return null;
    // Creamos una referencia única para el archivo en Firebase Storage
    const storageRef = ref(storage, `${folder}/${user.uid}/${file.name}`);
    // Subimos el archivo
    const snapshot = await uploadBytes(storageRef, file);
    // Obtenemos la URL de descarga
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
}

document.addEventListener('DOMContentLoaded', () => {
    const profileForm = document.getElementById('profile-form');

    if (profileForm) {
        profileForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const user = auth.currentUser;

            if (!user) {
                alert("No estás conectado. Por favor, inicia sesión de nuevo.");
                window.location.href = 'login.html';
                return;
            }

            // Obtenemos todos los datos del formulario
            const fullName = profileForm.fullName.value;
            const countryCode = profileForm.countryCode.value;
            const phoneNumber = profileForm.phoneNumber.value;
            const fullPhoneNumber = countryCode + phoneNumber;
            
            // Obtenemos los TRES archivos de imagen
            const idFrontFile = profileForm.idFrontUpload.files[0];
            const idBackFile = profileForm.idBackUpload.files[0];
            const selfieFile = profileForm.selfieWithIdUpload.files[0];

            if (!idFrontFile || !idBackFile || !selfieFile) {
                alert("Por favor, sube las tres imágenes requeridas.");
                return;
            }

            const submitButton = profileForm.querySelector('button');
            submitButton.disabled = true;
            submitButton.textContent = 'Guardando...';

            try {
                // Subimos las tres imágenes en paralelo para más eficiencia
                const [idFrontUrl, idBackUrl, selfieUrl] = await Promise.all([
                    uploadFileAndGetURL(user, idFrontFile, 'id_front'),
                    uploadFileAndGetURL(user, idBackFile, 'id_back'),
                    uploadFileAndGetURL(user, selfieFile, 'id_selfie')
                ]);

                // Creamos el objeto del perfil del usuario con las 3 URLs
                const userProfile = {
                    uid: user.uid,
                    email: user.email,
                    fullName: fullName,
                    phoneNumber: fullPhoneNumber,
                    idFrontImageUrl: idFrontUrl,
                    idBackImageUrl: idBackUrl,
                    selfieWithIdUrl: selfieUrl,
                    isVerified: false, // Por defecto, el perfil no está verificado
                    createdAt: new Date()
                };
                
                // Guardamos todo el perfil en la base de datos Firestore
                await setDoc(doc(db, "users", user.uid), userProfile);

                console.log("Perfil guardado con éxito con las 3 imágenes!");
                // Redirigimos al lobby
                window.location.href = 'lobby.html';

            } catch (error) {
                alert("Error al guardar el perfil: " + error.message);
                submitButton.disabled = false;
                submitButton.textContent = 'Guardar Perfil y Entrar';
            }
        });
    }
});
