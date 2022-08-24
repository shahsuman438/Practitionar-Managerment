<template>
<router-link :to="{ name: 'PractitionarCreate' }" class="btn">Add Practitionar</router-link>
<table>
    <thead>
        <tr>
            <th>fullName</th>
            <th>email</th>
            <th>startTime</th>
            <th>endTime</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="practitionar in practitionars" :key="practitionar._id">
            <!-- <td>
                <img :src="practitionar.image" alt="image" with="100" height="100" />
            </td> -->
            <td>{{ practitionar.name }}</td>
            <td>{{ practitionar.email }}</td>
            <td>{{ practitionar.startDateTime }}</td>
            <td>{{ practitionar.endDateTime }}</td>
            <td>
                <router-link :to="{ name: 'PractitionarEdit', params: { id: practitionar._id }}" class="btn">Edit</router-link>
                <button @click="del(practitionar._id)" class="btn btn-del">
                    delete
                </button>
            </td>
        </tr>
    </tbody>
</table>
</template>

<script>
import {
    onMounted,
    ref
} from "vue";
import authAxios from '../../interceptor/axios'
import {
    useRouter
} from "vue-router";
export default {
    name: "Practitionar",

    setup() {
        const practitionars = ref([]);
        const router = useRouter();
        onMounted(async () => {
            const isAuth = localStorage.getItem('AccessToken')
            if (!isAuth) {
                await router.push("/")
            } else {
                await authAxios.get('/practitionar')
                    .then(result => {
                        practitionars.value = result.data;
                    })
                    .catch(error => {
                        if (error.response.status === 403) {
                            console.log("call logout function")
                        }
                    })
            }
        });
        const del = async (id) => {
            authAxios.delete(`practitionar/${id}`)
                .then(result => {
                    practitionars.value = practitionars.value.filter((val) => val._id !== id);
                })
                .catch(error => {
                    console.error(`${error.response.status} ${error.response.statusText}`)
                })

        };
        return {
            practitionars,
            del
        };
    },
};
</script>

<style></style>
