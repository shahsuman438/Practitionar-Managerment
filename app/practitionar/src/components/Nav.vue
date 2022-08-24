<template>
<div class="nav-bar">
    <div class="title">Practitionar Management System</div>
    <ul class="top-nav">
        <li>
            <a href="/" @click="logout">Logout</a>
        </li>
    </ul>
</div>
</template>

<script>
import authAxios from '@/interceptor/axios';
export default {
    name: "Nav",
    setup() {
        const logout = async () => {
            let apiEndpoint = process.env.VUE_APP_API_ENDPOINTS;
            await authAxios
                .post(`${apiEndpoint}/auth/logout`, {

                })
                .then(async (res) => {
                    localStorage.removeItem("AccessToken");
                    alert(res.data.msg)
                })
                .catch((error) => {
                    alert(error.response.data.msg)
                });
        };
        return {
            logout
        };
    },
};
</script>

<style></style>
