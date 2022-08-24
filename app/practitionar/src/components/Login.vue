<template>
<div className="login">
    <div className="header">Login</div>
    <form className="content" @submit.prevent="submit">
        <div className="logo">
            <img :src="image" alt="" />
        </div>
        <div className="form">
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" required placeholder="eg. Jhon Smith" v-model="email" />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" required id="password" placeholder="Password" v-model="password" />
            </div>
            <p className="errorMsg">{{ msg }}</p>
        </div>
        <div className="footer">
            <button type="submit" className="btn">Login</button>
        </div>
    </form>
</div>
</template>

<script>
import {
    ref
} from "vue";
import image from "../assets/login.svg";
import axios from "axios";
import {
    useRouter
} from "vue-router";

export default {
    name: "Login",
    setup() {
        const email = ref("");
        const password = ref("");
        const msg = ref("");
        const router = useRouter();
        const submit = async () => {
            let apiEndpoint = process.env.VUE_APP_API_ENDPOINTS;
            await axios
                .post(`${apiEndpoint}/auth/login`, {
                    email: email.value,
                    password: password.value,
                })
                .then(async (res) => {
                    localStorage.setItem("AccessToken", res.data.AccessToken);
                    await router.push("/admin/practitionar");
                })
                .catch((error) => {
                    msg.value = error.response.data.msg;
                });
        };
        return {
            email,
            password,
            image,
            submit,
            msg,
        };
    },
};
</script>

<style lang="scss">
.login {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .header {
        font-size: 25px;
        font-weight: bold;
        color: gray;
    }

    .content {
        display: flex;
        flex-direction: column;
        align-items: center;

        .logo {
            width: 21em;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .form {
            margin-top: 2em;
            display: flex;
            flex-direction: column;
            align-items: center;

            .form-group {
                display: flex;
                align-items: flex-start;
                flex-direction: column;
                margin: 2px;
                width: fit-content;

                label {
                    font-size: 20px;
                }

                input {
                    margin-top: 6px;
                    min-width: 18em;
                    height: 37px;
                    padding: 0px 10px;
                    font-size: 16px;
                    background-color: #f3f3f3;
                    border: 0;
                    border-radius: 5px;
                    margin-bottom: 5px;
                    transition: all 250ms ease-in-out;

                    &:focus {
                        outline: none;
                        box-shadow: 0px 0px 12px 0.8px #09632b70;
                    }
                }
            }

            .errorMsg {
                color: rgb(197, 38, 38);
                font-style: italic;
                font-weight: 600;
            }
        }
    }

    .footer {
        margin-top: 3em;
        width: 60%;

        .btn {
            width: 100%;
            height: 35px;
            color: white;
            font-weight: bold;
            background-color: rgba(13, 94, 13, 0.815);
            border: none;

            border-radius: 6px;

            &:hover {
                background-color: rgba(25, 117, 25, 0.753);
            }

            cursor: pointer;
        }
    }
}
</style>
