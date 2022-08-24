<template>
<div className="register">
    <div className="header">Register</div>
    <form className="content" @submit.prevent="submit">
        <div className="logo">
            <img :src="registerImg" alt="" />
        </div>
        <div className="form">
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" placeholder="Name" required v-model="name" />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" placeholder="Email" required v-model="email" />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" placeholder="Password" required v-model="password" />
            </div>
            <div className="form-group">
                <label htmlFor="Repassword">Confirm Password</label>
                <input type="password" name="Repassword" placeholder="Re-type Password" required v-model="cnfPassword" />
            </div>
        </div>
        <p className="errorMsg">{{ msg }}</p>
        <div className="footer">
            <button type="submit" className="btn">Register</button>
        </div>
    </form>
</div>
</template>

<script>
import {
    ref
} from "vue";
import registerImg from "../assets/register2.svg";
import {
    useRouter
} from "vue-router";
import axios from "axios";
export default {
    name: "Register",
    setup() {
        const name = ref("");
        const email = ref("");
        const password = ref("");
        const cnfPassword = ref("");
        const msg = ref("");
        const router = useRouter();
        const submit = async () => {
            if (password.value != cnfPassword.value) {
                msg.value = "Confirm Password not matched.";
            } else {
                msg.value = "";
                let payload = {
                    name: name.value,
                    email: email.value,
                    password: password.value
                }
                await axios.post(`${process.env.VUE_APP_API_ENDPOINTS}/auth/register`, payload)
                    .then(async res => {
                        localStorage.setItem("AccessToken", res.data.AccessToken)
                        msg.value = "";
                        await router.push("/admin/practitionar");
                    }).catch(error => {
                        msg.value = error.response.data.msg;
                    })

            }
        };
        return {
            msg,
            name,
            email,
            password,
            cnfPassword,
            registerImg,
            submit,
        };
    },
};
</script>

<style lang="scss">
.register {
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
        }

        .errorMsg {
            color: rgb(197, 38, 38);
            font-style: italic;
            font-weight: 600;
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
