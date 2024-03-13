import { db } from "./firebaseConfig";
import { collection, getDocs, query, orderBy, addDoc, updateDoc, deleteDoc, doc, Timestamp } from "firebase/firestore";


const userCollectionRef = collection(db, "tasks");
const packagesCollectionRef = collection(db, "packages");

class TaskManagerClass {
    addTask = (user: any) => {
        return addDoc(userCollectionRef, user)
    }

    updateTask = (id: string, isCompleted: boolean) => {
        const userUpdateDoc = doc(db, "tasks", id);
        return updateDoc(userUpdateDoc, { isCompleted: isCompleted });
    }

    deleteTask = (id: string) => {
        const userDoc = doc(db, "tasks", id);
        return deleteDoc(userDoc);
    }

    getAllTask = () => {
        return getDocs(userCollectionRef);
    }

    getPackages = () => {
        return getDocs(packagesCollectionRef);
    }

    getTask = async () => {
        const q = query(collection(db, "tasks"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        return querySnapshot
    }
}

export default new TaskManagerClass();