<script setup>
</script>

<template>
    <header class="header">
        <div class="container">
            <div class="header__content">
                <h1>
                    Жилфонд
                </h1>
                <span>
                    Пользователь
                </span>
            </div>
        </div>
    </header>
</template>

<style lang="scss">
.header {
    &__content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 45px 0 30px 0;

        h1,
        span {
            display: inline-flex;
        }
    }

    h1 {
        font-size: 32px;
        line-height: 100%;
        font-weight: 700;
        color: $color_red;
    }

    span {
        font-size: 16px;
        line-height: 100%;
        color: $color_black;
        font-weight: 400;
    }
}
</style>