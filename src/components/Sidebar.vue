<script setup>
import { ref, watch, computed } from 'vue'
import { useStore } from 'vuex'

const props = defineProps(['id'])
const emit = defineEmits(['update:id'])

const inputValue = ref('')
const searchPage = ref(1)
const isLoading = ref(false)

const store = useStore()

const users = computed(() => {
    return store.state.users
})

const searchPages = computed(() => {
    if (users.value.length) {
        return Math.ceil(users.value.length / 10)
    }
})

const usersPerPage = computed(() => {
    if (users.value.length) {
        if (users.value.length > 10) {
            const total = searchPage.value * 10
            if (total >= users.value.length) {
                return users.value.length
            } else {
                return total 
            }
        } else {
            return users.value.length
        }
    }
})

function setLoading() {
    isLoading.value = false
}

watch(
    () => inputValue.value,
    (value) => {
        if (inputValue) {
            isLoading.value = true
        }
        let type = 'id'
        if (isNaN(parseInt(value))) {
            type = 'username'
        }
        store.dispatch('loadUsers', { value, type, onComplete: setLoading })
    }
)
</script>

<template>
    <aside class="aside">
        <h2>
            Поиск сотрудников
        </h2>
        <input type="text" v-model="inputValue" placeholder="Введите id или имя">
        <h2>
            Результаты
        </h2>
        <span v-show="isLoading && inputValue">Идёт поиск...</span>
        <span v-show="!inputValue && !users.length && !isLoading">Введите id или username пользователя</span>
        <span v-show="inputValue && !users.length && !isLoading">Ничего не найдено</span>
        <ul v-show="!isLoading && users.length" class="aside__list">
            <li class="aside__item" v-for="num in usersPerPage" :key="users[num - 1].id" :class="{'active': users[num - 1].id === props.id }" @click.prevent="emit('update:id', users[num - 1].id)">
                <div class="aside__item__left">
                    <img src="@/assets/userPlaceholder.png" :alt="users[num - 1].username">
                </div>
                <div class="aside__item__right">
                    <h3>
                        {{ users[num - 1].username }}
                    </h3>
                    <span>
                        {{ users[num - 1].email }}
                    </span>
                </div>
            </li>
        </ul>
        <button class="aside__btn" v-show="searchPage < searchPages" @click.prevent="searchPage++">
            Загрузить ещё
        </button>
    </aside>
</template>

<style lang="scss">
.aside {
    display: flex;
    flex-direction: column;
    padding: 27px 30px 27px 20px;
    max-width: 293px;
    width: 100%;
    overflow-x: hidden;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        width: 5px;
    }

    &::-webkit-scrollbar-thumb {
        width: 5px;
        border-radius: 5px;
        background-color: $color_grey;
    }

    h2 {
        margin-bottom: 15px;
    }

    input {
        width: 100%;
        padding: 16px 24px;
        font-size: 14px;
        font-weight: 400;
        color: $color_grey;
        margin-bottom: 30px;
        border: 1px solid #E9ECEF;
        background-color: $color_white;
        border-radius: 8px;
    }

    span {
        font-size: 14px;
        font-weight: 400;
        color: $color_grey;
    }

    &__item {
        display: flex;
        align-items: center;
        border-radius: 10px;
        background: $color_white;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.10);
        border: 1px solid transparent;
        overflow: hidden;
        cursor: pointer;

        &:not(:last-child) {
            margin-bottom: 18px;
        }

        &:hover,
        &:active,
        &:focus,
        &.active {
            border-color: #E0E0E0;

            .aside__item__right {
                background-color: #E0E0E0;
            }
        }

        &__left {
            min-width: 70px;
            height: 70px;
            overflow: hidden;

            img {
                height: 100%;
                object-fit: cover;
            }
        }

        &__right {
            width: 100%;
            min-height: 70px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            border-left: 1px solid #E0E0E0;
            padding-left: 15px;
        }
    }

    &__btn {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: 14px;
        font-weight: 400;
        padding: 10px;
        margin-top: 15px;
        cursor: pointer;
    }
}
</style>