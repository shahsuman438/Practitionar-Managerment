<template>
<form action="" @submit.prevent="submit">
    <label for="fullName">Full Name</label>
    <input type="text" id="fullName" placeholder="eg. Jhon Smith" v-model="name" />
    <label for="email">Email</label>
    <input type="email" id="fullName" placeholder="eg. jhon@abc.com" v-model="email" />
    <label for="startDateTime">Start Time</label>
    <input type="date" id="startDateTime" v-model="startDateTime" />
    <label for="endDateTime">End Time</label>
    <input type="date" id="endDateTime" v-model="endDateTime" />
    <label for="icuSpecialist">ICU Specialist</label>
    <input type="checkbox" id="icuSpecialist" v-model="icuSpecialist" />
    <button type="submit" :disabled="!name || !email || !startDateTime || !endDateTime">Update</button>
</form>
</template>

<script>
import {
    onMounted,
    ref
} from "vue";
import {
    useRouter,
    useRoute
} from "vue-router";
import authAxios from '../../interceptor/axios'
import moment from 'moment'
export default {
    name: "PractitionarCreate",
    props: ["id"],
    setup() {
        const name = ref("");
        const email = ref("");
        const startDateTime = ref("");
        const endDateTime = ref("");
        const icuSpecialist = ref("");
        const router = useRouter();
        const route = useRoute();
        onMounted(async () => {
            const isAuth = localStorage.getItem('AccessToken')
            if (!isAuth) {
                await router.push("/")
            } else {
                authAxios.get(`practitionar/${route.params.id}`)
                    .then(result => {
                        console.log(moment(String(result.data.startDateTime)).format('YYYY/MM/DD'))
                        name.value = result.data.name;
                        email.value = result.data.email;
                        startDateTime.value = moment(String(result.data.startDateTime)).format('YYYY/MM/DD');
                        endDateTime.value = moment(String(result.data.endDateTime)).format('YYYY/MM/DD');
                        icuSpecialist.value = result.data.icuSpecialist;
                    })
                    .catch(error => {
                        alert(error.response.data)
                    })
            }
        });
        const submit = async () => {
            let payload = {
                name: name.value,
                email: email.value,
                startDateTime: startDateTime.value,
                endDateTime: endDateTime.value,
                icuSpecialist: icuSpecialist.value,
            }
            authAxios.put(`practitionar/${route.params.id}`, payload)
                .then(async result => {
                    alert(JSON.stringify(result.data.msg))
                    await router.push("/admin/practitionar");

                })
                .catch(error => {
                    alert(error.response.data)

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
