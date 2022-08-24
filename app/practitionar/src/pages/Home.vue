<template>
<div class="welcome">Welcome to Practitionar Management System</div>
<div className="auth">
    <div className="container">
        <div className="nav loggedin">
            <button className="loginbtn" @click="isLogin = true">Login</button>
            <button className="registerbtn" @click="isLogin = false">
                Register
            </button>
        </div>
        <Login v-if="isLogin" />
        <Register v-else />
    </div>
</div>
</template>

<script>
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";
import {
    ref
} from "vue";
import "../assets/sass/app.scss";

export default {
    name: "Home",
    components: {
        Login,
        Register,
    },
    setup() {
        const isLogin = ref(true);
        
        return {
            isLogin
        };
    },
};
</script>

<style lang="scss">
.auth {
    display: flex;
    padding: 30px;
    justify-content: center;

    .container {
        display: inline-block;
        padding: 10px;
        box-shadow: 0px 0px 12px 0.8px #09632b70;

        .nav {
            width: 100%;
            height: 50px;
            display: flex;
            justify-content: space-between;
            border-bottom: 3px solid #06461ff1;
            border-radius: 7px;

            button {
                border: none;
                width: 110px;
                font-weight: bold;
                color: white;
                border-radius: 7px;
            }
        }

        .loggedin {
            .loginbtn {
                background-color: #06461ff1;
            }

            .registerbtn {
                background-color: #06461fb4;
                cursor: pointer;

                &:hover {
                    background-color: #06461ff1;
                }
            }
        }

        .registerin {
            .registerbtn {
                background-color: #06461ff1;
            }

            .loginbtn {
                background-color: #06461fb4;
                cursor: pointer;

                &:hover {
                    background-color: #06461ff1;
                }
            }
        }
    }
}
</style>
