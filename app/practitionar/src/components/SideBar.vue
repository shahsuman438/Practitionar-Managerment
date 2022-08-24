<template>
   <div class="sidebar">
    <ul class="side-menu">
        <li><router-link :to="{ name: 'Practitionar'}">Practitionar</router-link></li>
        <li><router-link :to="{ name: 'PractitionarCreate'}">Add Practitionar</router-link></li>
    </ul>
</div>
</template>

<script>
export default {
  name: "SideBar",
};
</script>

<style></style>
