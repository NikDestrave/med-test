<template>
  <form class="p-3 border rounded-lg space-x-4" @submit.prevent="saveData">
    <input v-model="dataForm.name" class="bg-gray-100 p-2 px-4 rounded-lg" placeholder="ФИО" required type="text" />
    <input
      v-model="dataForm.position"
      class="bg-gray-100 p-2 px-4 rounded-lg"
      placeholder="Должность"
      required
      type="text"
    />
    <input
      v-model="dataForm.department"
      class="bg-gray-100 p-2 px-4 rounded-lg"
      placeholder="Отделение"
      required
      type="text"
    />
    <button
      class="transition text-white bg-black/70 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5"
      type="submit"
    >
      Сохранить
    </button>
    <button
      class="transition text-gray-800 bg-black/5 hover:bg-black/15 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5"
      @click.stop.prevent="clearData"
    >
      Очистить
    </button>
  </form>
  <UsersTable :data-list="usersList" @on-delete="deleteData" @on-edit="editData" />
</template>

<script lang="ts" setup>
import {computed, onMounted, reactive, ref} from 'vue';
import UsersTable from '@/components/UsersTable.vue';
import {useRoute} from 'vue-router';

const route = useRoute();

interface DataItem {
  id: number;
  name: string;
  position: string;
  department: string;
}

// Функция для генерации случайного имени
const generateRandomName = (): string => {
  const names = [
    'Иванов Иван Иванович',
    'Петров Петр Петрович',
    'Сидоров Сидор Сидорович',
    'Кузнецов Алексей Николаевич',
    'Смирнова Анна Петровна',
    'Васильев Василий Васильевич',
    'Морозова Мария Ивановна',
    'Федорова Елена Сергеевна',
    'Соколов Павел Дмитриевич',
    'Михайлов Михаил Михайлович',
    'Новиков Николай Александрович',
    'Фролова Екатерина Васильевна',
    'Попова Ольга Андреевна',
    'Лебедев Александр Сергеевич',
    'Козлова Татьяна Михайловна',
    'Орлова Ирина Викторовна',
    'Зайцев Артем Владимирович',
    'Белов Алексей Валерьевич',
    'Комаров Андрей Николаевич',
    'Дмитриева Алина Сергеевна',
  ];
  return names[Math.floor(Math.random() * names.length)];
};

// Функция для генерации случайной должности
const generateRandomPosition = (): string => {
  const positions = ['Врач', 'Медсестра'];
  return positions[Math.floor(Math.random() * positions.length)];
};

// Функция для генерации случайного отделения
const generateRandomDepartment = (): string => {
  const departments = ['Кардиологическое', 'Хирургическое'];
  return departments[Math.floor(Math.random() * departments.length)];
};

// Функция для генерации массива данных
const generateMockData = (): DataItem[] => {
  const mockData: DataItem[] = [];
  for (let i = 1; i <= 20; i++) {
    mockData.push({
      id: i,
      name: generateRandomName(),
      position: generateRandomPosition(),
      department: generateRandomDepartment(),
    });
  }
  return mockData;
};

const dataForm = reactive({
  id: 0,
  name: '',
  position: '',
  department: '',
});
const dataList = ref<DataItem[]>([]);

const usersList = computed(() => {
  if (route.path === '/doctors') {
    return dataList.value.filter((item: DataItem) => item.position === 'Врач');
  } else {
    return dataList.value.filter((item: DataItem) => item.position === 'Медсестра');
  }
});

const initData = () => {
  if (!localStorage.getItem('mockData')) {
    const mockData = generateMockData();
    localStorage.setItem('mockData', JSON.stringify(mockData));
  }
};

const loadData = () => {
  dataList.value = JSON.parse(localStorage.getItem('mockData') || '[]');
};

const saveData = () => {
  let data = JSON.parse(localStorage.getItem('mockData') || '[]');
  if (dataForm.id) {
    data = data.map((item: DataItem) => (item.id === dataForm.id ? {...item, ...dataForm} : item));
  } else {
    const newItem: DataItem = {
      id: data.length ? data[data.length - 1].id + 1 : 1,
      name: dataForm.name,
      position: dataForm.position,
      department: dataForm.department,
    };
    data.push(newItem);
  }
  localStorage.setItem('mockData', JSON.stringify(data));
  clearData();
  loadData();
};

const editData = (id: number) => {
  const data = JSON.parse(localStorage.getItem('mockData') || '[]');
  const item = data.find((item: DataItem) => item.id === id);
  if (item) {
    dataForm.id = item.id;
    dataForm.name = item.name;
    dataForm.position = item.position;
    dataForm.department = item.department;
  }
};

const deleteData = (id: number) => {
  let data = JSON.parse(localStorage.getItem('mockData') || '[]');
  data = data.filter((item: DataItem) => item.id !== id);
  localStorage.setItem('mockData', JSON.stringify(data));
  loadData();
};

const clearData = () => {
  dataForm.id = 0;
  dataForm.name = '';
  dataForm.position = '';
  dataForm.department = '';
};

onMounted(() => {
  initData();
  loadData();
});
</script>

<style></style>
