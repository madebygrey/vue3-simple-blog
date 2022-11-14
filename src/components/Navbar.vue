<template>
    <div class="navbar">
        <div @click="$router.push('./')">Vue 3</div>
        <div class="navbar__btns">
            <my-button @click="$router.push('./posts')">Посты</my-button>
            <my-button @click="$router.push('./about')" style="margin-left: 15px">О сайте</my-button>
            <my-button @click="$router.push('./store')" style="margin-left: 15px">Store</my-button>
        </div>
    </div>
</template>

<script setup>

</script>

<style>
    .navbar {
        height: 50px;
        background-color: lightgray;
        box-shadow: 2px 2px 4px gray;
        display: flex;
        align-items: center;
        padding: 0 15px;
        margin-bottom: 30px;
    }
    .navbar__btns {
        margin-left: auto;
    }
</style>