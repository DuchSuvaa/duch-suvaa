import { ref } from 'vue'
import { projectAuth } from '../firebase/config.js'
import { onAuthStateChanged } from 'firebase/auth';

// refs
const user = ref(projectAuth.currentUser)

onAuthStateChanged(projectAuth, _user => {
  user.value = _user
});

const getUser = () => {
  return { user } 
}

export default getUser