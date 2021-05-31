<template>
    <div>
        <Nav></Nav>
        <router-view></router-view>
    </div>
</template>

<script>
import Nav from '../components/Nav'

export default {
    name: "Home",
    components: {
        Nav,
    },
}
</script>
