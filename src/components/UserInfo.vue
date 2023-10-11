<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const props = defineProps(['id'])
const store = useStore()

const data = computed(() => {
    if (props.id) {
        const item = store.state.users.find(user => user.id === props.id)
        if (item) {
            return item
        } else {
            return null
        }
    } else {
        return null
    }
})
</script>

<template>
    <div class="user">
        <div v-if="data" class="user__info">
            <img class="user__image" src="@/assets/userPlaceholder.png" :alt="data.username">
            <div class="user__text">
                <h2>{{ data.name }}</h2>
                <h3>
                    <b>email:</b> {{ data.email }}
                </h3>
                <h3>
                    <b>phone:</b> {{ data.phone }}
                </h3>
                <h2>
                    О себе:
                </h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                    ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                </p>
            </div>
        </div>
        <span v-else class="user__empty">
            Выберите сотрудника, чтобы посмотреть его профиль
        </span>
    </div>
</template>

<style lang="scss">
.user {
    position: relative;
    width: 100%;
    height: 100%;

    &__empty {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 14px;
        color: $color_grey;
        font-weight: 400;
    }

    &__info {
        width: 100%;
        height: 100%;
        border-left: 1px solid #E0E0E0;
        padding: 30px 20px;
        display: flex;
        justify-content: space-between;

        .user__image, .user__text {
            width: calc(50% - 30px);
        }

        h2, h3 {
            margin-bottom: 10px;
        }

        h3:nth-child(3) {
            margin-bottom: 20px;
        }

        h3 {
            font-weight: 400;
            color: $color_grey;
            
            b {
                display: inline-block;
                margin-right: 6px;
                font-weight: 600;
                color: $color_black;
            }
        }

        p {
            font-size: 14px;
            font-weight: 400;
            color: $color_grey;
        }
    }

    &__image {
        height: auto;
        max-height: 320px;
        object-fit: cover;
        border-top: 2px solid #E0E0E0;
        border-bottom: 2px solid #E0E0E0;
    }
}</style>