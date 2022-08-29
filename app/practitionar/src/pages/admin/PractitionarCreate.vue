<template>
<form action="" @submit.prevent="submit">
    <label for="name">Full Name</label>
    <input type="text" id="name" placeholder="eg. Jhon Smith" v-model="name" />
    <label for="email">Email</label>
    <input type="email" id="fullName" placeholder="eg. jhon@abc.com" v-model="email" />
    <label for="startDateTime">Start Time</label>
    <input type="datetime-local" id="startDateTime" v-model="startDateTime" required  />
    <label for="endDateTime">End Time</label>
    <input type="datetime-local" id="endDateTime" v-model="endDateTime" required/>
    <label for="icuSpecialist">ICU Specialist</label>
    <input type="checkbox" id="icuSpecialist" v-model="icuSpecialist" />
    <button type="submit" :disabled="!name || !email || !startDateTime || !endDateTime">Add</button>
</form>
</template>

<script>
import {
    onMounted,
    ref
} from "vue";
import {
    useRouter
} from "vue-router";
import authAxios from '../../interceptor/axios'

export default {
    name: "PractitionarCreate",
    setup() {
        const name = ref("");
        const email = ref("");
        const startDateTime = ref("");
        const endDateTime = ref("");
        const icuSpecialist = ref("");
        const router = useRouter();
        onMounted(async () => {
            const isAuth = localStorage.getItem('AccessToken')
            if (!isAuth) {
                await router.push("/")
            }
        })
        const submit = async () => {
            let payload = {
                name: name.value,
                email: email.value,
                startDateTime: startDateTime.value,
                endDateTime: endDateTime.value,
                icuSpecialist: icuSpecialist.value,
            }
            authAxios.post('practitionar', payload)
                .then(async result => {
                    alert(result.data.msg);
                    await router.push("/admin/practitionar")
                })
                .catch(error => {
                    console.error(error.response.data)

                })
        };
        return {
            name,
            email,
            startDateTime,
            endDateTime,
            icuSpecialist,
            submit,
        };
    },
};
</script>

<style></style>
